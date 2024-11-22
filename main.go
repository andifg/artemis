package main

import (
	"fmt"
	"github.com/andifg/artemis_backend/app/controller"
	"github.com/andifg/artemis_backend/app/repository"
	"github.com/andifg/artemis_backend/app/router"
	"github.com/andifg/artemis_backend/app/service"
	"github.com/andifg/artemis_backend/config"
)

func main() {
	fmt.Println("Hello, World!")

	db := config.InitDB()
	userRepo := repository.UserRepositoryInit(db)
	userService := service.UserServiceInit(userRepo)
	userController := user_controller.UserControllerInit(userService)

	init := config.Init(userRepo, userService, userController)

	r := router.Init(init)
	r.Run(":8080")

}
