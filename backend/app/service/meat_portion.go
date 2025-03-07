package service

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/andifg/artemis_backend/app/constant"
	"github.com/andifg/artemis_backend/app/domain/dao"
	"github.com/andifg/artemis_backend/app/domain/dto"
	"github.com/andifg/artemis_backend/app/pkg"
	"github.com/andifg/artemis_backend/app/pkg/customerrors"
	"github.com/andifg/artemis_backend/app/repository"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
)

type MeatPortionService interface {
	CreateMeatPortion(portion dao.MeatPortion) (dao.MeatPortion, error)
	GetDailyOverview(*gin.Context)
	GetMeatPortionsByUserID(*gin.Context)
	DeleteMeatPortion(uuid.UUID, uuid.UUID) error
	GetVeggiStreak(*gin.Context)
	GetDailyAverage(*gin.Context)
	GetAggregatedMeatPortionsByTimeframe(*gin.Context)
}

type MeatPortionServiceImpl struct {
	meatPortionRepository repository.MeatPortionRepository
}

func (m MeatPortionServiceImpl) CreateMeatPortion(portion dao.MeatPortion) (dao.MeatPortion, error) {

	log.Info(fmt.Sprintf("Meat Portion to be created: %v", portion))

	usr, err := m.meatPortionRepository.CreateMeatPortion(portion)

	if err != nil {
		return dao.MeatPortion{}, err
	}

	return usr, nil
}

func (m MeatPortionServiceImpl) GetDailyOverview(c *gin.Context) {
	defer pkg.PanicHandler(c)
	user := c.Param("id")
	user_id := uuid.MustParse(user)

	log.Info("Fetch Meat Portions for Daily Overview")

	var meatPortions []dao.MeatPortion

	twoWeeksAgo := time.Now().AddDate(0, 0, -14)

	meatPortions, err := m.meatPortionRepository.GetMeatPortionsByUserID(user_id.String(), &twoWeeksAgo, nil)

	if err != nil {
		log.Error("Error getting meat portions: ", err)
		pkg.PanicException(constant.InvalidRequest)
		return
	}

	c.JSON(http.StatusOK, pkg.BuildResponse(constant.Success, meatPortions))

}

func (m MeatPortionServiceImpl) GetMeatPortionsByUserID(c *gin.Context) {

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

	var meatPortions []dao.MeatPortion

	meatPortions, errr := m.meatPortionRepository.GetMeatPortions(user_id.String(), page, size)

	if errr != nil {
		log.Error("Error getting meat portions: ", err)
		pkg.PanicException(constant.InvalidRequest)
		return
	}

	response_map := dto.MeatPortionTimeframe{}

	for _, portion := range meatPortions {
		date := portion.Date.Format("2006-01-02")
		response_map[date] = append(response_map[date], portion)
	}

	log.Debug("Response map: ", response_map)

	c.JSON(http.StatusOK, pkg.BuildResponse(constant.Success, response_map))

}

func (m MeatPortionServiceImpl) DeleteMeatPortion(meat_portion_id uuid.UUID, user_id uuid.UUID) error {

	log.Info("Delete Meat Portion with ID: ", meat_portion_id)

	portion, err := m.meatPortionRepository.GetMeatPortionById(meat_portion_id.String())

	if err != nil {
		log.Error("Error getting meat portion: d ", err)
		return err
	}

	if portion.UserID != user_id {
		log.Debug("User is not the owner of the meat portion. user_id: ", user_id, " portion owner: ", portion.UserID)
		return customerrors.NewForbiddenError("User is not authorized to delete meat portion")
	}

	err = m.meatPortionRepository.DeleteMeatPortion(meat_portion_id.String())

	if err != nil {
		log.Error("Error deleting meat portion: ", err)
		return err
	}

	return nil

}

