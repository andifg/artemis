package dao

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type BaseModel struct {
	CreatedAd time.Time      `gorm:"->:false;column:created_at" json:"-"`
	UpdatedAt time.Time      `gorm:"->:false;column:updated_at" json:"-"`
	DeletedAt gorm.DeletedAt `gorm:"->:false;column:deleted_at" json:"-"`
}

type User struct {
	BaseModel
	ID       uuid.UUID `gorm:"column:id; type:uuid; primary_key; not null" json:"id"`
	Username string    `gorm:"column:username; not null" json:"username"`
}
