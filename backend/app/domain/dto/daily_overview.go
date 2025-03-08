package dto

import "time"

type DayOverview struct {
	Date         time.Time
	MeatPortions int64
}

type DailyOverviewMap map[string]DayOverview
