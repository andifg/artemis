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

type ServingController interface {
	CreateServing(c *gin.Context)
	UpdateServing(c *gin.Context)
	GetDailyOverview(c *gin.Context)
	GetServings(c *gin.Context)
	DeleteServing(c *gin.Context)
	GetAggregatedServingsByTimeframe(c *gin.Context)
	GetServingsAverages(c *gin.Context)
	GetServingsStreaks(c *gin.Context)
}

type ServingControllerImpl struct {
	servingService service.ServingService
}

func (controller ServingControllerImpl) CreateServing(c *gin.Context) {
	defer pkg.PanicHandler(c)

	user_id := contextutils.GetUserID(c)

	var createServing dto.CreateServing

	if err := c.BindJSON(&createServing); err != nil {
		log.Error("Error binding meat portion: ", err)
		contextutils.HandleError(customerrors.NewBadRequestError(fmt.Sprintf("Invalid Request Body: %v", err)), c)
		return
	}

	serving := dao.Serving{
		ID:       createServing.ID,
		Category: createServing.Category,
		Size:     createServing.Size,
		UserID:   user_id,
		Date:     createServing.Date,
		Note:     createServing.Note,
	}

	portion, err := controller.servingService.CreateServing(serving)

	if err != nil {
		log.Error("Error creating meat portion: ", err)
		contextutils.HandleError(err, c)
		return
	}

	c.JSON(http.StatusCreated, pkg.BuildResponse(constant.Success, portion))

}

func (controller ServingControllerImpl) UpdateServing(c *gin.Context) {
	defer pkg.PanicHandler(c)

	user_id := contextutils.GetUserID(c)

	portion_id := uuid.MustParse(c.Param("servingId"))

	var updatePortion dto.UpdateServing

	if err := c.BindJSON(&updatePortion); err != nil {
		log.Error("Error binding meat portion: ", err)
		contextutils.HandleError(customerrors.NewBadRequestError(fmt.Sprintf("Invalid Request Body: %v", err)), c)
		return
	}

	serving := dao.Serving{
		ID:       portion_id,
		Category: updatePortion.Categroy,
		Size:     updatePortion.Size,
		UserID:   user_id,
		Date:     updatePortion.Date,
		Note:     updatePortion.Note,
	}

	portion, err := controller.servingService.UpdateServing(serving)

	if err != nil {
		log.Error("Error updating meat portion: ", err)
		contextutils.HandleError(err, c)
		return
	}

	c.JSON(http.StatusOK, pkg.BuildResponse(constant.Success, portion))

}

func (controller ServingControllerImpl) GetDailyOverview(c *gin.Context) {
	defer pkg.PanicHandler(c)

	user_id := contextutils.GetUserID(c)

	daily_overview_map, err := controller.servingService.GetDailyOverview(user_id)

	if err != nil {
		log.Error("Error getting daily overview: ", err)
		contextutils.HandleError(err, c)
		return
	}

	c.JSON(http.StatusOK, pkg.BuildResponse(constant.Success, daily_overview_map))

}

func (controller ServingControllerImpl) GetServings(c *gin.Context) {
	controller.servingService.GetServingsByUserID(c)
}

func (controller ServingControllerImpl) DeleteServing(c *gin.Context) {
	defer pkg.PanicHandler(c)

	user_id := contextutils.GetUserID(c)
	meat_portion_id := uuid.MustParse(c.Param("servingId"))

	err := controller.servingService.DeleteServing(meat_portion_id, user_id)

	if err != nil {

		log.Error("Error deleting meat portion: ", err)

		contextutils.HandleError(err, c)
		return
	}

	c.Status(http.StatusNoContent)
}

func (controller ServingControllerImpl) GetServingsAverages(c *gin.Context) {
	defer pkg.PanicHandler(c)
	user_id := contextutils.GetUserID(c)

	timeframe := c.Query("timeframe")

	averageData, err := controller.servingService.GetServingsAverages(user_id, timeframe)

	if err != nil {
		log.Error("Error getting average: ", err)
		contextutils.HandleError(err, c)
		return
	}

	c.JSON(http.StatusOK, pkg.BuildResponse(constant.Success, averageData))

}

func (controller ServingControllerImpl) GetAggregatedServingsByTimeframe(c *gin.Context) {
	defer pkg.PanicHandler(c)
	user := c.Param("id")
	user_id := uuid.MustParse(user)

	timeframe := c.Query("timeframe")

	log.Debug(fmt.Sprintf("TIMEFRAME: %s", timeframe))

	aggreatedServing, err := controller.servingService.GetAggregatedServingsByTimeframe(user_id, dto.Timeframe(timeframe))

	if err != nil {
		log.Error("Error getting aggregated meat portions: ", err)
		contextutils.HandleError(err, c)
		return
	}

	c.JSON(http.StatusOK, pkg.BuildResponse(constant.Success, aggreatedServing))
}

func (controller ServingControllerImpl) GetServingsStreaks(c *gin.Context) {
	defer pkg.PanicHandler(c)
	user := c.Param("id")
	user_id := uuid.MustParse(user)

	streaks, err := controller.servingService.GetServingsStreaks(user_id)

	if err != nil {
		log.Error("Error getting servings streaks: ", err)
		contextutils.HandleError(err, c)
		return
	}

	c.JSON(http.StatusOK, pkg.BuildResponse(constant.Success, streaks))
}

func NewServingController(s service.ServingService) ServingController {
	return &ServingControllerImpl{
		servingService: s,
	}
}
