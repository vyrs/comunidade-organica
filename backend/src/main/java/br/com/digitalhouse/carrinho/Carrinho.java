package br.com.digitalhouse.carrinho;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.hash.HashCode;

import br.com.digitalhouse.model.Produto;
import lombok.Data;

@Data
@Component
public class Carrinho {

//	private List<CarrinhoProdutoDTO> produtos = new ArrayList<>();
//	private LinkedHashSet<Produto> produtos = new LinkedHashSet<>();
	private LinkedHashSet<CarrinhoProdutoDTO> produtos = new LinkedHashSet<>();
	
	public void adiciona(Produto produto) {
		produtos.add(new CarrinhoProdutoDTO(produto));
	}
	
	public void excluirProduto(Produto produto) {		
		produtos.remove(new CarrinhoProdutoDTO(produto));
	}
	
	
	public static Carrinho cria(Optional<String> jsonCarrinho) {
		
		return jsonCarrinho.map(json -> {
			try {
				return new ObjectMapper().readValue(json, Carrinho.class);
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
		}).orElse(new Carrinho());
	}
}
