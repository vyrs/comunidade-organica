package br.com.digitalhouse.controller.openapi;

import java.util.List;




import org.springframework.web.bind.annotation.PathVariable;

import br.com.digitalhouse.dto.DadosVendaDTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(tags = "Controller do Dados da venda")
public interface DadosVendaControllerOpenApi {


	@ApiOperation(value = "Buscar todas as vendas", httpMethod = "GET")
	@ApiResponses({
		@ApiResponse(code = 200, message = "Buscar todas as vendas", response = DadosVendaDTO.class) })
	List<DadosVendaDTO> somaMes(@PathVariable Long id);
}
