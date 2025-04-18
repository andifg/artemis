package dto

import (
	"time"
)

type AggregatedServings struct {
	Timeframe          Timeframe `json:"timeframe"`
	TimeframeStart     time.Time `json:"timeframe_start"`
	MeatServings       float64   `json:"meat_servings"`
	VegetarianServings float64   `json:"vegetarian_servings"`
	AlcoholServings    float64   `json:"alcohol_servings"`
	CandyServings      float64   `json:"candy_servings"`
	MeatTarget         int64     `json:"meat_target"`
	VegetarianTarget   int64     `json:"vegetarian_target"`
	AlcoholTarget      int64     `json:"alcohol_target"`
	CandyTarget        int64     `json:"candy_target"`
}
