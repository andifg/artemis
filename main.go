package main

import (
	"github.com/andifg/artemis_backend/app/constant"
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

	appConfig := constant.AppConfigInit()

	db := config.InitDB(appConfig.DatabaseHost, appConfig.DatabaseUser, appConfig.DatabasePassword, appConfig.DatabaseName, appConfig.DatabasePort)
	userRepo := repository.UserRepositoryInit(db)
	userService := service.UserServiceInit(userRepo)
	userController := controller.UserControllerInit(userService)
	healthCheckController := controller.HealthCheckControllerInit()

	init := config.Init(userRepo, userService, userController, healthCheckController)

	r := router.Init(init)
	r.Run(":8080")

}
