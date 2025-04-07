package repository

import (
	"errors"
	"fmt"
	"github.com/andifg/artemis_backend/app/domain/dao"
	"github.com/andifg/artemis_backend/app/pkg/customerrors"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type UserRepository interface {
	CreateUser(user dao.User) (dao.User, error)
	GetAllUsers() ([]dao.User, error)
	UpdateUser(user dao.User) error
	GetUserByID(userID uuid.UUID) (dao.User, error)
}

type UserRepositoryImpl struct {
	db *gorm.DB
}

func (u UserRepositoryImpl) CreateUser(user dao.User) (dao.User, error) {
	result := u.db.Create(&user)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrDuplicatedKey) {
			return dao.User{}, customerrors.NewDuplicateKeyError(fmt.Sprintf("User %s with ID %s already exists", user.Username, user.ID))
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
	result := u.db.Save(&user)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (u UserRepositoryImpl) GetUserByID(userID uuid.UUID) (dao.User, error) {
	var user dao.User
	result := u.db.First(&user, "id = ?", userID)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return dao.User{}, customerrors.NewNotFoundError(fmt.Sprintf("User with ID %s not found", userID))
		}
		return dao.User{}, result.Error
	}
	return user, nil
}

func UserRepositoryInit(db *gorm.DB) UserRepository {
	db.AutoMigrate(&dao.User{})
	return &UserRepositoryImpl{
		db: db,
	}
}
