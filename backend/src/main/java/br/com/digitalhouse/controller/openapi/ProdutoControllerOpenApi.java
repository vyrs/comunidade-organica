package br.com.digitalhouse.controller.openapi;

import java.util.List;

import br.com.digitalhouse.dto.ProdutoDTO;
import br.com.digitalhouse.model.Estado;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(tags = "Controller de Produto")
public interface ProdutoControllerOpenApi {

	@ApiOperation(value = "Buscar todos os Produtos", httpMethod = "GET")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Buscar todos os Produtos", response = ProdutoDTO.class) })
	List<ProdutoDTO> listar();
}
