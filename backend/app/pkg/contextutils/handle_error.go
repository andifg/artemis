package contextutils

import (
	"errors"
	"github.com/andifg/artemis_backend/app/pkg/customerrors"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	"net/http"
)

func HandleError(err error, c *gin.Context) {
	log.Debug("Handling error: ", err)

	if err != nil {
		switch {
		case errors.As(err, new(*customerrors.DuplicateKeyError)):
			c.JSON(http.StatusConflict, gin.H{"message": err.Error()})
		case errors.As(err, new(*customerrors.NotFoundError)):
			c.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
		case errors.As(err, new(*customerrors.ForbiddenError)):
			c.JSON(http.StatusForbidden, gin.H{"message": err.Error()})
		case errors.As(err, new(*customerrors.BadRequestError)):
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		}
	}
}
