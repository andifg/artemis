package dao

import (
	"github.com/google/uuid"
)

type Size = string

const (
	Small  Size = "small"
	Medium Size = "medium"
	Large  Size = "large"
)

type MeatPortion struct {
	BaseModel
	ID     uuid.UUID `gorm:"column:id; type:uuid; primary_key; not null" json:"id" binding:"required"`
	Size   Size      `gorm:"column:size; type:meat_portion_size; not null" json:"size" binding:"required"`
	UserID uuid.UUID `gorm:"column:user_id; type:uuid; not null" json:"user_id" binding:"required"`
}
