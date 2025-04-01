package controller

import (
	"github.com/andifg/artemis_backend/app/constant"
	"github.com/andifg/artemis_backend/app/domain/dto"
	"github.com/andifg/artemis_backend/app/pkg"
	"github.com/andifg/artemis_backend/app/pkg/contextutils"
	"github.com/andifg/artemis_backend/app/pkg/customerrors"
	"github.com/andifg/artemis_backend/app/service"
	"github.com/gin-gonic/gin"
)

type UserController interface {
	CreateUser(c *gin.Context)
	PatchUser(c *gin.Context)
	GetAllUsers(c *gin.Context)
	GetUser(c *gin.Context)
}

type UserControllerImpl struct {
	userService service.UserService
}

func (controller UserControllerImpl) CreateUser(c *gin.Context) {
	controller.userService.CreateUser(c)
}

func (controller UserControllerImpl) GetAllUsers(c *gin.Context) {
	controller.userService.GetAllUsers(c)
}

func (controller UserControllerImpl) GetUser(c *gin.Context) {
	defer pkg.PanicHandler(c)
	user_id := contextutils.GetUserID(c)

	user, err := controller.userService.GetUser(user_id)

	if err != nil {
		contextutils.HandleError(err, c)
		return
	}

	c.JSON(200, pkg.BuildResponse(constant.Success, user))
}

func (controller UserControllerImpl) PatchUser(c *gin.Context) {
	defer pkg.PanicHandler(c)
	user_id := contextutils.GetUserID(c)

	var updateUser dto.UpdateUser
	if err := c.BindJSON(&updateUser); err != nil {
		contextutils.HandleError(customerrors.NewBadRequestError("Invalid Request Body"), c)
		return
	}

	user, err := controller.userService.PatchUser(user_id, updateUser)

	if err != nil {
		contextutils.HandleError(err, c)
		return
	}

	c.JSON(200, pkg.BuildResponse(constant.Success, user))

}

func UserControllerInit(service service.UserService) UserController {
	return &UserControllerImpl{
		userService: service,
	}
}
