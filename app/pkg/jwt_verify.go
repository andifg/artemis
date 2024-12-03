package pkg

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"

	"github.com/hashicorp/cap/jwt"
	log "github.com/sirupsen/logrus"
)

type OidcTokens struct {
	AccessToken  string
	RefreshToken string
	IdToken      string
}

type OidcManager interface {
	VerifyToken(string) (bool, error)
	FetchAuthToken(string) (OidcTokens, error)
}

type OidcManagerImpl struct {
	clientID            string
	clientSecret        string
	realmName           string
	redirectUri         string
	authProviderUrl     string
	authProviderCertUrl string
	jwtKeySet           jwt.KeySet
	context             context.Context
}

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

	return OidcTokens{
		AccessToken:  AccessToken.(string),
		RefreshToken: RefreshToken.(string),
		IdToken:      IdToken.(string),
	}, nil

}

func (o *OidcManagerImpl) VerifyToken(token string) (bool, error) {

	log.Debug("Verifying token: ", token)

	claims, err := o.jwtKeySet.VerifySignature(o.context, token)
	if err != nil {
		log.Info("Error verifying token: ", err)
		return false, err
	}

	log.Info("Token verified: ", claims)

	return true, nil

}

func OidcManagerInit(clientID string, clientSecret string, realmName string, redirectUri string, authProviderUrl string, authProviderCertUrl string) OidcManager {
	oidcm := &OidcManagerImpl{
		clientID:            clientID,
		clientSecret:        clientSecret,
		realmName:           realmName,
		redirectUri:         redirectUri,
		authProviderUrl:     authProviderUrl,
		authProviderCertUrl: authProviderCertUrl,
		context:             context.Background(),
	}

	oidcm.createKeySet()

	return oidcm

}
