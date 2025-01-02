package controller

import (
	"github.com/andifg/artemis_backend/app/service"
	"github.com/gin-gonic/gin"
)

type MeatPortionController interface {
	CreateMeatPortion(c *gin.Context)
	GetDailyOverview(c * gin.Context)
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

func NewMeatPortionController(s service.MeatPortionService) MeatPortionController {
	return &MeatPortionControllerImpl{
		meatPortionService: s,
	}
}
