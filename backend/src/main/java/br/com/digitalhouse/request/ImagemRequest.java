package br.com.digitalhouse.request;

import javax.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile;

import br.com.digitalhouse.model.Produto;
import lombok.Data;

@Data
public class ImagemRequest {

	@NotNull	
	private MultipartFile imagem;
	
	private Produto produto;
}
