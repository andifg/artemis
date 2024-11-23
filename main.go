package main

import (
	"github.com/andifg/artemis_backend/app/controller"
	"github.com/andifg/artemis_backend/app/repository"
	"github.com/andifg/artemis_backend/app/router"
	"github.com/andifg/artemis_backend/app/service"
	"github.com/andifg/artemis_backend/config"
	log "github.com/sirupsen/logrus"
)

func init() {
	config.InitLog()
}

func main() {
	log.Info("Starting Application")

	db := config.InitDB()
	userRepo := repository.UserRepositoryInit(db)
	userService := service.UserServiceInit(userRepo)
	userController := user_controller.UserControllerInit(userService)

	init := config.Init(userRepo, userService, userController)

	r := router.Init(init)
	r.Run(":8080")

}
