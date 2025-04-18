package repository

import (
	"errors"
	"fmt"
	"github.com/andifg/artemis_backend/app/domain/dao"
	"github.com/andifg/artemis_backend/app/domain/dto"
	"github.com/andifg/artemis_backend/app/pkg/customerrors"
	"github.com/andifg/artemis_backend/app/repository/repository_queries"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"time"
)

type ServingRepository interface {
	CreateServing(serving dao.Serving) (dao.Serving, error)
	UpdateServing(serving dao.Serving) (dao.Serving, error)
	GetServingById(servingID string) (dao.Serving, error)
	GetDailyOverview(userID string) ([]dto.DayOverview, error)
	GetServings(userID string, page int, limit int, cutOffDay *time.Time) ([]dao.Serving, error)
	DeleteServing(servingID string) error
	GetAggregatedServingsByTimeframe(userID string, timeframe dto.Timeframe) ([]dto.AggregatedServings, error)
	GetServingsAverages(userID string, timeframe dto.Timeframe) (dto.AverageServings, error)
	GetServingStreaks(userID string) ([]dto.ServingStreaks, error)
}

type ServingRepositoryImpl struct {
	db *gorm.DB
}

func (m ServingRepositoryImpl) CreateServing(serving dao.Serving) (dao.Serving, error) {
	result := m.db.Create(&serving)
	if result.Error != nil {

		log.Error("Error creating Meat Portion: ", result.Error)

		if errors.Is(result.Error, gorm.ErrDuplicatedKey) {
			return dao.Serving{}, customerrors.NewDuplicateKeyError(fmt.Sprintf("Meat Portion with ID %v already exists", serving.ID))
		}

		return dao.Serving{}, result.Error
	}

	log.Debug("Meat Portion created: ", serving)
	return serving, nil
}

func (m ServingRepositoryImpl) UpdateServing(serving dao.Serving) (dao.Serving, error) {

	if err := m.db.First(&dao.Serving{}, serving.ID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return dao.Serving{}, customerrors.NewNotFoundError(serving.ID.String())
		}
		return dao.Serving{}, err // Return other database errors
	}

	result := m.db.Save(&serving)
	if result.Error != nil {
		return dao.Serving{}, result.Error
	}

	log.Debug("Meat Portion updated: ", serving)
	return serving, nil
}

func (m ServingRepositoryImpl) GetServingsByUserID(userID string, cutOffDay *time.Time, limit *int) ([]dao.Serving, error) {
	log.Debug(fmt.Sprintf("Fetching Meat Portion by user ID: %v", userID))

	var servings []dao.Serving

	query := m.db.Model(&dao.Serving{}).Where("user_id = ?", userID).Order("date desc")

	if cutOffDay != nil {
		query = query.Where("date >= ?", cutOffDay)
	}

	if limit != nil {
		query = query.Limit(*limit)
	}

	result := query.Find(&servings)
	if result.Error != nil {
		fmt.Println("Error: ", result.Error)
		return []dao.Serving{}, result.Error
	}

	log.Debug("Meat Portions found: ", servings)
	return servings, nil
}

func (m ServingRepositoryImpl) GetServingById(servingID string) (dao.Serving, error) {
	log.Debug(fmt.Sprintf("Getting Meat Portion by ID: %v", servingID))

	var serving dao.Serving

	result := m.db.First(&serving, "id = ?", servingID)

	if result.Error != nil {

		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return dao.Serving{}, customerrors.NewNotFoundError(servingID)
		}

		fmt.Println("Error: ", result.Error)
		return dao.Serving{}, result.Error
	}

	// log.Debug("Meat Portion found: ", serving)
	log.Debug(fmt.Printf("Meat Portion found: %v", serving))
	return serving, nil
}

func (m ServingRepositoryImpl) GetDailyOverview(userId string) ([]dto.DayOverview, error) {
	log.Debugf("Creating DailyOverview for user with ID: %v", userId)

	var dailyOverviews []dto.DayOverview

	queryStr := fmt.Sprintf(`
	WITH date_helpers AS (
		SELECT CURRENT_DATE - i AS date
		FROM generate_series(0, 13) AS i
	)
	Select DATE(d.date) AS date, COUNT(CASE WHEN s.category = 'meat' THEN 1 END) AS meat_portions, COUNT(CASE WHEN s.category = 'vegetarian' THEN 1 END) AS vegetarian_portions, COUNT(CASE WHEN s.category = 'alcohol' THEN 1 END) AS alcohol_portions, COUNT(CASE WHEN s.category = 'candy' THEN 1 END) AS candy_portions
	from date_helpers d
	Left join servings s
	on d.date = DATE(s.date) and s.user_id = '%s'
	Group by d.date
	Order by d.date desc;
	`, userId)

	log.Debug("Daily Overview Query: ", queryStr)

	query := m.db.Raw(queryStr).Scan(&dailyOverviews)

	if query.Error != nil {
		log.Error("Error retrieving daily overview: ", query.Error)
		return nil, query.Error
	}

	log.Tracef("Daily overview for user %s  : %v ", userId, dailyOverviews)
	return dailyOverviews, nil

}

