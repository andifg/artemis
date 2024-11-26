package constant

import (
	"os"
)

type AppConfig struct {
	DatabaseHost     string
	DatabaseUser     string
	DatabasePassword string
	DatabaseName     string
	DatabasePort     string
}

func lookupEnv(key string, defaultValue string) string {
	val, valSet := os.LookupEnv(key)
	if !valSet {
		val = defaultValue
	}
	return val
}

func AppConfigInit() *AppConfig {

	return &AppConfig{
		DatabaseHost:     lookupEnv("DATABASE_HOST", "localhost"),
		DatabaseUser:     lookupEnv("DATABASE_USER", "postgres"),
		DatabasePassword: lookupEnv("DATABASE_PASSWORD", "example"),
		DatabaseName:     lookupEnv("DATABASE_NAME", "artemis"),
		DatabasePort:     lookupEnv("DATABASE_PORT", "5432"),
	}
}
