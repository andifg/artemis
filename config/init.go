package config

import (
	"github.com/andifg/artemis_backend/app/controller"
	"github.com/andifg/artemis_backend/app/repository"
	"github.com/andifg/artemis_backend/app/service"
)

type Initialization struct {
	UserController controller.UserController
	HealathCheckController controller.HealthCheckController
	UserService    service.UserService
	UserRepository repository.UserRepository
}

func Init(userRepo repository.UserRepository, userService service.UserService, userController controller.UserController, healthCheckController controller.HealthCheckController) *Initialization {
	return &Initialization{
		UserController: userController,
		HealathCheckController: healthCheckController,
		UserService:    userService,
		UserRepository: userRepo,
	}
}
