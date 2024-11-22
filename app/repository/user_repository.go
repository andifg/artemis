package repository

import (
	"fmt"
	"github.com/andifg/artemis_backend/app/domain/dao"
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
	fmt.Println("Inside CreateUser")
	result := u.db.Create(&user)
	if result.Error != nil {
		fmt.Println("Error: ", result.Error)
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
	db.AutoMigrate(&dao.User{})
	return &UserRepositoryImpl{
		db: db,
	}
}
