package service

import (
	"github.com/andifg/artemis_backend/app/constant"
	"github.com/andifg/artemis_backend/app/domain/dao"
	"github.com/andifg/artemis_backend/app/pkg"
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
	defer pkg.PanicHandler(c)
	var user dao.User

	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	usr, err := u.userRepository.CreateUser(user)

	if err != nil {
		pkg.PanicException(constant.InvalidRequest)
		return
	}

	c.JSON(http.StatusOK, pkg.BuildResponse(constant.Success, usr))
}

func (u UserServiceImpl) GetAllUsers(c *gin.Context) {
	defer pkg.PanicHandler(c)
	res, err := u.userRepository.GetAllUsers()

	if err != nil {
		pkg.PanicException(constant.DataNotFound)
		return
	}

	c.JSON(http.StatusOK, pkg.BuildResponse(constant.Success, res))
}

func UserServiceInit(userRepository repository.UserRepository) UserService {
	return &UserServiceImpl{
		userRepository: userRepository,
	}
}
