package service

import (
	"github.com/andifg/artemis_backend/app/pkg"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

type AuthService interface {
	Login(*gin.Context)
}

type AuthServiceImpl struct {
	oidcMgr pkg.OidcManager
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
		if !ok {
			log.Error("Not able to fetch tokens from auth provider")
			c.Redirect(302, "http://localhost:5173")
		}
	}

	c.SetCookie("access_token", tokens.AccessToken, 3600, "/", "localhost", false, true)
	c.SetCookie("refresh_token", tokens.RefreshToken, 3600, "/", "localhost", false, true)
	c.SetCookie("id_token", tokens.IdToken, 3600, "/", "localhost", false, true)

	log.Info("Successfully logged in, redirecting to dashboard")

	c.Redirect(302, "http://localhost:5173/dashboard")

}

func AuthServiceInit(oidcMgr pkg.OidcManager) AuthService {
	return &AuthServiceImpl{
		oidcMgr: oidcMgr,
	}
}
