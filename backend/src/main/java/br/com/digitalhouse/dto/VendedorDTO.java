package br.com.digitalhouse.dto;

import java.time.LocalDate;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import br.com.digitalhouse.model.Endereco;
import br.com.digitalhouse.model.Telefone;
import lombok.Data;

@Data
public class VendedorDTO {

	private Long id;
	private String nome;	
	private String sobrenome;		
//	private List<Telefone> telefone;
//	private LocalDate dataNasc;			
//	private String cpf;		
//	private String rg;	
	private String email;
	private Endereco endereco;
//	private String senha;
}
