package br.com.digitalhouse.dto;

import lombok.Data;

@Data
public class DadosVendaDTO {

	private Long id;
	private int ano;
	private int mes;
	private Float preco;
	private String nomeMes;
	
	private ProdutoDTO produto;
	private CompradorDTO cliente;
	private VendedorDTO vendedor;
	
	
	
}