func (m MeatPortionServiceImpl) GetVeggiStreak(c *gin.Context) {
	defer pkg.PanicHandler(c)

	user := c.Param("id")
	user_id := uuid.MustParse(user)

	log.Info("Fetching Meat Portions for Veggi Streak")

	var meatPortions []dao.MeatPortion

	var streak int

	limit := 1

	meatPortions, err := m.meatPortionRepository.GetMeatPortionsByUserID(user_id.String(), nil, &limit)

	if err != nil {
		log.Error("Error getting meat portions: ", err)
		pkg.PanicException(constant.InvalidRequest)
		return
	}

	if len(meatPortions) == 0 {
		streak = 0
	} else {
		now := time.Now()
		log.Debug("Len of meat portions: ", len(meatPortions))
		log.Debug(fmt.Sprintf("Newest meat portion: %v \n", meatPortions[0].Date))
		diff := now.Sub(meatPortions[0].Date)
		streak = int(diff.Hours() / 24)
	}

	c.JSON(http.StatusOK, pkg.BuildResponse(constant.Success, streak))

}

func (m MeatPortionServiceImpl) GetDailyAverage(c *gin.Context) {
	defer pkg.PanicHandler(c)
	user := c.Param("id")
	user_id := uuid.MustParse(user)

	timeframe := c.Query("timeframe")

	var cutoff time.Time
	var middleTime time.Time
	var weeks int64

	switch {
	case timeframe == "week":
		cutoff = time.Now().AddDate(0, 0, -14)
		middleTime = time.Now().AddDate(0, 0, -7)
		weeks = 1
	case timeframe == "month":
		cutoff = time.Now().AddDate(0, -2, 0)
		middleTime = time.Now().AddDate(0, -1, 0)
		weeks = 4
	case timeframe == "quarter":
		cutoff = time.Now().AddDate(0, -12, 0)
		middleTime = time.Now().AddDate(0, -6, 0)
		weeks = 24
	default:
		log.Error("Invalid timeframe value selected")
		pkg.PanicException(constant.InvalidRequest)
	}

	meatPortions, err := m.meatPortionRepository.GetMeatPortionsByUserID(user_id.String(), &cutoff, nil)

	if err != nil {
		log.Error("Error getting meat portions: ", err)
		pkg.PanicException(constant.InvalidRequest)
		return
	}

	var sumNew int64
	var sumOld int64

	for _, portion := range meatPortions {
		if portion.Date.Before(middleTime) {
			sumOld++
		} else {
			sumNew++
		}
	}

	averageNew := float64(sumNew / weeks)
	averageOld := float64(sumOld / weeks)

	changeRate := 0

	if averageOld != 0 {
		changeRate = int(float64(averageNew-averageOld) / float64(averageOld) * 100)
	}

	log.Debug(fmt.Sprintf("Sum of new: %d, Sum of old %d with change rate %d%% \n", sumNew, sumOld, changeRate))

	avg := dto.AverageMeatPortions{
		Timeframe:  dto.Timeframe(timeframe),
		Value:      int64(averageNew),
		ChangeRate: int64(changeRate),
	}

	c.JSON(http.StatusOK, pkg.BuildResponse(constant.Success, avg))
}

func (m MeatPortionServiceImpl) GetAggregatedMeatPortionsByTimeframe(c *gin.Context) {
	defer pkg.PanicHandler(c)
	user := c.Param("id")
	user_id := uuid.MustParse(user)

	timeframe := c.Query("timeframe")

	log.Debug(fmt.Sprintf("TIMEFRAME: %s", timeframe))

	if timeframe != "week" && timeframe != "month" && timeframe != "quarter" {
		log.Error(fmt.Sprintf("Invalid timeframe value selected: %s", timeframe))
		pkg.PanicException(constant.InvalidRequest)
		return
	}

	var aggregatedMeatPortions []dao.AggregatedMeatPortions

	aggregatedMeatPortions, err := m.meatPortionRepository.GetAggregatedMeatPortionsByTimeframe(user_id.String(), dao.Timeframe(timeframe))

	if err != nil {
		log.Error("Error getting aggregated meat portions: ", err)
		pkg.PanicException(constant.InvalidRequest)
		return
	}

	c.JSON(http.StatusOK, pkg.BuildResponse(constant.Success, aggregatedMeatPortions))
}

func NewMeatPortionService(meatPortionRepository repository.MeatPortionRepository) MeatPortionService {
	return &MeatPortionServiceImpl{
		meatPortionRepository: meatPortionRepository,
	}
}
