package br.com.digitalhouse.model;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;


import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
@Entity
@Table(name="produto")
public class Produto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column 
	private String nome;
	
	@Column
	private String tipo;
	
	@JsonFormat(pattern = "yyyy-MM-dd" )
	@DateTimeFormat(pattern="yyyy-mm-dd")
	@Column(name = "data_colheita")
	private Date dataColheita;
	
	@JsonFormat(pattern = "yyyy-MM-dd" )
	@DateTimeFormat(pattern="yyyy-mm-dd")
	@Column(name = "data_anuncio")
	private LocalDate dataAnuncio;
	
	@Column
	private Long quantidade;
		
	@Column
	private Float preco;	
	
	
	@ManyToOne
	@JoinColumn(name="cliente_id", nullable = false) 
	private Cliente cliente;
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "comprar_produto", joinColumns = @JoinColumn(name = "cliente_id"),
			inverseJoinColumns = @JoinColumn(name = "produto_id"))
	private List<Produto> produtos;
	
}
