package controller



import (
	"github.com/gin-gonic/gin"
)


type HealthCheckController interface {
	HealthCheck(c *gin.Context)
}


type HealthCheckControllerImpl struct {
}


func (controller HealthCheckControllerImpl) HealthCheck(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "OK",
	})
}

func HealthCheckControllerInit() HealthCheckController {
	return &HealthCheckControllerImpl{}
}