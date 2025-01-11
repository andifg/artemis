package contextutils

import (
	"github.com/andifg/artemis_backend/app/pkg/auth"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
)

func RenewTokens(c *gin.Context, refreshToken string, oidcMgr auth.OidcManager) {

	log.Debug("Will try to renew tokens with refresh token")

	tokens, err := oidcMgr.RefreshToken(refreshToken)

	if err != nil {
		log.Info("Error refreshing token: ", err)
		UnauthorizedHandler(c)
		return

	}

	accessToken, err := oidcMgr.VerifyToken(tokens.AccessToken)

	if err != nil {
		log.Info("Error verifying new access token: ", err)
		UnauthorizedHandler(c)
		return
	}

	userID, err := uuid.Parse(accessToken.ID)

	if err != nil {
		log.Info("Error parsing user ID: ", err)
		UnauthorizedHandler(c)
		return
	}

	SetUserID(c, userID)
	log.Info("Successfully refreshed tokens")
	SetTokens(c, tokens)
	c.Next()

}
