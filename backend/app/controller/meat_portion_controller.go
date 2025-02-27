package controller

import (
	"github.com/andifg/artemis_backend/app/service"
	"github.com/gin-gonic/gin"
)

type MeatPortionController interface {
	CreateMeatPortion(c *gin.Context)
	GetDailyOverview(c *gin.Context)
	GetMeatPortions(c *gin.Context)
	GetStreak(c *gin.Context)
	GetAverage(c *gin.Context)
	GetAggregatedMeatPortionsByTimeframe(c *gin.Context)
}

type MeatPortionControllerImpl struct {
	meatPortionService service.MeatPortionService
}

func (controller MeatPortionControllerImpl) CreateMeatPortion(c *gin.Context) {
	controller.meatPortionService.CreateMeatPortion(c)
}

func (controller MeatPortionControllerImpl) GetDailyOverview(c *gin.Context) {
	controller.meatPortionService.GetDailyOverview(c)
}

func (controller MeatPortionControllerImpl) GetMeatPortions(c *gin.Context) {
	controller.meatPortionService.GetMeatPortionsByUserID(c)
}

func (controller MeatPortionControllerImpl) GetStreak(c *gin.Context) {
	controller.meatPortionService.GetVeggiStreak(c)
}

func (controller MeatPortionControllerImpl) GetAverage(c *gin.Context) {
	controller.meatPortionService.GetDailyAverage(c)

}

func (controller MeatPortionControllerImpl) GetAggregatedMeatPortionsByTimeframe(c *gin.Context) {
	controller.meatPortionService.GetAggregatedMeatPortionsByTimeframe(c)
}

func NewMeatPortionController(s service.MeatPortionService) MeatPortionController {
	return &MeatPortionControllerImpl{
		meatPortionService: s,
	}
}
