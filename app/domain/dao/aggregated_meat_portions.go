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
	Timeframe      Timeframe
	TimeframeStart time.Time
	Total          int64
}
