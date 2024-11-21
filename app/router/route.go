package router

import (
	"github.com/gin-gonic/gin"
	"github.com/andifg/artemis_backend/config"
)

func Init(init *config.Initialization) *gin.Engine{
	r := gin.Default()

	r.POST("/user", init.UserController.CreateUser)
	r.GET("/user", init.UserController.GetAllUsers)

	return r
}
