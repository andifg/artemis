package dto

import (
	"github.com/andifg/artemis_backend/app/domain/dao"
	"github.com/google/uuid"
)

type CreateMeatPortion struct {
	ID   uuid.UUID `json:"id" binding:"required"`
	Size dao.Size  `json:"size" binding:"required"`
}
