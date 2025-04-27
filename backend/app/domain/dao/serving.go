package dao

import (
	"github.com/google/uuid"
	"time"
)

type Size = string

const (
	Small  Size = "small"
	Medium Size = "medium"
	Large  Size = "large"
)

type ServingCategory = string

const (
	Meat       ServingCategory = "meat"
	Vegetarian ServingCategory = "vegetarian"
	Alcohol    ServingCategory = "alcohol"
	Candy      ServingCategory = "candy"
)

type Serving struct {
	BaseModel
	ID       uuid.UUID       `gorm:"column:id; type:uuid; primary_key; not null" json:"id" binding:"required"`
	Category ServingCategory `gorm:"column:category; type:serving_category; not null default:'meat'" json:"category" binding:"required"`
	Date     time.Time       `gorm:"column:date; not null" json:"date" binding:"required"`
	Size     Size            `gorm:"column:size; type:meat_portion_size; not null" json:"size" binding:"required"`
	UserID   uuid.UUID       `gorm:"column:user_id; type:uuid; not null" json:"user_id" binding:"required"`
	User     User            `gorm:"foreignKey:UserID;references:ID;constraint:OnDelete:CASCADE;" json:"-"`
	Note     string          `gorm:"column:note" json:"note"`
}
