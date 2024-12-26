package repository

import (
	"fmt"
	"github.com/andifg/artemis_backend/app/domain/dao"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type MeatPortionRepository interface {
	CreateMeatPortion(meatPortion dao.MeatPortion) (dao.MeatPortion, error)
}

type MeatPortionRepositoryImpl struct {
	db *gorm.DB
}

func (m MeatPortionRepositoryImpl) CreateMeatPortion(meatPortion dao.MeatPortion) (dao.MeatPortion, error) {
	log.Debug(fmt.Sprintf("Creating Meat Portion: %v", meatPortion))
	result := m.db.Create(&meatPortion)
	if result.Error != nil {
		fmt.Println("Error: ", result.Error)
		return dao.MeatPortion{}, result.Error
	}

	log.Debug("Meat Portion created: ", meatPortion)
	return meatPortion, nil
}

func NewMeatPortionRepository(db *gorm.DB) MeatPortionRepository {
	return &MeatPortionRepositoryImpl{
		db: db,
	}
}
