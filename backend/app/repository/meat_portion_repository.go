package repository

import (
	"errors"
	"fmt"
	"time"

	"github.com/andifg/artemis_backend/app/domain/dao"
	"github.com/andifg/artemis_backend/app/pkg/customerrors"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type MeatPortionRepository interface {
	CreateMeatPortion(meatPortion dao.MeatPortion) (dao.MeatPortion, error)
	GetMeatPortionById(meatPortionID string) (dao.MeatPortion, error)
	GetMeatPortions(userID string, page int, limit int, cutOffDay *time.Time) ([]dao.MeatPortion, error)
	DeleteMeatPortion(meatPortionID string) error
	GetAggregatedMeatPortionsByTimeframe(userID string, timeframe dao.Timeframe) ([]dao.AggregatedMeatPortions, error)
}

type MeatPortionRepositoryImpl struct {
	db *gorm.DB
}

func (m MeatPortionRepositoryImpl) CreateMeatPortion(meatPortion dao.MeatPortion) (dao.MeatPortion, error) {
	result := m.db.Create(&meatPortion)
	if result.Error != nil {

		log.Error("Error creating Meat Portion: ", result.Error)

		if errors.Is(result.Error, gorm.ErrDuplicatedKey) {
			return dao.MeatPortion{}, customerrors.NewDuplicateKeyError(fmt.Sprintf("Meat Portion with ID %v already exists", meatPortion.ID))
		}

		return dao.MeatPortion{}, result.Error
	}

	log.Debug("Meat Portion created: ", meatPortion)
	return meatPortion, nil
}

func (m MeatPortionRepositoryImpl) GetMeatPortionsByUserID(userID string, cutOffDay *time.Time, limit *int) ([]dao.MeatPortion, error) {
	log.Debug(fmt.Sprintf("Fetching Meat Portion by user ID: %v", userID))

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

	log.Debug("Meat Portions found: ", meatPortions)
	return meatPortions, nil
}

func (m MeatPortionRepositoryImpl) GetMeatPortionById(meatPortionID string) (dao.MeatPortion, error) {
	log.Debug(fmt.Sprintf("Getting Meat Portion by ID: %v", meatPortionID))

	var meatPortion dao.MeatPortion

	result := m.db.First(&meatPortion, "id = ?", meatPortionID)

	if result.Error != nil {

		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return dao.MeatPortion{}, customerrors.NewNotFoundError(meatPortionID)
		}

		fmt.Println("Error: ", result.Error)
		return dao.MeatPortion{}, result.Error
	}

	// log.Debug("Meat Portion found: ", meatPortion)
	log.Debug(fmt.Printf("Meat Portion found: %v", meatPortion))
	return meatPortion, nil
}

func (m MeatPortionRepositoryImpl) DeleteMeatPortion(meatPortionID string) error {
	log.Debug(fmt.Sprintf("Deleting Meat Portion by ID: %v", meatPortionID))

	result := m.db.Delete(&dao.MeatPortion{}, "id = ?", meatPortionID)
	if result.Error != nil {
		return result.Error
	}

	log.Info("Meat Portion deleted: ", meatPortionID)
	return nil
}

func (m MeatPortionRepositoryImpl) GetMeatPortions(userID string, page int, limit int, cutOffDay *time.Time) ([]dao.MeatPortion, error) {

	log.Debug(fmt.Sprintf("Getting Meat Portion by user ID: %v for page %d", userID, page))

	var meatPortions []dao.MeatPortion

	query := m.db.Model(&dao.MeatPortion{}).Where("user_id = ?", userID).Order("date desc")

	if page != 0 {
		query = query.Offset((page - 1) * limit)
	}

	if limit != 0 {
		query = query.Limit(limit)
	}

	if cutOffDay != nil {
		query = query.Where("date >= ?", cutOffDay)
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
	var intervalMax int64 = 5
	var intervalStep int64 = 1
	var intervalEntity string

	switch timeframe {
	case dao.Week:
		timeframe = "week"
		intervalEntity = "week"
	case dao.Month:
		timeframe = "month"
		intervalEntity = "month"
	case dao.Quarter:
		timeframe = "quarter"
		intervalEntity = "month"
		intervalMax = 15
		intervalStep = 3
	}

	queryStr := fmt.Sprintf(`
	WITH time_series AS (
    SELECT generate_series(
        date_trunc('%s', NOW()) - INTERVAL '%d %ss',
        date_trunc('%s', NOW()),
        INTERVAL '%d %s'
    ) AS timeframe_start
	)
	SELECT ts.timeframe_start, COALESCE(mp.total, 0) AS total, '%s' AS timeframe
	FROM time_series ts
	LEFT JOIN (
	SELECT date_trunc('%s', date) AS timeframe_start, COUNT(*) AS total
	FROM meat_portions
	WHERE user_id = '%s'
	GROUP BY timeframe_start
	) mp ON ts.timeframe_start = mp.timeframe_start
	ORDER BY ts.timeframe_start DESC;
	`, timeframe, intervalMax, intervalEntity, timeframe, intervalStep, intervalEntity, timeframe, timeframe, userID)

	query := m.db.Raw(queryStr).Scan(&aggregatedMeatPortions)

	if query.Error != nil {
		log.Error("Error retrieving aggregated meat portions: ", query.Error)
		return nil, query.Error
	}

	log.Debug("Aggregated Meat Portions found: ", aggregatedMeatPortions)
	return aggregatedMeatPortions, nil
}

func NewMeatPortionRepository(db *gorm.DB) MeatPortionRepository {
	return &MeatPortionRepositoryImpl{
		db: db,
	}
}
