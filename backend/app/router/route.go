package router

import (
	"github.com/andifg/artemis_backend/app/middleware"
	"github.com/andifg/artemis_backend/app/pkg/auth"
	"github.com/andifg/artemis_backend/config"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Init(init *config.Initialization, oidcMgr auth.OidcManager, origin string) *gin.Engine {
	gin.SetMode(gin.ReleaseMode)
	r := gin.New()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{origin}
	r.Use(cors.New(config))

	r.GET("health", init.HealathCheckController.HealthCheck)

	api := r.Group("/api")
	{
		v1_unauthorized := api.Group("/v1")
		{
			v1_unauthorized.GET("/login", init.AuthController.Login)

		}

		v1_authorized := api.Group("/v1", middleware.AuthMiddleware(oidcMgr))
		{
			v1_authorized.POST("/user", init.UserController.CreateUser)

			v1_authorized.PATCH("/user/:id", init.UserController.PatchUser)

			v1_authorized.GET("/user/:id", init.UserController.GetUser)

			v1_authorized.GET("/user", init.UserController.GetAllUsers)

			v1_authorized.POST("/user/:id/meat-portions", init.MeatPortionController.CreateMeatPortion)

			v1_authorized.PATCH("/user/:id/meat-portions/:meatPortionId", init.MeatPortionController.UpdateMeatPortion)

			v1_authorized.GET("/user/:id/daily-overview", init.MeatPortionController.GetDailyOverview)

			v1_authorized.GET("/user/:id/meat-portion", init.MeatPortionController.GetMeatPortions)

			v1_authorized.DELETE("/user/:id/meat-portion/:meatPortionId", init.MeatPortionController.DeleteMeatPortion)

			v1_authorized.GET("/user/:id/average", init.MeatPortionController.GetAverage)

			v1_authorized.GET("/user/:id/aggregate", init.MeatPortionController.GetAggregatedMeatPortionsByTimeframe)

		}

	}

	return r

}
