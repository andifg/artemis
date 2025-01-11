package middleware

import (
	"github.com/andifg/artemis_backend/app/pkg/auth"
	"github.com/andifg/artemis_backend/app/pkg/contextutils"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
)

func AuthMiddleware(oidcMgr auth.OidcManager) gin.HandlerFunc {
	return func(c *gin.Context) {

		log.Debug("Auth Middleware")

		refreshToken, err := c.Cookie("refresh_token")

		if err != nil || refreshToken == "" {
			log.Debug("No refresh token found")
			contextutils.UnauthorizedHandler(c)
			return
		}

		accessToken, err := c.Cookie("access_token")

		log.Trace("Access Token: ", accessToken)

		if err != nil || accessToken == "" {
			log.Debug("No access token found")
			contextutils.RenewTokens(c, refreshToken, oidcMgr)
			return
		}

		jwt, err := oidcMgr.VerifyToken(accessToken)

		if err != nil {
			log.Debug("Error verifying access token signature: ", err)
			contextutils.RenewTokens(c, refreshToken, oidcMgr)
			return
		}

		validClaims := oidcMgr.VerifyClaims(&jwt)

		if !validClaims {
			log.Debug("Invalid access token claims")
			contextutils.RenewTokens(c, refreshToken, oidcMgr)
			return
		}

		userID, err := uuid.Parse(jwt.ID)

		if err != nil {
			log.Info("Error parsing user ID: ", err)
			contextutils.UnauthorizedHandler(c)
			return
		}

		contextutils.SetUserID(c, userID)
		log.Info("User is authorized")

		c.Next()
	}
}
