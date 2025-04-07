package dto

import (
	"time"
)

type AggregatedServings struct {
	Timeframe      Timeframe `json:"timeframe"`
	TimeframeStart time.Time `json:"timeframe_start"`
	Total          int64     `json:"total"`
	MeatTarget     int64     `json:"meat_target"`
}
