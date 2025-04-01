package dto

import (
	"github.com/google/uuid"
)

type UpdateUser struct {
	ID                      uuid.UUID `json:"id" binding:"required"`
	WeeklyMeatPortionTarget *int64    `json:"weeklyMeatPortionTarget"`
}
