package router

import (
	"github.com/andifg/artemis_backend/config"
	"github.com/gin-gonic/gin"
)

func Init(init *config.Initialization) *gin.Engine {
	r := gin.Default()

	r.GET("health", init.HealathCheckController.HealthCheck)

	api := r.Group("/api")
	{

		v1 := api.Group("/v1")
		{
			v1.POST("/user", init.UserController.CreateUser)
			v1.GET("/user", init.UserController.GetAllUsers)

		}

	}

	return r
}
