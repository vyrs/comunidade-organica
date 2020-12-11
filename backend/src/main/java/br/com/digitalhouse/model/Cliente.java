package br.com.digitalhouse.model;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
@Entity
@Table(name="cliente")
public class Cliente {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;	
	
	@Column
	private String nome;
	
	@Column
	private String sobrenome;
	
	@Column
	private String senha;	

	@OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL)
	private List<Telefone> telefone;
	 
	
//	@DateTimeFormat(pattern="dd/mm/yyyy")
//	@Column(name="data_nasc")
//	private LocalDate dataNasc;		
		
//	@Column
//	private String cpf;		
	
	@Column
	private String email;
	
	@Embedded
	private Endereco endereco;
	
	@ManyToMany
	@JoinTable(name = "comprar_produto", joinColumns = @JoinColumn(name = "produto_id"),
			inverseJoinColumns = @JoinColumn(name = "cliente_id"))
	private List<Cliente> clientes;
	
}
