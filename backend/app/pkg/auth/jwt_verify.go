package auth

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/hashicorp/cap/jwt"
	log "github.com/sirupsen/logrus"
	"io"
	"net/http"
	"net/url"
	"strings"
	"time"
)

type OidcTokens struct {
	AccessToken  string
	RefreshToken string
	IdToken      string
}

type OidcManager interface {
	VerifyToken(string) (JWT, error)
	FetchAuthToken(string) (OidcTokens, error)
	RefreshToken(string) (OidcTokens, error)
	VerifyClaims(*JWT) bool
}

type OidcManagerImpl struct {
	clientID            string
	clientSecret        string
	realmName           string
	issuerUrl           string
	redirectUri         string
	authProviderUrl     string
	authProviderCertUrl string
	jwtKeySet           jwt.KeySet
	context             context.Context
}

type JWT struct {
	Issuer           string `json:"iss"` // Issuer of the token
	Subject          string `json:"sub"` // Subject of the token
	Audience         string `json:"aud"` // Audience of the token
	ExpiresAt        int64  `json:"exp"` // Expiration time (Unix timestamp)
	IssuedAt         int64  `json:"iat"` // Issued at (Unix timestamp)
	ID               string `json:"jti"` // JWT ID (unique identifier)
	PreferedUsername string `json:"preferred_username"`
}

func (o *OidcManagerImpl) VerifyClaims(jwt *JWT) bool {
	var valid bool

	valid = jwt.verifyExpirationClaim()
	if !valid {
		log.Info("Token expired")
		return false
	}
	valid = jwt.verifyIssuerClaim(o.issuerUrl)
	if !valid {
		log.Info("Invalid issuer")
		return false
	}

	// valid = jwt.verifyAudienceClaim(o.issuerUrl)
	// if !valid {
	// 	log.Info("Invalid audience")
	// 	return false
	// }

	return true

}

func (jwt *JWT) verifyExpirationClaim() bool {

	now := time.Now().Unix()

	log.Debug("Verifying expiration claim with values: ", jwt.ExpiresAt, now)

	return jwt.ExpiresAt > now
}

func (jwt *JWT) verifyIssuerClaim(issuer string) bool {
	log.Debug(fmt.Sprintf("Verifying issuer claim with values: %s, %s", jwt.Issuer, issuer))
	return jwt.Issuer == issuer
}

// func (jwt *JWT) verifyAudienceClaim(audience string) bool {
// 	log.Debug(fmt.Sprintf("Verifying audience claim with values: %s, %s", jwt.Audience, audience))
// 	return jwt.Audience == audience
// }

func (o *OidcManagerImpl) createKeySet() error {

	keySet, err := jwt.NewJSONWebKeySet(o.context, fmt.Sprintf("%s/realms/%s/%s", o.authProviderUrl, o.realmName, o.authProviderCertUrl), "")
	if err != nil {
		fmt.Printf("Error: %s", err)
		return err
	}

	o.jwtKeySet = keySet
	return nil

}

func (o *OidcManagerImpl) FetchAuthToken(code string) (OidcTokens, error) {

	request := fmt.Sprintf("%s/realms/%s/protocol/openid-connect/token", o.authProviderUrl, o.realmName)

	requestBody := url.Values{}
	requestBody.Set("client_id", o.clientID)
	requestBody.Set("client_secret", o.clientSecret)
	requestBody.Set("code", code)
	requestBody.Set("grant_type", "authorization_code")
	requestBody.Set("redirect_uri", o.redirectUri)

	resp, err := http.Post(request, "application/x-www-form-urlencoded", strings.NewReader(requestBody.Encode()))

	log.Info("Request body: ", requestBody.Encode())

	if err != nil {
		log.Info("Error during POST request: ", err)
		return OidcTokens{}, err
	}

	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Info("Error reading response body: ", err)
		return OidcTokens{}, err
	}

	log.Info("Response body create token: ", string(body))

	var data map[string]interface{}
	err = json.Unmarshal(body, &data)
	if err != nil {
		log.Info("Error unmarshalling response body: ", err)
		return OidcTokens{}, err
	}

	AccessToken := data["access_token"]
	RefreshToken := data["refresh_token"]
	IdToken := data["id_token"]

	return OidcTokens{
		AccessToken:  AccessToken.(string),
		RefreshToken: RefreshToken.(string),
		IdToken:      IdToken.(string),
	}, nil

}

