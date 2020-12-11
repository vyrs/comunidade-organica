package br.com.digitalhouse.controller.openapi;

import java.util.List;

import br.com.digitalhouse.dto.ImagemDTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(tags = "Controller de Imagem")
public interface ImagemControllerOpenApi {

	@ApiOperation(value = "Buscar todas as Imagens", httpMethod = "GET")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Buscar todas as Imagens", response = ImagemDTO.class) })
	List<ImagemDTO> listar();
}
