package service

import (
	"github.com/andifg/artemis_backend/app/domain/dao"
	"github.com/andifg/artemis_backend/app/repository"
	"github.com/gin-gonic/gin"
)

type UserService interface {
	CreateUser(*gin.Context)
	GetAllUsers(*gin.Context)
}

type UserServiceImpl struct {
	userRepository repository.UserRepository
}

func (u UserServiceImpl) CreateUser(c *gin.Context) {
	var user dao.User
	c.BindJSON(&user)
	u.userRepository.CreateUser(user)
	c.JSON(200, gin.H{
		"message": "User Created",
	})
}


func (u UserServiceImpl) GetAllUsers(c *gin.Context) {
	users := u.userRepository.GetAllUsers()
	c.JSON(200, gin.H{
		"message": "All Users",
		"data":    users,
	})
}

func UserServiceInit(userRepository repository.UserRepository) UserService {
	return &UserServiceImpl{
		userRepository: userRepository,
	}
}