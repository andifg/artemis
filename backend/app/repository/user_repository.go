package repository

import (
	"errors"
	"fmt"
	"github.com/andifg/artemis_backend/app/domain/dao"
	"github.com/andifg/artemis_backend/app/pkg/customerrors"
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type UserRepository interface {
	CreateUser(user dao.User) (dao.User, error)
	GetAllUsers() ([]dao.User, error)
	UpdateUser(user dao.User) error
	GetUserByID(userID uuid.UUID) (dao.User, error)
	UpdateRankings(ranks []dao.CategoryRank) error
}

type UserRepositoryImpl struct {
	db *gorm.DB
}

func (u UserRepositoryImpl) CreateUser(user dao.User) (dao.User, error) {

	result := u.db.Omit("CategoryRanks").
		Create(&user)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrDuplicatedKey) {
			return dao.User{}, customerrors.NewDuplicateKeyError(fmt.Sprintf("User %s with ID %s already exists", user.Username, user.ID))
		}
		return dao.User{}, result.Error
	}

	categoryRanks := []dao.CategoryRank{
		{
			UserID:   user.ID,
			Category: dao.Meat,
			Rank:     1,
			Active:   true,
		},
		{
			UserID:   user.ID,
			Category: dao.Vegetarian,
			Rank:     2,
			Active:   true,
		},
		{
			UserID:   user.ID,
			Category: dao.Alcohol,
			Rank:     3,
			Active:   true,
		},
		{
			UserID:   user.ID,
			Category: dao.Candy,
			Rank:     4,
			Active:   true,
		},
	}

	result = u.db.Create(&categoryRanks)
	if result.Error != nil {
		return dao.User{}, result.Error
	}

	// Preload the CategoryRanks relationship
	result = u.db.Preload("CategoryRanks").First(&user, user.ID)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return dao.User{}, customerrors.NewBadRequestError(fmt.Sprintf("Not able to successfully create user %s with ID %s", user.Username, user.ID))
		}
		return dao.User{}, result.Error
	}

	return user, nil
}

func (u UserRepositoryImpl) GetAllUsers() ([]dao.User, error) {
	var users []dao.User
	res := u.db.Find(&users)

	if res.Error != nil {
		fmt.Println("Error: ", res.Error)
		return []dao.User{}, res.Error
	}

	return users, nil
}

func (u UserRepositoryImpl) UpdateUser(user dao.User) error {
	result := u.db.Omit("CategoryRanks").Save(&user)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (u UserRepositoryImpl) GetUserByID(userID uuid.UUID) (dao.User, error) {
	var user dao.User
	result := u.db.Preload("CategoryRanks").First(&user, "id = ?", userID)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return dao.User{}, customerrors.NewNotFoundError(fmt.Sprintf("User with ID %s not found", userID))
		}
		return dao.User{}, result.Error
	}
	return user, nil
}

func (u UserRepositoryImpl) UpdateRankings(ranks []dao.CategoryRank) error {

	log.Debugf("Updating rankings for user %s", ranks[0].UserID)
	log.Debugf("Rankings: %v", ranks)

	result := u.db.Clauses(clause.OnConflict{
		Columns:   []clause.Column{{Name: "user_id"}, {Name: "category"}},
		DoUpdates: clause.AssignmentColumns([]string{"rank", "active"}),
	}).Create(&ranks)

	if result.Error != nil {

		log.Error("EERRRRR")
		return result.Error
	}

	return nil

}

func UserRepositoryInit(db *gorm.DB) UserRepository {
	db.AutoMigrate(&dao.User{}, dao.CategoryRank{})
	DropOldForeignKeyConstraint(db)
	AddDefaultCategoryRanksOnce(db)
	return &UserRepositoryImpl{
		db: db,
	}
}
