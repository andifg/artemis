package repository

import (
	"fmt"
	"github.com/andifg/artemis_backend/app/domain/dao"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"time"
)

type MeatPortionRepository interface {
	CreateMeatPortion(meatPortion dao.MeatPortion) (dao.MeatPortion, error)
	GetMeatPortionsByUserID(userID string, cutOffDay *time.Time, limit *int) ([]dao.MeatPortion, error)
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


func (m MeatPortionRepositoryImpl) GetMeatPortionsByUserID(userID string, cutOffDay *time.Time, limit *int) ([]dao.MeatPortion, error) {
	log.Debug(fmt.Sprintf("Getting Meat Portion by user ID: %v", userID))

	var meatPortions []dao.MeatPortion

	query := m.db.Model(&dao.MeatPortion{}).Where("user_id = ?", userID)

	if cutOffDay != nil {
		query = query.Where("date >= ?", cutOffDay)
	}

	if limit != nil {
		query = query.Limit(*limit)
	}

	result := query.Find(&meatPortions)
	if result.Error != nil {
		fmt.Println("Error: ", result.Error)
		return []dao.MeatPortion{}, result.Error
	}

	log.Debug("Meat Portion found: ", meatPortions)
	return meatPortions, nil
}


func NewMeatPortionRepository(db *gorm.DB) MeatPortionRepository {
	return &MeatPortionRepositoryImpl{
		db: db,
	}
}
