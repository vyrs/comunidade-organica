package br.com.digitalhouse.dto;

import java.net.URL;

import br.com.digitalhouse.model.Produto;
import lombok.Data;

@Data
public class ImagemDTO {

	private Long id;
	private String nomeArquivo;
	private String contenType;
	private Long tamanho;
	private URL url;
	
	private ProdutoDTO produto;
}