func (m ServingRepositoryImpl) DeleteServing(servingID string) error {
	log.Debug(fmt.Sprintf("Deleting Meat Portion by ID: %v", servingID))

	result := m.db.Delete(&dao.Serving{}, "id = ?", servingID)
	if result.Error != nil {
		return result.Error
	}

	log.Info("Meat Portion deleted: ", servingID)
	return nil
}

func (m ServingRepositoryImpl) GetServings(userID string, page int, limit int, cutOffDay *time.Time) ([]dao.Serving, error) {

	log.Debug(fmt.Sprintf("Getting Meat Portion by user ID: %v for page %d", userID, page))

	var servings []dao.Serving

	query := m.db.Model(&dao.Serving{}).Where("user_id = ?", userID).Order("date desc")

	if page != 0 {
		query = query.Offset((page - 1) * limit)
	}

	if limit != 0 {
		query = query.Limit(limit)
	}

	if cutOffDay != nil {
		query = query.Where("date >= ?", cutOffDay)
	}

	result := query.Find(&servings)
	if result.Error != nil {
		fmt.Println("Error: ", result.Error)
		return []dao.Serving{}, result.Error
	}

	log.Tracef("Meat Portion found: %v", servings)
	return servings, nil
}

func (m ServingRepositoryImpl) GetServingsAverages(userID string, timeframe dto.Timeframe) (dto.AverageServings, error) {

	var averageServings dto.AverageServings

	queryStr, err := repository_queries.GenerateAverageServingsQuery(timeframe, userID)

	log.Debug("Average Servings query: ", queryStr)

	if err != nil {
		log.Error("Error creating query: ", err)
		return dto.AverageServings{}, err
	}

	query := m.db.Raw(queryStr).Scan(&averageServings)

	if query.Error != nil {
		log.Error("Error retrieving aggregated meat portions: ", query.Error)
		return dto.AverageServings{}, query.Error
	}

	log.Tracef("Aggregated Meat Portions found: %v", averageServings)
	return averageServings, nil

}

func (m ServingRepositoryImpl) GetAggregatedServingsByTimeframe(userID string, timeframe dto.Timeframe) ([]dto.AggregatedServings, error) {
	log.Debug(fmt.Sprintf("Getting Aggregated Meat Portion by user ID: %v, timeframe: %v", userID, timeframe))

	var aggregatedServings []dto.AggregatedServings
	queryStr, err := repository_queries.GenerateAggregatedServingsQuery(timeframe, userID)
	if err != nil {
		log.Error("Error creating query: ", err)
		return nil, err
	}

	log.Debug("Portion Chart Query: ", queryStr)

	query := m.db.Raw(queryStr).Scan(&aggregatedServings)

	if query.Error != nil {
		log.Error("Error retrieving aggregated meat portions: ", query.Error)
		return nil, query.Error
	}

	log.Tracef("Aggregated Meat Portions found: %v", aggregatedServings)
	return aggregatedServings, nil
}

func (m ServingRepositoryImpl) GetServingStreaks(userId string) ([]dto.ServingStreaks, error) {
	log.Debugf("Get Serving Streaks for user with ID: %v", userId)

	var servingStreaks []dto.ServingStreaks

	queryString := fmt.Sprintf(`
	Select s.category, Min(EXTRACT(DAY FROM CURRENT_DATE - s.date)::INT) + 1 as streak
	From servings s
	where s.user_id = '%s'
	Group by s.category;`,
		userId)

	log.Debug("Serving Streaks query : ", queryString)

	res := m.db.Raw(queryString).Scan(&servingStreaks)

	if res.Error != nil {
		log.Error("Error retrieving serving streaks: ", res.Error)
		return nil, res.Error
	}

	log.Debug("Serving Streaks found: ", servingStreaks)
	return servingStreaks, nil

}

func NewServingRepository(db *gorm.DB) ServingRepository {
	db.AutoMigrate(&dao.Serving{})
	SetExistingPortionsToMeat(db)

	return &ServingRepositoryImpl{
		db: db,
	}
}
