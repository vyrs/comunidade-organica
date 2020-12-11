package br.com.digitalhouse.dto;

import java.time.LocalDate;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;


@Data
public class ProdutoDTO {

	private Long id;	
	private String nome;	
	private String tipo;	
	private Date dataColheita;
	private LocalDate dataAnuncio;	
	private Float preco;
	private Long quantidade;
	
	@JsonIgnoreProperties("senha")
	private ClienteDTO cliente;

}
