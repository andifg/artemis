package config

import (
	"github.com/andifg/artemis_backend/app/controller"
	"github.com/andifg/artemis_backend/app/repository"
	"github.com/andifg/artemis_backend/app/service"
)

type Initialization struct {
	UserController user_controller.UserController
	UserService    service.UserService
	UserRepository repository.UserRepository
}

func Init(userRepo repository.UserRepository, userService service.UserService, userController user_controller.UserController) *Initialization {
	return &Initialization{
		UserController: userController,
		UserService:    userService,
		UserRepository: userRepo,
	}
}
