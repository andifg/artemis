package service

import (
	"github.com/andifg/artemis_backend/app/domain/dao"
	"github.com/andifg/artemis_backend/app/repository"
	"github.com/gin-gonic/gin"
	"net/http"
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

	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	usr, err := u.userRepository.CreateUser(user)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{
		"message": "Created User ddde",
		"user":    usr,
	})
}

func (u UserServiceImpl) GetAllUsers(c *gin.Context) {
	res, err := u.userRepository.GetAllUsers()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{
		"message": "All Users",
		"data":    res,
	})
}

func UserServiceInit(userRepository repository.UserRepository) UserService {
	return &UserServiceImpl{
		userRepository: userRepository,
	}
}
