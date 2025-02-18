package config

import (
	nested "github.com/antonfisher/nested-logrus-formatter"
	log "github.com/sirupsen/logrus"
)

func InitLog() {

	defaultLogLevel := "DEBUG"

	log.SetLevel(getLoggerLevel(defaultLogLevel))
	log.SetReportCaller(false)
	log.SetFormatter(&nested.Formatter{
		HideKeys:        true,
		FieldsOrder:     []string{"component", "category"},
		TimestampFormat: "2006-01-02 15:04:05",
		ShowFullLevel:   true,
		CallerFirst:     true,
	})

}

func getLoggerLevel(value string) log.Level {
	switch value {
	case "DEBUG":
		return log.DebugLevel
	case "TRACE":
		return log.TraceLevel
	default:
		return log.InfoLevel
	}
}
