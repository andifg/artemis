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
	GetAggregatedMeatPortionsByTimeframe(userID string, timeframe dao.Timeframe) ([]dao.AggregatedMeatPortions, error)
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

	query := m.db.Model(&dao.MeatPortion{}).Where("user_id = ?", userID).Order("date desc")

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

func (m MeatPortionRepositoryImpl) GetAggregatedMeatPortionsByTimeframe(userID string, timeframe dao.Timeframe) ([]dao.AggregatedMeatPortions, error) {
	log.Debug(fmt.Sprintf("Getting Aggregated Meat Portion by user ID: %v, timeframe: %v", userID, timeframe))

	var aggregatedMeatPortions []dao.AggregatedMeatPortions

	switch timeframe {
	case dao.Week:
		timeframe = "week"
	case dao.Month:
		timeframe = "month"
	case dao.Quarter:
		timeframe = "quarter"
	}

	query := m.db.Model(&dao.MeatPortion{}).Select("date_trunc(?, date) as timeframe_start, count(*) as total, ? as timeframe", timeframe, timeframe).
		Where("user_id = ?", userID).Group("timeframe_start").Order("timeframe_start desc").Limit(6)

	result := query.Find(&aggregatedMeatPortions)
	if result.Error != nil {
		fmt.Println("Error: ", result.Error)
		return []dao.AggregatedMeatPortions{}, result.Error
	}

	log.Debug("Aggregated Meat Portion found: ", aggregatedMeatPortions)
	return aggregatedMeatPortions, nil
}

func NewMeatPortionRepository(db *gorm.DB) MeatPortionRepository {
	return &MeatPortionRepositoryImpl{
		db: db,
	}
}
