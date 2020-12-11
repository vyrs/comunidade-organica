package br.com.digitalhouse.controller.openapi;

import java.util.List;

import javax.validation.Valid;

import br.com.digitalhouse.model.Cidade;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(tags = "Controller de Cidade")
public interface CidadeControllerOpenApi {


	@ApiOperation("Cadastrar uma cidade")
	@ApiResponses({ @ApiResponse(code = 201, message = "Cidade cadastrado", response = Cidade.class) })
	void salvar(
			@ApiParam(name = "corpo", value = "Representação de um nova cidade", required = true) 
			@Valid Cidade cidade);
	
	@ApiOperation(value = "Buscar todas os Cidades", httpMethod = "GET")
	@ApiResponses({ @ApiResponse(code = 201, message = "Buscar todos os Cidades", response = Cidade.class) })
	List<Cidade> listar();
	
//	@PostMapping
//	public void salvar(@RequestBody Cidade cidade) {
//		repository.save(cidade);
//	}
}
