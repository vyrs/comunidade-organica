package br.com.digitalhouse.controller;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.digitalhouse.controller.openapi.ImagemControllerOpenApi;
import br.com.digitalhouse.dto.ImagemDTO;
import br.com.digitalhouse.model.Cliente;
import br.com.digitalhouse.model.Imagem;
import br.com.digitalhouse.repository.ImagemRepository;
import br.com.digitalhouse.request.ImagemRequest;
import br.com.digitalhouse.security.permissoes.CheckSecurity;
import br.com.digitalhouse.service.ImagemService;
import br.com.digitalhouse.service.S3FotoStorageService;

@CrossOrigin
@RestController
@RequestMapping("/imagem")
public class ImagemController implements ImagemControllerOpenApi {
	
	@Autowired
	private ImagemService service;
	
	@Autowired
	private ImagemRepository imagemRepository;
	
	@Autowired
	private S3FotoStorageService s3FotoStorageService;
	
	@CheckSecurity.Imagem.PodeCadastarImagem
	@PostMapping
	public ImagemDTO salvarFoto(@Valid ImagemRequest imagem) {
		
		return service.salvar(imagem);
	}
	
	@GetMapping("/getAllImagem")
	public List<ImagemDTO> listar(){
		return service.listar();
	}
	
	@GetMapping("/{id}")
	public List<Imagem> listarImagemIdProduto(@PathVariable Long id){
		
		return service.buscarFotoIdProduto(id);
	}
	@GetMapping("/foto/{id}")
	public ImagemDTO listarFotoId(@PathVariable Long id){
		
		return service.buscarFotoId(id);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ImagemDTO> excluir(@PathVariable Long id) {
		try {
			service.excluir(id);	
			return ResponseEntity.noContent().build();
			
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
			
	}
	@PutMapping("/{id}")
	public void atualizar(@PathVariable Long id,@Valid ImagemRequest imagem) {
		
		Imagem img = imagemRepository.findById(id).get();		
		
		s3FotoStorageService.remover(img.getNomeArquivoCompleto());
		
		service.salvarPut(imagem,id);
		
	}
}