package service

import (
	"net/http"

	"github.com/andifg/artemis_backend/app/constant"
	"github.com/andifg/artemis_backend/app/domain/dao"
	"github.com/andifg/artemis_backend/app/domain/dto"
	"github.com/andifg/artemis_backend/app/pkg"
	"github.com/andifg/artemis_backend/app/pkg/contextutils"
	"github.com/andifg/artemis_backend/app/repository"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	log "github.com/sirupsen/logrus"
)

type UserService interface {
	CreateUser(*gin.Context)
	PatchUser(userID uuid.UUID, user dto.UpdateUser) (dao.User, error)
	GetAllUsers(*gin.Context)
	GetUser(userID uuid.UUID) (dao.User, error)
	GetUserByID(userID uuid.UUID) (dao.User, error)
}

type UserServiceImpl struct {
	userRepository repository.UserRepository
}

func (u UserServiceImpl) CreateUser(c *gin.Context) {
	defer pkg.PanicHandler(c)
	var user dao.User

	log.Info("Create User")

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

func (u UserServiceImpl) GetUser(userID uuid.UUID) (dao.User, error) {

	log.Info("Get User by ID: ", userID)

	res, err := u.userRepository.GetUserByID(userID)

	if err != nil {
		log.Error("Error getting user: ", err)
		return dao.User{}, err
	}

	return res, nil
}

func (u UserServiceImpl) PatchUser(userID uuid.UUID, updateUser dto.UpdateUser) (dao.User, error) {
	log.Info("Patch User")

	usr, err := u.userRepository.GetUserByID(userID)
	if err != nil {
		log.Error("Error getting user: ", err)
		return dao.User{}, err
	}

	if updateUser.WeeklyMeatLimit != nil {
		usr.WeeklyMeatLimit = *updateUser.WeeklyMeatLimit
	}

	if updateUser.WeeklyVegetarianLimit != nil {
		usr.WeeklyVegetarianLimit = *updateUser.WeeklyVegetarianLimit
	}
	if updateUser.WeeklyAlcoholLimit != nil {
		usr.WeeklyAlcoholLimit = *updateUser.WeeklyAlcoholLimit
	}
	if updateUser.WeeklyCandyLimit != nil {
		usr.WeeklyCandyLimit = *updateUser.WeeklyCandyLimit
	}

	err = u.userRepository.UpdateUser(usr)

	if err != nil {
		return dao.User{}, err
	}

	log.Info("User updated successfully: ", usr)

	return usr, nil

}

func (u UserServiceImpl) GetUserByID(userID uuid.UUID) (dao.User, error) {

	log.Info("Get User by ID: ", userID)

	res, err := u.userRepository.GetUserByID(userID)

	if err != nil {
		return dao.User{}, err
	}

	return res, nil
}

func (u UserServiceImpl) GetAllUsers(c *gin.Context) {
	defer pkg.PanicHandler(c)

	userID := contextutils.GetUserID(c)

	log.Info("Resolving Request from user with ID: ", userID)

	res, err := u.userRepository.GetAllUsers()

	log.Info("Get All Users")

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
