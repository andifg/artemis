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

func NewMeatPortionService(meatPortionRepository repository.MeatPortionRepository) MeatPortionService {
	return &MeatPortionServiceImpl{
		meatPortionRepository: meatPortionRepository,
	}
}
