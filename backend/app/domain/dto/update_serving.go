package dto

import (
	"github.com/andifg/artemis_backend/app/domain/dao"
	"time"
)

type UpdateServing struct {
	Size     dao.Size            `json:"size"`
	Categroy dao.ServingCategory `json:"category"`
	Date     time.Time           `gorm:"column:date; not null" json:"date"`
	Note     string              `gorm:"column:note" json:"note"`
}
