package dto

import (
	"github.com/google/uuid"
)

type UpdateUser struct {
	ID                    uuid.UUID `json:"id" binding:"required"`
	WeeklyMeatLimit       *int64    `json:"weekly_meat_limit"`
	WeeklyVegetarianLimit *int64    `json:"weekly_vegetarian_limit"`
	WeeklyAlcoholLimit    *int64    `json:"weekly_alcohol_limit"`
	WeeklyCandyLimit      *int64    `json:"weekly_candy_limit"`
}
