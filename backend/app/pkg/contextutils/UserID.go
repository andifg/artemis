package contextutils

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
)

func SetUserID(c *gin.Context, userID uuid.UUID) {

	log.Debug("Setting user ID in context")
	c.Set("user", userID.String())

}

func GetUserID(c *gin.Context) uuid.UUID {

	log.Debug("Getting user ID from context")
	userIDString := c.GetString("user")

	log.Debug("User ID: ", userIDString)

	userID := uuid.MustParse(userIDString)
	return userID

}
