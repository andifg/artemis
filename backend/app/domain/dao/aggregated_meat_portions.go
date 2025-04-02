package dao

import (
	"time"
)

type Timeframe = string

const (
	Week    Timeframe = "week"
	Month   Timeframe = "month"
	Quarter Timeframe = "quarter"
)

type AggregatedMeatPortions struct {
	Timeframe      Timeframe `json:"timeframe"`
	TimeframeStart time.Time `json:"timeframe_start"`
	Total          int64     `json:"total"`
	MeatTarget     int64     `json:"meat_target"`
}
