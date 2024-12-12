package service

import (
	"github.com/andifg/artemis_backend/app/pkg/auth"
	"github.com/andifg/artemis_backend/app/pkg/contextutils"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
)

type AuthService interface {
	Login(*gin.Context)
}

type AuthServiceImpl struct {
	oidcMgr auth.OidcManager
}

func (svc *AuthServiceImpl) Login(c *gin.Context) {
	log.Debug("Login")

	code, ok := c.GetQuery("code")

	if !ok {
		log.Error("Code not found")
		c.Redirect(302, "http://localhost:5173")
	}

	tokens, err := svc.oidcMgr.FetchAuthToken(code)

	if err != nil {
		log.Error("Not able to fetch tokens from auth provider")
		c.Redirect(302, "http://localhost:5173")
	}

	accessToken, err := svc.oidcMgr.VerifyToken(tokens.AccessToken)

	if err != nil {
		log.Info("Error verifying new access token: ", err)
		contextutils.UnauthorizedHandler(c)
		return
	}

	userID, err := uuid.Parse(accessToken.ID)

	if err != nil {
		log.Info("Error parsing user ID: ", err)
		contextutils.UnauthorizedHandler(c)
		return
	}

	contextutils.SetUserID(c, userID)
	contextutils.SetTokens(c, tokens)

	log.Info("Successfully logged in, redirecting to dashboard")

	c.Redirect(302, "http://localhost:5173/dashboard")

}

func AuthServiceInit(oidcMgr auth.OidcManager) AuthService {
	return &AuthServiceImpl{
		oidcMgr: oidcMgr,
	}
}