func (o *OidcManagerImpl) RefreshToken(refreshToken string) (OidcTokens, error) {

	request := fmt.Sprintf("%s/realms/%s/protocol/openid-connect/token", o.authProviderUrl, o.realmName)

	requestBody := url.Values{}
	requestBody.Set("client_id", o.clientID)
	requestBody.Set("client_secret", o.clientSecret)
	requestBody.Set("refresh_token", refreshToken)
	requestBody.Set("grant_type", "refresh_token")

	resp, err := http.Post(request, "application/x-www-form-urlencoded", strings.NewReader(requestBody.Encode()))

	if err != nil {
		log.Info("Error during POST request: ", err)
		return OidcTokens{}, err
	}

	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Info("Error reading response body: ", err)
		return OidcTokens{}, err
	}

	var data map[string]interface{}
	err = json.Unmarshal(body, &data)
	if err != nil {
		log.Info("Error unmarshalling response body: ", err)
		return OidcTokens{}, err
	}

	AccessToken := data["access_token"]
	RefreshToken := data["refresh_token"]
	IdToken := data["id_token"]

	log.Info("Successfully refreshed token")

	return OidcTokens{
		AccessToken:  AccessToken.(string),
		RefreshToken: RefreshToken.(string),
		IdToken:      IdToken.(string),
	}, nil

}

func (o *OidcManagerImpl) VerifyToken(token string) (JWT, error) {

	log.Debug("Verifying token: ", token)

	claims, err := o.jwtKeySet.VerifySignature(o.context, token)
	if err != nil {
		log.Info("Error verifying token: ", err)
		return JWT{}, err
	}

	log.Debug("Token verified: ", claims)

	jwt := JWT{}

	if iss, ok := claims["iss"].(string); ok {
		jwt.Issuer = iss
	} else {
		return JWT{}, fmt.Errorf("missing or invalid 'iss' claim")
	}

	if sub, ok := claims["sub"].(string); ok {
		jwt.Subject = sub
	} else {
		return JWT{}, fmt.Errorf("missing or invalid 'sub' claim")
	}

	if aud, ok := claims["aud"].(string); ok {
		jwt.Audience = aud
	} else {
		return JWT{}, fmt.Errorf("missing or invalid 'aud' claim")
	}

	if exp, ok := claims["exp"].(float64); ok {
		jwt.ExpiresAt = int64(exp)
	} else {
		return JWT{}, fmt.Errorf("missing or invalid 'exp' claim")
	}

	if iat, ok := claims["iat"].(float64); ok {
		jwt.IssuedAt = int64(iat)
	} else {
		return JWT{}, fmt.Errorf("missing or invalid 'iat' claim")
	}

	if jti, ok := claims["jti"].(string); ok {
		jwt.ID = jti
	} else {
		return JWT{}, fmt.Errorf("missing or invalid 'jti' claim")
	}

	if preferredUsername, ok := claims["preferred_username"].(string); ok {
		jwt.PreferedUsername = preferredUsername
	} else {
		return JWT{}, fmt.Errorf("missing or invalid 'preferred_username' claim")
	}

	jsonData, err := json.Marshal(jwt)
	if err != nil {
		return JWT{}, err
	}

	log.Trace("JWT: ", string(jsonData))

	return jwt, nil

}

func OidcManagerInit(clientID string, clientSecret string, realmName string, issuerUrl string, redirectUri string, authProviderUrl string, authProviderCertUrl string) OidcManager {
	oidcm := &OidcManagerImpl{
		clientID:            clientID,
		clientSecret:        clientSecret,
		realmName:           realmName,
		issuerUrl:           issuerUrl,
		redirectUri:         redirectUri,
		authProviderUrl:     authProviderUrl,
		authProviderCertUrl: authProviderCertUrl,
		context:             context.Background(),
	}

	oidcm.createKeySet()

	return oidcm

}
