package controller

import (
	"github.com/andifg/artemis_backend/app/service"
	"github.com/gin-gonic/gin"
)

type AuthController interface {
	Login(c *gin.Context)
	Refresh(c *gin.Context)
}

type AuthControllerImpl struct {
	authService service.AuthService
}

func (controller *AuthControllerImpl) Login(c *gin.Context) {
	controller.authService.Login(c)
}

func (controller *AuthControllerImpl) Refresh(c *gin.Context) {
	controller.authService.Refresh(c)
}

func AuthControllerInit(authService service.AuthService) AuthController {
	return &AuthControllerImpl{
		authService: authService,
	}
}
