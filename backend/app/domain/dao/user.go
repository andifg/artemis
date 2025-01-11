package dao

import (
	"github.com/google/uuid"
	"time"
)

type BaseModel struct {
	CreatedAt time.Time `gorm:"column:created_at" json:"-"`
	UpdatedAt time.Time `gorm:"autoUpdateTime:nano;column:updated_at" json:"-"`
}

type User struct {
	BaseModel
	ID           uuid.UUID `gorm:"column:id; type:uuid; primary_key; not null" json:"id" binding:"required"`
	Username     string    `gorm:"column:username; not null" json:"username" binding:"required"`
	MeatPortions []MeatPortion
}
