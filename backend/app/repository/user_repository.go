package repository

import (
	"errors"
	"fmt"
	"github.com/andifg/artemis_backend/app/domain/dao"
	"github.com/andifg/artemis_backend/app/pkg/customerrors"
	"gorm.io/gorm"
)

type UserRepository interface {
	CreateUser(user dao.User) (dao.User, error)
	GetAllUsers() ([]dao.User, error)
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

func UserRepositoryInit(db *gorm.DB) UserRepository {
	db.Exec("CREATE TYPE meat_portion_size as ENUM ('small', 'medium', 'large')")
	db.AutoMigrate(&dao.User{}, &dao.MeatPortion{})
	return &UserRepositoryImpl{
		db: db,
	}
}
