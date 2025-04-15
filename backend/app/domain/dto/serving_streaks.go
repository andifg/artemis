package dto

import "github.com/andifg/artemis_backend/app/domain/dao"

type ServingStreaks struct {
	Category dao.ServingCategory `json:"serving_category"`
	Streak   int64               `json:"streak"`
}
