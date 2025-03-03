package main

import (
	"github.com/andifg/artemis_backend/app/constant"
	"github.com/andifg/artemis_backend/app/router"
	"github.com/andifg/artemis_backend/config"
	log "github.com/sirupsen/logrus"
)

func main() {
	log.Info("Starting Application")

	appConfig := constant.AppConfigInit()

	config.InitLog(*appConfig)
	init := config.Init(*appConfig)

	log.Info("Starting Router")

	r := router.Init(init, init.OidcManager, appConfig.FrontendOrigin)
	r.Run(":8000")

}
