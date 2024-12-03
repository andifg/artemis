package middleware

import (
	"github.com/andifg/artemis_backend/app/pkg"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func AuthMiddleware(oidcMgr pkg.OidcManager) gin.HandlerFunc {
	return func(c *gin.Context) {

		log.Debug("Auth Middleware")

		accessToken, err := c.Cookie("access_token")

		log.Debug("Access Token: ", accessToken)

		if err != nil || accessToken == "" {
			c.JSON(401, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		valid, err := oidcMgr.VerifyToken(accessToken)

		if err != nil || !valid {
			c.JSON(401, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		log.Info("User is authorized")

		c.Next()
	}
}
