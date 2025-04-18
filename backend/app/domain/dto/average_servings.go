package dto

import "time"

type AverageServings struct {
	Timeframe              Timeframe `json:"timeframe"`
	TimeframeStart         time.Time `json:"timeframe_start"`
	MeatPortions           float64   `json:"meat_portions"`
	VegetarianPortions     float64   `json:"vegetarian_portions"`
	AlcoholPortions        float64   `json:"alcohol_portions"`
	CandyPortions          float64   `json:"candy_portions"`
	PrevMeatPortions       float64   `json:"prev_meat_portions"`
	PrevVegetarianPortions float64   `json:"prev_vegetarian_portions"`
	PrevAlcoholPortions    float64   `json:"prev_alcohol_portions"`
	PrevCandyPortions      float64   `json:"prev_candy_portions"`
}
