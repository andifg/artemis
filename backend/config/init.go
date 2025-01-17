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
	MeatPortionController  controller.MeatPortionController
	HealathCheckController controller.HealthCheckController
	UserService            service.UserService
	UserRepository         repository.UserRepository
	OidcManager            auth.OidcManager
}

func Init(appConfig constant.AppConfig) *Initialization {

	db := InitDB(appConfig.DatabaseHost, appConfig.DatabaseUser, appConfig.DatabasePassword, appConfig.DatabaseName, appConfig.DatabasePort)
	userRepo := repository.UserRepositoryInit(db)
	meatPortionRepository := repository.NewMeatPortionRepository(db)
	userService := service.UserServiceInit(userRepo)
	meatPortionService := service.NewMeatPortionService(meatPortionRepository)
	oidcMgr := auth.OidcManagerInit(appConfig.KeycloakClientID, appConfig.KeycloakSecret, appConfig.KeycloakRealm, appConfig.KeycloakRealmIssuerUrl, appConfig.KeycloakRealmRedirectURI, appConfig.KeycloakURL, appConfig.KeycloakCertPath)
	authService := service.AuthServiceInit(oidcMgr, userRepo, appConfig)
	authController := controller.AuthControllerInit(authService)
	userController := controller.UserControllerInit(userService)
	meatPortionController := controller.NewMeatPortionController(meatPortionService)
	healthCheckController := controller.HealthCheckControllerInit()

	return &Initialization{
		UserController:         userController,
		MeatPortionController:  meatPortionController,
		AuthController:         authController,
		HealathCheckController: healthCheckController,
		UserService:            userService,
		UserRepository:         userRepo,
		OidcManager:            oidcMgr,
	}
}
