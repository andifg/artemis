package controller

import (
	"errors"
	"net/http"

	"github.com/andifg/artemis_backend/app/pkg"
	"github.com/andifg/artemis_backend/app/pkg/contextutils"
	"github.com/andifg/artemis_backend/app/pkg/customerrors"
	"github.com/andifg/artemis_backend/app/service"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
)

type MeatPortionController interface {
	CreateMeatPortion(c *gin.Context)
	GetDailyOverview(c *gin.Context)
	GetMeatPortions(c *gin.Context)
	DeleteMeatPortion(c *gin.Context)
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

func (controller MeatPortionControllerImpl) DeleteMeatPortion(c *gin.Context) {
	defer pkg.PanicHandler(c)

	user_id := contextutils.GetUserID(c)
	meat_portion_id := uuid.MustParse(c.Param("meatPortionId"))

	err := controller.meatPortionService.DeleteMeatPortion(meat_portion_id, user_id)

	if err != nil {

		log.Info("Error deleting meat portion: ", err)

		var customErr *customerrors.NotFoundError

		if errors.As(err, &customErr) {
			c.JSON(http.StatusNotFound, gin.H{"erro": err.Error()})
			return
		}

		var aunthErr *customerrors.ForbiddenError

		if errors.As(err, &aunthErr) {
			c.JSON(http.StatusForbidden, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{"errorr": err.Error()})
		return
	}

	c.Status(http.StatusNoContent)
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
