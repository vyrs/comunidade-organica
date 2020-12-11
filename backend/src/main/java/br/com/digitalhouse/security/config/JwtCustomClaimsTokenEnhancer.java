package br.com.digitalhouse.security.config;

import java.util.HashMap;

import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;

public class JwtCustomClaimsTokenEnhancer implements TokenEnhancer {

	@Override
	public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
		if (authentication.getPrincipal() instanceof AuthUser) {
			/*var*/AuthUser  authUser = (AuthUser) authentication.getPrincipal();
			// var usado no java 11
			/*var*/HashMap<String, Object>  info = new HashMap<String, Object>();
			info.put("nome_completo", authUser.getNomeCompleto());
			info.put("usuario_id", authUser.getUserId());
			info.put("id_cliente", authUser.getCliente());
			info.put("clienteEmail", authUser.getClienteEmail());
			// var usado no java 11
			/*var*/DefaultOAuth2AccessToken oAuth2AccessToken = (DefaultOAuth2AccessToken) accessToken;
			oAuth2AccessToken.setAdditionalInformation(info);
		}
		
		return accessToken;
	}

}
