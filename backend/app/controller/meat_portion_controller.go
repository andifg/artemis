package controller

import (
	"fmt"
	"net/http"

	"github.com/andifg/artemis_backend/app/constant"
	"github.com/andifg/artemis_backend/app/domain/dao"
	"github.com/andifg/artemis_backend/app/domain/dto"
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
	UpdateMeatPortion(c *gin.Context)
	GetDailyOverview(c *gin.Context)
	GetMeatPortions(c *gin.Context)
	DeleteMeatPortion(c *gin.Context)
	GetAverage(c *gin.Context)
	GetAggregatedMeatPortionsByTimeframe(c *gin.Context)
}

type MeatPortionControllerImpl struct {
	meatPortionService service.MeatPortionService
}

func (controller MeatPortionControllerImpl) CreateMeatPortion(c *gin.Context) {
	defer pkg.PanicHandler(c)

	user_id := contextutils.GetUserID(c)

	var createMeatPortion dto.CreateMeatPortion

	if err := c.BindJSON(&createMeatPortion); err != nil {
		log.Error("Error binding meat portion: ", err)
		contextutils.HandleError(customerrors.NewBadRequestError(fmt.Sprintf("Invalid Request Body: %v", err)), c)
		return
	}

	meatPortion := dao.MeatPortion{
		ID:     createMeatPortion.ID,
		Size:   createMeatPortion.Size,
		UserID: user_id,
		Date:   createMeatPortion.Date,
		Note:   createMeatPortion.Note,
	}

	portion, err := controller.meatPortionService.CreateMeatPortion(meatPortion)

	if err != nil {
		log.Error("Error creating meat portion: ", err)
		contextutils.HandleError(err, c)
		return
	}

	c.JSON(http.StatusCreated, pkg.BuildResponse(constant.Success, portion))

}

func (controller MeatPortionControllerImpl) UpdateMeatPortion(c *gin.Context) {
	defer pkg.PanicHandler(c)

	user_id := contextutils.GetUserID(c)

	portion_id := uuid.MustParse(c.Param("meatPortionId"))

	var updatePortion dto.UpdateMeatPortion

	if err := c.BindJSON(&updatePortion); err != nil {
		log.Error("Error binding meat portion: ", err)
		contextutils.HandleError(customerrors.NewBadRequestError(fmt.Sprintf("Invalid Request Body: %v", err)), c)
		return
	}

	meatPortion := dao.MeatPortion{
		ID:     portion_id,
		Size:   updatePortion.Size,
		UserID: user_id,
		Date:   updatePortion.Date,
		Note:   updatePortion.Note,
	}

	portion, err := controller.meatPortionService.UpdateMeatPortion(meatPortion)

	if err != nil {
		log.Error("Error updating meat portion: ", err)
		contextutils.HandleError(err, c)
		return
	}

	c.JSON(http.StatusOK, pkg.BuildResponse(constant.Success, portion))

}

func (controller MeatPortionControllerImpl) GetDailyOverview(c *gin.Context) {
	defer pkg.PanicHandler(c)

	user_id := contextutils.GetUserID(c)

	daily_overview_map, err := controller.meatPortionService.GetDailyOverview(user_id)

	if err != nil {
		log.Error("Error getting daily overview: ", err)
		contextutils.HandleError(err, c)
		return
	}

	c.JSON(http.StatusOK, pkg.BuildResponse(constant.Success, daily_overview_map))

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

		log.Error("Error deleting meat portion: ", err)

		contextutils.HandleError(err, c)
		return
	}

	c.Status(http.StatusNoContent)
}

func (controller MeatPortionControllerImpl) GetAverage(c *gin.Context) {
	defer pkg.PanicHandler(c)
	user_id := contextutils.GetUserID(c)

	timeframe := c.Query("timeframe")

	averageData, err := controller.meatPortionService.GetWeeklyAverage(user_id, timeframe)

	if err != nil {
		log.Error("Error getting average: ", err)
		contextutils.HandleError(err, c)
		return
	}

	c.JSON(http.StatusOK, pkg.BuildResponse(constant.Success, averageData))

}

func (controller MeatPortionControllerImpl) GetAggregatedMeatPortionsByTimeframe(c *gin.Context) {
	defer pkg.PanicHandler(c)
	user := c.Param("id")
	user_id := uuid.MustParse(user)

	timeframe := c.Query("timeframe")

	log.Debug(fmt.Sprintf("TIMEFRAME: %s", timeframe))

	aggreatedMeatPortion, err := controller.meatPortionService.GetAggregatedMeatPortionsByTimeframe(user_id, dto.Timeframe(timeframe))

	if err != nil {
		log.Error("Error getting aggregated meat portions: ", err)
		contextutils.HandleError(err, c)
		return
	}

	c.JSON(http.StatusOK, pkg.BuildResponse(constant.Success, aggreatedMeatPortion))
}

func NewMeatPortionController(s service.MeatPortionService) MeatPortionController {
	return &MeatPortionControllerImpl{
		meatPortionService: s,
	}
}
