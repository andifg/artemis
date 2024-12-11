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
			log.Info("No access token found")
			c.SetCookie("access_token", "", -1, "/", "localhost", false, true)
			c.SetCookie("id_token", "", -1, "/", "localhost", false, false)
			c.JSON(401, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		jwt, err := oidcMgr.VerifyToken(accessToken)

		if err != nil {
			log.Info("Error verifying token: ", err)
			c.SetCookie("access_token", "", -1, "/", "localhost", false, true)
			c.SetCookie("id_token", "", -1, "/", "localhost", false, false)
			c.JSON(401, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		validClaims := oidcMgr.VerifyClaims(&jwt)

		if !validClaims {
			log.Info("Invalid claims")
			c.SetCookie("access_token", "", -1, "/", "localhost", false, true)
			c.SetCookie("id_token", "", -1, "/", "localhost", false, false)
			c.JSON(401, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		log.Info("User is authorized")

		c.Next()
	}
}
