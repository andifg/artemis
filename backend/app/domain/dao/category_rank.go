package dao

import (
	"github.com/google/uuid"
)

type CategoryRank struct {
	BaseModel
	UserID   uuid.UUID       `gorm:"column:user_id;type:uuid;not null;index:idx_user_category,unique" json:"user_id" binding:"required"`
	Category ServingCategory `gorm:"column:category;type:serving_category;not null;index:idx_user_category,unique" json:"category" binding:"required"`
	Rank     int             `gorm:"column:rank;not null" json:"rank" binding:"required"`
	Active   bool            `gorm:"column:active;not null;"  json:"active"`
}
