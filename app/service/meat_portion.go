package service

import (
	"fmt"
	"net/http"
	"time"

	"github.com/andifg/artemis_backend/app/constant"
	"github.com/andifg/artemis_backend/app/domain/dao"
	"github.com/andifg/artemis_backend/app/domain/dto"
	"github.com/andifg/artemis_backend/app/pkg"
	"github.com/andifg/artemis_backend/app/repository"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
)

type MeatPortionService interface {
	CreateMeatPortion(*gin.Context)
	GetDailyOverview(*gin.Context)
	GetVeggiStreak(*gin.Context)
	GetDailyAverage(*gin.Context)
	GetAggregatedMeatPortionsByTimeframe(*gin.Context)
}

type MeatPortionServiceImpl struct {
	meatPortionRepository repository.MeatPortionRepository
}

func (m MeatPortionServiceImpl) CreateMeatPortion(c *gin.Context) {
	defer pkg.PanicHandler(c)

	user := c.Param("id")
	user_id := uuid.MustParse(user)

	log.Info("Create Meat Portion")

	var createMeatPortion dto.CreateMeatPortion

	if err := c.BindJSON(&createMeatPortion); err != nil {
		log.Error("Error binding meat portion: ", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	usr, err := m.meatPortionRepository.CreateMeatPortion(dao.MeatPortion{
		ID:     createMeatPortion.ID,
		Size:   createMeatPortion.Size,
		UserID: user_id,
		Date:   createMeatPortion.Date,
	})

	if err != nil {
		log.Error("Error creating meat portion: ", err)
		pkg.PanicException(constant.InvalidRequest)
		return
	}

	c.JSON(http.StatusCreated, pkg.BuildResponse(constant.Success, usr))
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
		log.Debug(fmt.Printf("Newest meat portion: %v \n", meatPortions[0].Date))
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

	log.Debug(fmt.Printf("Sum of new: %d, Sum of old %d with change rate %d%% \n", sumNew, sumOld, changeRate))

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
