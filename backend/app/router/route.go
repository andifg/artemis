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

			v1_authorized.POST("/user/:id/servings", init.ServingController.CreateServing)

			v1_authorized.GET("/user/:id/servings", init.ServingController.GetServings)

			v1_authorized.PATCH("/user/:id/servings/:servingId", init.ServingController.UpdateServing)

			v1_authorized.DELETE("/user/:id/servings/:servingId", init.ServingController.DeleteServing)

			v1_authorized.GET("/user/:id/daily-overview", init.ServingController.GetDailyOverview)

			v1_authorized.GET("/user/:id/servings/aggregate", init.ServingController.GetAggregatedServingsByTimeframe)

			v1_authorized.GET("/user/:id/servings-averages", init.ServingController.GetServingsAverages)

			v1_authorized.GET("/user/:id/serving-streaks", init.ServingController.GetServingsStreaks)

		}

	}

	return r

}
