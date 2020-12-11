package br.com.digitalhouse.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.digitalhouse.controller.openapi.CidadeControllerOpenApi;
import br.com.digitalhouse.model.Cidade;
import br.com.digitalhouse.repository.CidadeRepository;

@RestController
@RequestMapping("/cidade")
public class CidadeController implements CidadeControllerOpenApi {

	@Autowired
	private CidadeRepository repository;
	
	@Override
	@PostMapping
	public void salvar(@RequestBody Cidade cidade) {
		repository.save(cidade);
	}
	
	@Override
	@GetMapping
	public List<Cidade> listar() {
		return repository.findAll();
	}
	
}
