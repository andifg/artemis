package repository

import (
	"github.com/andifg/artemis_backend/app/domain/dao"
	"gorm.io/gorm"
)

type UserRepository interface {
	CreateUser(user dao.User) dao.User
	GetAllUsers() []dao.User
}

type UserRepositoryImpl struct {
	db *gorm.DB
}

func (u UserRepositoryImpl) CreateUser(user dao.User) dao.User {
	u.db.Create(&user)
	return user
}

func (u UserRepositoryImpl) GetAllUsers() []dao.User {
	var users []dao.User
	u.db.Find(&users)
	return users
}

func UserRepositoryInit(db *gorm.DB) UserRepository {
	db.AutoMigrate(&dao.User{})
	return &UserRepositoryImpl{
		db: db,
	}
}
