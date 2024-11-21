package user_controller

import (
	"github.com/gin-gonic/gin"
)

type UserController interface {
	CreateUser(c *gin.Context)
	GetAllUsers(c *gin.Context)
}

type UserControllerImpl struct {
	userService string
}

func (controller UserControllerImpl) CreateUser(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "Create User",
	})
}

func (controller UserControllerImpl) GetAllUsers(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "Get All Users",
	})
}

func UserControllerInit() UserController {
	return &UserControllerImpl{
		userService: "user_service",
	}
}
