package contextutils

import (
	"github.com/andifg/artemis_backend/app/pkg/auth"
	"github.com/gin-gonic/gin"
)

func SetTokens(c *gin.Context, tokens auth.OidcTokens) {

	c.SetCookie("access_token", tokens.AccessToken, 3600, "/", "localhost", false, true)
	c.SetCookie("refresh_token", tokens.RefreshToken, 3600, "/", "localhost", false, true)
	c.SetCookie("id_token", tokens.IdToken, 3600, "/", "localhost", false, false)

}
