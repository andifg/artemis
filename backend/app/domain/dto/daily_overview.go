package dto

import "time"

type DayOverview struct {
	Date               time.Time `json:"date"`
	MeatPortions       int64     `json:"meat_portions"`
	VegetarianPortions int64     `json:"vegetarian_portions"`
	AlcoholPortions    int64     `json:"alcohol_portions"`
	CandyPortions      int64     `json:"candy_portions"`
}
