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
	MeatLimit          float64   `json:"meat_limit"`
	VegetarianLimit    float64   `json:"vegetarian_limit"`
	AlcoholLimit       float64   `json:"alcohol_limit"`
	CandyLimit         float64   `json:"candy_limit"`
}
