package br.com.digitalhouse.service; 


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



import br.com.digitalhouse.dto.ProdutoDTO;
import br.com.digitalhouse.email.EnvioEmailService;
import br.com.digitalhouse.email.Mensagem;
import br.com.digitalhouse.mapper.ClienteMapper;
import br.com.digitalhouse.mapper.ProdutoMapper;
import br.com.digitalhouse.model.Cliente;
import br.com.digitalhouse.model.DadosVenda;
import br.com.digitalhouse.model.Imagem;
import br.com.digitalhouse.model.Produto;
import br.com.digitalhouse.model.Usuario;
import br.com.digitalhouse.repository.ClienteRepository;
import br.com.digitalhouse.repository.DadosVendaRepository;
import br.com.digitalhouse.repository.ProdutoRepository;
import br.com.digitalhouse.repository.UsuarioRepository;
import br.com.digitalhouse.request.ProdutoRequest;

import br.com.digitalhouse.security.permissoes.DigitalSecurity;

@Service
public class ProdutoService {

	@Autowired
	private ProdutoRepository produtoRepository;
	
	@Autowired
	private ProdutoMapper mapper;
	
	@Autowired
	private EnvioEmailService envioEmail;
	
	@Autowired
	private DigitalSecurity digital;
	
	@Autowired
	private ClienteRepository clienteRepository;
	
	@Autowired
	private ClienteMapper clienteapper;	
	
	@Autowired
	private DadosVendaRepository dadosVendaRepository;	
	
	
	@Transactional
	public ProdutoDTO salvar(ProdutoRequest produtoRequest) {
		
		Produto produto = mapper.requestToModel(produtoRequest);
		produto.setDataAnuncio(LocalDate.now());
			
		return mapper.modelToDTO( produtoRepository.save(produto) );
		
	}
	
	
	public void comprar(Long idProduto, ProdutoRequest produtoRequest ) {
	
		
		DadosVenda venda = new DadosVenda();
		Float preco =  (produtoRequest.getQuantidade() * produtoRequest.getPreco());
		venda.setCliente(clienteRepository.findById(digital.getUsuario()).get());
		venda.setVendedor(produtoRepository.findById(produtoRequest.getId()).get().getCliente());
		venda.setProduto(produtoRepository.findById(produtoRequest.getId()).get());
		venda.setAno(LocalDate.now().getYear());
		venda.setMes(LocalDate.now().getMonth().getValue());
		venda.setNomeMes(LocalDate.now().getMonth().name());
		
		venda.setPreco(preco);
		
		dadosVendaRepository.save(venda);
		
		
		
		Mensagem mensagem = Mensagem.builder()
				.assunto(produtoRequest.getNome() + " - Produto vendido")
				.corpo("cliente-atualizado.html")
				.variavel("vendedor", produtoRequest.getCliente())
				.variavel("cidade", produtoRequest.getCliente().getEndereco().getCidade())
				.variavel("comprador", clienteRepository.findById(digital.getUsuario()).get())
				.variavel("telVendedor", produtoRequest.getCliente().getTelefone().get(0).getTelefone())
				.variavel("quantidade", produtoRequest.getQuantidade())	
				.variavel("telefone", clienteRepository.findById(digital.getUsuario()).get().getTelefone().get(0).getTelefone())
				.variavel("preco", produtoRequest.getQuantidade() * produtoRequest.getPreco())
				.destinatario(produtoRequest.getCliente().getEmail())
				.destinatario(clienteRepository.findById(digital.getUsuario()).get().getEmail())
				.build();
		
		Long val =produtoRepository.findById(idProduto).get().getQuantidade();
		val -= produtoRequest.getQuantidade();
		Produto prod = produtoRepository.findById(idProduto).get();
		prod.setQuantidade(val);
		
		produtoRepository.save(prod);
		
		
	
		envioEmail.enviar(mensagem);

		
	}
	
	
	public List<ProdutoDTO> filtroProdutoNome(String filtro) {
		return produtoRepository.filtroProdutoNome(filtro)
				.stream()
				.map(prod -> mapper.modelToDTO(prod))
				.collect(Collectors.toList());			
	}
	
	public List<ProdutoDTO> filtroDinamico(Long cidade,Long estado,String filtro){
		return produtoRepository.filtroDinamico(cidade,estado,filtro)
				.stream()
				.map(prod -> mapper.modelToDTO(prod))
				.collect(Collectors.toList());
	}
	
	public List<Produto> meusProdutos(Long idCliente){
		return produtoRepository.meusProdutos(idCliente);
	}
	
	@Transactional
	public void apagaProduto(Long id){
		produtoRepository.apagarProduto(id);
	}
}
