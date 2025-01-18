package service

import (
	"errors"
	"fmt"

	"github.com/andifg/artemis_backend/app/constant"
	"github.com/andifg/artemis_backend/app/domain/dao"
	"github.com/andifg/artemis_backend/app/pkg/auth"
	"github.com/andifg/artemis_backend/app/pkg/contextutils"
	"github.com/andifg/artemis_backend/app/pkg/customerrors"
	"github.com/andifg/artemis_backend/app/repository"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
)

type AuthService interface {
	Login(*gin.Context)
}

type AuthServiceImpl struct {
	oidcMgr         auth.OidcManager
	usrRepository   repository.UserRepository
	frontendBaseUrl string
}

func (svc *AuthServiceImpl) Login(c *gin.Context) {
	log.Debug("Login")

	code, ok := c.GetQuery("code")

	if !ok {
		log.Error("Code not found")
		c.Redirect(302, svc.frontendBaseUrl)
	}

	tokens, err := svc.oidcMgr.FetchAuthToken(code)

	if err != nil {
		log.Error("Not able to fetch tokens from auth provider")
		c.Redirect(302, svc.frontendBaseUrl)
	}

	accessToken, err := svc.oidcMgr.VerifyToken(tokens.AccessToken)

	if err != nil {
		log.Info("Error verifying new access token: ", err)
		contextutils.UnauthorizedHandler(c)
		return
	}

	userID, err := uuid.Parse(accessToken.Subject)

	if err != nil {
		log.Info("Error parsing user ID: ", err)
		contextutils.UnauthorizedHandler(c)
		return
	}

	addedUser, err := svc.usrRepository.CreateUser(dao.User{
		ID:       userID,
		Username: accessToken.PreferedUsername,
	})

	if err != nil {
		customErr := &customerrors.DuplicateKeyError{}
		if errors.As(err, &customErr) {
			log.Infof("User already registered")
		} else {
			log.Error("Error creating user: ", err)
			contextutils.UnauthorizedHandler(c)
			return
		}

	}

	// compiler fix for unused variable
	_ = addedUser

	contextutils.SetUserID(c, userID)
	contextutils.SetTokens(c, tokens, c.Request.Host)

	log.Info("Successfully logged in, redirecting to dashboard")

	c.Redirect(302, fmt.Sprintf("%s/dashboard", svc.frontendBaseUrl))

}

func AuthServiceInit(oidcMgr auth.OidcManager, usrRepo repository.UserRepository, appConfig constant.AppConfig) AuthService {
	return &AuthServiceImpl{
		oidcMgr:         oidcMgr,
		usrRepository:   usrRepo,
		frontendBaseUrl: appConfig.FrontendOrigin,
	}
}
