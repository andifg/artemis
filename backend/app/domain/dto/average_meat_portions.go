package dto

type Timeframe = string

const (
	Week     Timeframe = "week"
	Month    Timeframe = "month"
	SixMonth Timeframe = "6month"
)

type AverageMeatPortions struct {
	Timeframe  Timeframe
	Value      int64
	ChangeRate int64
}
