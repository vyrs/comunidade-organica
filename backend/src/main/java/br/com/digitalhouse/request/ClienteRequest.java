package br.com.digitalhouse.request;


import java.util.List;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import br.com.digitalhouse.model.Endereco;
import br.com.digitalhouse.model.Imagem;
import br.com.digitalhouse.model.Telefone;
import lombok.Data;


@Data
public class ClienteRequest {

	private Long id;
	@NotNull	
	private String nome;
	@NotNull	
	private String sobrenome;	
	private List<Telefone> telefone;
//	@NotNull
//	private String cpf;		
//	@NotBlank
//	private String rg;
	@NotBlank	
	@Email
	private String email;
	@NotNull	
	private Endereco endereco;
	@NotBlank
	private String senha;
}
