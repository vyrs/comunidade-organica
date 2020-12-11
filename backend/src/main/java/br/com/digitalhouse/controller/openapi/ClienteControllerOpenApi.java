package br.com.digitalhouse.controller.openapi;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;

import br.com.digitalhouse.dto.ClienteDTO;
import br.com.digitalhouse.request.ClienteRequest;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(tags = "Controller de Cliente")
public interface ClienteControllerOpenApi {


	@ApiOperation("Cadastrar um cliente")
	@ApiResponses({ @ApiResponse(code = 201, message = "Cliente cadastrado", response = ClienteDTO.class) })
	ResponseEntity<?> salvar(
			@ApiParam(name = "corpo", value = "Representação de um novo cliente", required = true)
			@Valid ClienteRequest clienteRequest);
}
