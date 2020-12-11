package br.com.digitalhouse.carrinho;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class Cookies {
	
	public void writeAsJson(String key, Carrinho carrinho, HttpServletResponse response) {
		try {
			Cookie cookie = new Cookie(key, new ObjectMapper().writeValueAsString(carrinho));
			cookie.setHttpOnly(true);
			response.addCookie(cookie);
		} catch (JsonProcessingException e) {
			throw new RuntimeException(); 
		}
	}

}
