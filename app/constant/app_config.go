package constant

import (
	"os"
)

type AppConfig struct {
	DatabaseHost             string
	DatabaseUser             string
	DatabasePassword         string
	DatabaseName             string
	DatabasePort             string
	KeycloakClientID         string
	KeycloakSecret           string
	KeycloakRealm            string
	KeycloakRealmRedirectURI string
	KeycloakURL              string
	KeycloakCertPath         string
	FrontendOrigin           string
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
		DatabaseHost:             lookupEnv("DATABASE_HOST", "localhost"),
		DatabaseUser:             lookupEnv("DATABASE_USER", "postgres"),
		DatabasePassword:         lookupEnv("DATABASE_PASSWORD", "example"),
		DatabaseName:             lookupEnv("DATABASE_NAME", "artemis"),
		DatabasePort:             lookupEnv("DATABASE_PORT", "5432"),
		KeycloakClientID:         lookupEnv("KEYCLOAK_CLIENT_ID", "artemis"),
		KeycloakSecret:           lookupEnv("KEYCLOAK_CLIENT_SECRET", "3bKwPwaQpSVhhZzdlUFWgajnlllWgVsi"),
		KeycloakRealm:            lookupEnv("KEYCLOAK_REALM", "artemis"),
		KeycloakRealmRedirectURI: lookupEnv("KEYCLOAK_REALM_REDIRECT_URI", "http://localhost:8000/api/v1/login"),
		KeycloakURL:              lookupEnv("KEYCLOAK_URL", "http://localhost:8080"),
		KeycloakCertPath:         lookupEnv("KEYCLOAK_CERT_PATH", "/protocol/openid-connect/certs"),
		FrontendOrigin:           lookupEnv("FRONTEND_ORIGIN", "http://localhost:5173"),
	}
}
