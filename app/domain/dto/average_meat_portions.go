package dto

type Timeframe = string

const (
	Small  Timeframe = "week"
	Medium Timeframe = "month"
	Large  Timeframe = "6month"
)

type AverageMeatPortions struct {
	Timeframe  Timeframe
	Value      int64
	ChangeRate int64
}
