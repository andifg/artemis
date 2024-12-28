package service

import (
	"github.com/andifg/artemis_backend/app/constant"
	"github.com/andifg/artemis_backend/app/domain/dao"
	"github.com/andifg/artemis_backend/app/domain/dto"
	"github.com/google/uuid"
	"net/http"

	"github.com/andifg/artemis_backend/app/pkg"
	"github.com/andifg/artemis_backend/app/repository"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

type MeatPortionService interface {
	CreateMeatPortion(*gin.Context)
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
		Date: createMeatPortion.Date,
	})

	if err != nil {
		log.Error("Error creating meat portion: ", err)
		pkg.PanicException(constant.InvalidRequest)
		return
	}

	c.JSON(http.StatusCreated, pkg.BuildResponse(constant.Success, usr))
}

func NewMeatPortionService(meatPortionRepository repository.MeatPortionRepository) MeatPortionService {
	return &MeatPortionServiceImpl{
		meatPortionRepository: meatPortionRepository,
	}
}
