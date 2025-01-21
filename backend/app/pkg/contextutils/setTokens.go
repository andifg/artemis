package contextutils

import (
	"github.com/andifg/artemis_backend/app/pkg/auth"
	"github.com/gin-gonic/gin"
	"regexp"
)

func SetTokens(c *gin.Context, tokens auth.OidcTokens, domain string) {

	var secure bool = true

	if regexp.MustCompile(`(?i)\blocalhost\b`).MatchString(domain) {
		secure = false

	}

	c.SetCookie("access_token", tokens.AccessToken, 2592000, "/", domain, secure, true)
	c.SetCookie("refresh_token", tokens.RefreshToken, 2592000, "/", domain, secure, true)
	c.SetCookie("id_token", tokens.IdToken, 2592000, "/", domain, secure, false)

}
