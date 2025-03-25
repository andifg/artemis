package dto

import (
	"github.com/andifg/artemis_backend/app/domain/dao"
	"time"
)

type UpdateMeatPortion struct {
	Size dao.Size  `json:"size"`
	Date time.Time `gorm:"column:date; not null" json:"date"`
	Note string    `gorm:"column:note" json:"note"`
}
