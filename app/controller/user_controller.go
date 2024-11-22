package user_controller

import (
	"github.com/andifg/artemis_backend/app/service"
	"github.com/gin-gonic/gin"
)

type UserController interface {
	CreateUser(c *gin.Context)
	GetAllUsers(c *gin.Context)
}

type UserControllerImpl struct {
	userService service.UserService
}

func (controller UserControllerImpl) CreateUser(c *gin.Context) {
	controller.userService.CreateUser(c)
}

func (controller UserControllerImpl) GetAllUsers(c *gin.Context) {
	controller.userService.GetAllUsers(c)
}

func UserControllerInit(service service.UserService) UserController {
	return &UserControllerImpl{
		userService: service,
	}
}
