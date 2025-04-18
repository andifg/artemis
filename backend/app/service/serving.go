package service

import (
	"fmt"
	"github.com/andifg/artemis_backend/app/constant"
	"github.com/andifg/artemis_backend/app/domain/dao"
	"github.com/andifg/artemis_backend/app/domain/dto"
	"github.com/andifg/artemis_backend/app/pkg"
	"github.com/andifg/artemis_backend/app/pkg/customerrors"
	"github.com/andifg/artemis_backend/app/repository"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
	"net/http"
	"strconv"
)

type ServingService interface {
	CreateServing(portion dao.Serving) (dao.Serving, error)
	UpdateServing(portion dao.Serving) (dao.Serving, error)
	GetDailyOverview(userId uuid.UUID) ([]dto.DayOverview, error)
	GetServingsByUserID(*gin.Context)
	DeleteServing(uuid.UUID, uuid.UUID) error
	GetAggregatedServingsByTimeframe(uuid.UUID, dto.Timeframe) ([]dto.AggregatedServings, error)
	GetServingsAverages(uuid.UUID, string) (dto.AverageServings, error)
	GetServingsStreaks(uuid.UUID) ([]dto.ServingStreaks, error)
}

type ServingServiceImpl struct {
	meatPortionRepository repository.ServingRepository
}

func (m ServingServiceImpl) CreateServing(portion dao.Serving) (dao.Serving, error) {

	log.Info(fmt.Sprintf("Meat Portion to be created: %v", portion))

	usr, err := m.meatPortionRepository.CreateServing(portion)

	if err != nil {
		return dao.Serving{}, err
	}

	return usr, nil
}

func (m ServingServiceImpl) UpdateServing(portion dao.Serving) (dao.Serving, error) {

	log.Info(fmt.Sprintf("Meat Portion to be updated: %v", portion))

	usr, err := m.meatPortionRepository.UpdateServing(portion)

	if err != nil {
		log.Error("Error updating meat portion: ", err)
		return dao.Serving{}, err
	}

	return usr, nil
}

func (m ServingServiceImpl) GetDailyOverview(userId uuid.UUID) ([]dto.DayOverview, error) {

	log.Info("Fetch Meat Portions for Daily Overview")

	dailyOverview, err := m.meatPortionRepository.GetDailyOverview(userId.String())

	if err != nil {
		log.Error("Error getting meat portions: ", err)
		return nil, err
	}

	return dailyOverview, nil
}

func (m ServingServiceImpl) GetServingsByUserID(c *gin.Context) {

	defer pkg.PanicHandler(c)

	user := c.Param("id")
	user_id := uuid.MustParse(user)

	page_str := c.Query("page")

	if page_str == "" {
		page_str = "1"
	}

	size_str := c.Query("size")

	if size_str == "" {
		size_str = "15"
	}

	page, err := strconv.Atoi(page_str)

	if err != nil {
		log.Error("Error converting page to int: ", err)
		pkg.PanicException(constant.InvalidRequest)
		return
	}

	size, err := strconv.Atoi(size_str)

	if err != nil {
		log.Error("Error converting size to int: ", err)
		pkg.PanicException(constant.InvalidRequest)
		return
	}

	log.Info("Fetching Meat Portion List")

	var meatPortions []dao.Serving

	meatPortions, errr := m.meatPortionRepository.GetServings(user_id.String(), page, size, nil)

	if errr != nil {
		log.Error("Error getting meat portions: ", err)
		pkg.PanicException(constant.InvalidRequest)
		return
	}

	response_map := dto.ServingTimeframe{}

	for _, portion := range meatPortions {
		date := portion.Date.Format("2006-01-02")
		response_map[date] = append(response_map[date], portion)
	}

	log.Debug("Response map: ", response_map)

	c.JSON(http.StatusOK, pkg.BuildResponse(constant.Success, response_map))

}

func (m ServingServiceImpl) DeleteServing(meat_portion_id uuid.UUID, user_id uuid.UUID) error {

	log.Info("Delete Meat Portion with ID: ", meat_portion_id)

	portion, err := m.meatPortionRepository.GetServingById(meat_portion_id.String())

	if err != nil {
		log.Error("Error getting meat portion: d ", err)
		return err
	}

	if portion.UserID != user_id {
		log.Debug("User is not the owner of the meat portion. user_id: ", user_id, " portion owner: ", portion.UserID)
		return customerrors.NewForbiddenError("User is not authorized to delete meat portion")
	}

	err = m.meatPortionRepository.DeleteServing(meat_portion_id.String())

	if err != nil {
		log.Error("Error deleting meat portion: ", err)
		return err
	}

	return nil

}

func (m ServingServiceImpl) GetServingsAverages(userId uuid.UUID, timeframe string) (dto.AverageServings, error) {

	log.Info(fmt.Sprintf("Getting Serving Averages by user ID: %v, timeframe: %v", userId, timeframe))

	avg, err := m.meatPortionRepository.GetServingsAverages(userId.String(), dto.Timeframe(timeframe))

	if err != nil {
		log.Error("Error getting meat portion averages: ", err)
		return dto.AverageServings{}, err
	}

	return avg, nil
}

func (m ServingServiceImpl) GetAggregatedServingsByTimeframe(user_id uuid.UUID, timeframe dto.Timeframe) ([]dto.AggregatedServings, error) {

	log.Info(fmt.Sprintf("Getting Aggregated Meat Portion by user ID: %v, timeframe: %v", user_id, timeframe))

	var aggregatedServings []dto.AggregatedServings

	aggregatedServings, err := m.meatPortionRepository.GetAggregatedServingsByTimeframe(user_id.String(), dto.Timeframe(timeframe))

	if err != nil {
		log.Error("Error getting aggregated meat portions: ", err)
		return []dto.AggregatedServings{}, err
	}

	return aggregatedServings, nil
}

func (m ServingServiceImpl) GetServingsStreaks(user_id uuid.UUID) ([]dto.ServingStreaks, error) {
	log.Info(fmt.Sprintf("Getting Meat Portion Streaks by user ID: %v", user_id))

	servingStreaks, err := m.meatPortionRepository.GetServingStreaks(user_id.String())

	if err != nil {
		log.Error("Error getting meat portion streaks: ", err)
		return []dto.ServingStreaks{}, err
	}

	return servingStreaks, nil
}

func NewServingService(meatPortionRepository repository.ServingRepository) ServingService {
	return &ServingServiceImpl{
		meatPortionRepository: meatPortionRepository,
	}
}
