package contextutils

import (
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func UnauthorizedHandler(c *gin.Context) {
	log.Debug(("Delete tokens and return 401"))
	c.SetCookie("access_token", "", -1, "/", c.Request.Host, false, true)
	c.SetCookie("refresh_token", "", -1, "/", c.Request.Host, false, true)
	c.SetCookie("id_token", "", -1, "/", c.Request.Host, false, false)
	c.JSON(401, gin.H{"error": "Unauthorized"})
	c.Abort()
}
