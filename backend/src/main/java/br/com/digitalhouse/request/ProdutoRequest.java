package br.com.digitalhouse.request;

import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotNull;

import br.com.digitalhouse.model.Cliente;


import lombok.Data;

@Data
public class ProdutoRequest {

	
	private Long id;
	private String nome;
	private String tipo;
	private Date dataColheita;
	@NotNull
	private Float preco;	
	private Long quantidade;
	
	private Cliente cliente;
	
}
