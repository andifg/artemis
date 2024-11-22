package dao

import (
	"github.com/google/uuid"
	"time"
)

type BaseModel struct {
	CreatedAd time.Time `gorm:"->:false;column:created_at" json:"-"`
	UpdatedAt time.Time `gorm:"->:false;column:updated_at" json:"-"`
}

type User struct {
	BaseModel
	ID       uuid.UUID `gorm:"column:id; type:uuid; primary_key; not null" json:"id" binding:"required"`
	Username string    `gorm:"column:username; not null" json:"username" binding:"required"`
}
