package br.com.digitalhouse.controller;

import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.digitalhouse.controller.openapi.DadosVendaControllerOpenApi;
import br.com.digitalhouse.dto.DadosVendaDTO;
import br.com.digitalhouse.mapper.DadosVendaMapper;
import br.com.digitalhouse.model.DadosVenda;
import br.com.digitalhouse.service.DadosVendaService;
import freemarker.core.ReturnInstruction.Return;

@CrossOrigin
@RestController
@RequestMapping("/vendas")
public class DadosVendaController implements DadosVendaControllerOpenApi  {
	
	@Autowired
	private DadosVendaService dadosVendaService;
	
	@Autowired
	private DadosVendaMapper dadosVendaMapper;
	
	
	@GetMapping("/dashboard/{id}")
	public List<DadosVendaDTO> somaMes(@PathVariable Long id) {
		
		return dadosVendaService.dadosVendaMes(id);
	}
	
	@GetMapping("/teste/{id}/{mes}")
	public List<DadosVendaDTO> somaMes(@PathVariable Long id, @PathVariable String mes) {
		
		return dadosVendaService.buscar(mes, id);
	}

}
