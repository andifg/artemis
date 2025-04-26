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
	ID                    uuid.UUID `gorm:"column:id; type:uuid; primary_key; not null" json:"id" binding:"required"`
	Username              string    `gorm:"column:username; not null" json:"username" binding:"required"`
	WeeklyMeatLimit       int64     `gorm:"column:meatlimit; default:5;" json:"weekly_meat_limit"`
	WeeklyVegetarianLimit int64     `gorm:"column:vegetarianlimit; default:5;" json:"weekly_vegetarian_limit"`
	WeeklyAlcoholLimit    int64     `gorm:"column:alcohollimit; default:5;" json:"weekly_alcohol_limit"`
	WeeklyCandyLimit      int64     `gorm:"column:candylimit; default:5;" json:"weekly_candy_limit"`
	Servings              []Serving `json:"meatPortions"`
}
