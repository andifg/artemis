package dto

import (
	"github.com/andifg/artemis_backend/app/domain/dao"
	"github.com/google/uuid"
	"time"
)

type CreateMeatPortion struct {
	ID   uuid.UUID `json:"id" binding:"required"`
	Size dao.Size  `json:"size" binding:"required"`
	Date 	   time.Time `gorm:"column:date; not null" json:"date" binding:"required"`
}
