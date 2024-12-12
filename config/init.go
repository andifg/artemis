package config

import (
	"github.com/andifg/artemis_backend/app/constant"
	"github.com/andifg/artemis_backend/app/controller"
	"github.com/andifg/artemis_backend/app/pkg/auth"
	"github.com/andifg/artemis_backend/app/repository"
	"github.com/andifg/artemis_backend/app/service"
)

type Initialization struct {
	UserController         controller.UserController
	AuthController         controller.AuthController
	HealathCheckController controller.HealthCheckController
	UserService            service.UserService
	UserRepository         repository.UserRepository
	OidcManager            auth.OidcManager
}

func Init(appConfig constant.AppConfig) *Initialization {

	db := InitDB(appConfig.DatabaseHost, appConfig.DatabaseUser, appConfig.DatabasePassword, appConfig.DatabaseName, appConfig.DatabasePort)
	userRepo := repository.UserRepositoryInit(db)
	userService := service.UserServiceInit(userRepo)
	oidcMgr := auth.OidcManagerInit(appConfig.KeycloakClientID, appConfig.KeycloakSecret, appConfig.KeycloakRealm, appConfig.KeycloakRealmIssuerUrl, appConfig.KeycloakRealmRedirectURI, appConfig.KeycloakURL, appConfig.KeycloakCertPath)
	authService := service.AuthServiceInit(oidcMgr)
	authController := controller.AuthControllerInit(authService)
	userController := controller.UserControllerInit(userService)
	healthCheckController := controller.HealthCheckControllerInit()

	return &Initialization{
		UserController:         userController,
		AuthController:         authController,
		HealathCheckController: healthCheckController,
		UserService:            userService,
		UserRepository:         userRepo,
		OidcManager:            oidcMgr,
	}
}
