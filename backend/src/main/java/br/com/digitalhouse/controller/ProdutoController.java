package br.com.digitalhouse.controller;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import br.com.digitalhouse.carrinho.Carrinho;
import br.com.digitalhouse.carrinho.CarrinhoProdutoDTO;
import br.com.digitalhouse.carrinho.Cookies;
import br.com.digitalhouse.controller.openapi.ProdutoControllerOpenApi;
import br.com.digitalhouse.dto.ProdutoDTO;
import br.com.digitalhouse.mapper.ProdutoMapper;
import br.com.digitalhouse.model.Produto;
import br.com.digitalhouse.repository.ProdutoRepository;

import br.com.digitalhouse.request.ProdutoRequest;
import br.com.digitalhouse.security.permissoes.CheckSecurity;
import br.com.digitalhouse.service.ImagemService;
import br.com.digitalhouse.service.ProdutoService;
import br.com.digitalhouse.service.S3FotoStorageService;

@CrossOrigin
@RestController
@RequestMapping("/produto")
public class ProdutoController implements ProdutoControllerOpenApi {

	@Autowired
	private ProdutoRepository repository;
	
	@Autowired
	private ProdutoService produtoService;
	
	@Autowired
	private Cookies cookies;
	
	@Autowired
	private Carrinho carrinho;
	
	@Autowired
	private ProdutoMapper mapper;
	
	@Autowired
	private ImagemService imagemService;	
	
		
	@CheckSecurity.Produto.PodeCadastrarProduto
	@PostMapping
	public ResponseEntity<?> salvar(@RequestBody @Valid ProdutoRequest produtoRequest) {	
		
		try {
					
			ProdutoDTO produtoDTO = produtoService.salvar(produtoRequest);	
			
			return ResponseEntity.status(HttpStatus.CREATED).body(produtoDTO);
		
		}catch(Exception ex) {
			return ResponseEntity.badRequest().body(ex.getMessage());
		}		
	}
	
	@GetMapping("/getAllProduto")
	public List<ProdutoDTO> listar(){
		return repository.findAll()
				.stream()
				.map(prod -> mapper.modelToDTO(prod))
				.collect(Collectors.toList());
	}	
	
	
	@GetMapping("/{id}")
	public Produto buscar(@PathVariable Long id) {
		return repository.findById(id).get();
	}
	
	@DeleteMapping("/{id}")
	public void excluir(@PathVariable Long id) {
		repository.deleteById(id);
	}
	
	@PutMapping("/{id}")
	public void atualizar(@RequestBody Produto produtoAtualizado, @PathVariable Long id) {
		Produto produto = repository.findById(id).get();
		
		produto.setNome(produtoAtualizado.getNome());
		produto.setTipo(produtoAtualizado.getTipo());
		produto.setDataColheita(produtoAtualizado.getDataColheita());
		produto.setQuantidade(produtoAtualizado.getQuantidade());
		produto.setPreco(produtoAtualizado.getPreco());
		
		repository.save(produto);		
	}
	
	@GetMapping("/meusprodutos/{idCliente}")
	public List<Produto> buscarNomeProduto(@PathVariable Long idCliente) {
		
		return produtoService.meusProdutos(idCliente);
	}
	
	@GetMapping("/filtro")
	public List<ProdutoDTO> buscarProduto(@PathParam(value = "cidade")  Long cidade, 
			@PathParam(value = "estado")  Long estado,
			@PathParam(value = "filtro") String filtro) {
		
		return produtoService.filtroDinamico(cidade,estado, filtro);
	}
	
	@DeleteMapping("/delete/{id}")
	public void apagaProduto(@PathVariable Long id){
		
		for(int i = 0; i <  imagemService.buscarFotoIdProduto(id).size(); i++) {	
//			s3FotoStorageService.remover(imagemService.buscarFotoIdProduto(id).get(i).getNomeArquivoCompleto());
			imagemService.excluir( imagemService.buscarFotoIdProduto(id).get(i).getId() );
			
		}	
		 produtoService.apagaProduto(id);
		
	}
	
	@PutMapping("/{idProduto}/comprar")
	public void comprarProduto(@PathVariable Long idProduto, @RequestBody @Valid ProdutoRequest produtoRequest ) {
		
		produtoService.comprar(idProduto, produtoRequest);
		
	}
	
	
	
	
	
	
	
	
	
	//Trabalhando nisso ainda
	@PostMapping("/carrinho/{idProduto}")
	public LinkedHashSet<CarrinhoProdutoDTO> adicionaProduto(@PathVariable("idProduto") Long idProduto, @CookieValue("carrinho") Optional<String> jsonCarrinho, HttpServletResponse response) throws JsonProcessingException{
		Carrinho.cria(jsonCarrinho);
		
		carrinho.adiciona(repository.findById(idProduto).get());
		
		cookies.writeAsJson("carrinho", carrinho, response);
		
		return carrinho.getProdutos();
		
	}
	@DeleteMapping("/carrinho/{idProduto}")
	public LinkedHashSet<CarrinhoProdutoDTO> excluirProduto(@PathVariable("idProduto") Long idProduto, @CookieValue("carrinho") Optional<String> jsonCarrinho, HttpServletResponse response) throws JsonProcessingException{
		
		carrinho.excluirProduto(repository.findById(idProduto).get());
		
		cookies.writeAsJson("carrinho", carrinho, response);
		
		return carrinho.getProdutos();
		
	}
	@GetMapping("/carrinho")
	public LinkedHashSet<CarrinhoProdutoDTO> pegaProdutos(){
		
		//cookies.writeAsJson("carrinho", carrinho, response);
		
		return carrinho.getProdutos();
		
	}
}
















