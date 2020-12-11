package br.com.digitalhouse.service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import br.com.digitalhouse.dto.ClienteDTO;
import br.com.digitalhouse.dto.ClienteResumoDTO;
import br.com.digitalhouse.exception.ClienteNaoEncontradodException;
import br.com.digitalhouse.mapper.ClienteMapper;
import br.com.digitalhouse.model.Cliente;
import br.com.digitalhouse.model.Endereco;
import br.com.digitalhouse.model.Grupo;
import br.com.digitalhouse.model.Permissao;
import br.com.digitalhouse.model.Telefone;
import br.com.digitalhouse.model.Usuario;
import br.com.digitalhouse.repository.CidadeRepository;
import br.com.digitalhouse.repository.ClienteRepository;
import br.com.digitalhouse.repository.EstadoRepository;
import br.com.digitalhouse.repository.GrupoRepository;
import br.com.digitalhouse.repository.TelefoneRepository;
import br.com.digitalhouse.repository.UsuarioRepository;
import br.com.digitalhouse.request.ClienteRequest;

@Service
public class ClienteService {
	
	@Autowired
	private ClienteRepository repository;
	
	@Autowired
	private EstadoRepository estadoRepository;
	
	@Autowired
	private CidadeRepository cidadeRepository;
	
	@Autowired
	private GrupoRepository grupoRepository;
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private ClienteMapper mapper;
	
	@Autowired
	private PasswordEncoder passwordEnconder;
	
	@Autowired
	private TelefoneRepository telefoneRepository;
	
	
	@Transactional
	public ClienteDTO salvar(ClienteRequest clienteRequest) {
		
		Usuario usuario = new Usuario();
		Grupo  grupo = new Grupo();
		grupo = grupoRepository.findById(1L).get();
		
		
		
		
		Cliente cliente = mapper.requestToModel(clienteRequest);
//		cliente.setDataNasc(LocalDate.now());
		cliente.setSenha(passwordEnconder.encode(clienteRequest.getSenha()));
		
		if(cliente.getEndereco().getCidade().getId() == null) {
			estadoRepository.save(cliente.getEndereco().getCidade().getEstado());
		    cidadeRepository.save(cliente.getEndereco().getCidade());
		}
    
	    cliente.getTelefone().stream().
		forEach(telefone -> telefone.setCliente(cliente));

	   
	    usuario.setCliente(cliente);
	    usuario.setEmail(clienteRequest.getEmail());
	    usuario.setNome(clienteRequest.getNome());	    
	    usuario.setSenha(passwordEnconder.encode(clienteRequest.getSenha()));
	    	    
	    Set<Grupo> grupos = new HashSet<>();
	    grupos.add(grupo);
	    usuario.setGrupos(grupos);
	    //usuario.setGrupos(grupos);
	   
	    usuarioRepository.save(usuario);
	    
	    return mapper.modelToDTO( repository.save(cliente) );		
	}

	@Transactional
	public void atualizar(Cliente cliente) {
		
		 System.out.println(cliente.getTelefone().get(0).getTelefone());
//	    cliente.getTelefone().stream().
//		forEach(telefone -> telefone.setCliente(cliente));	
		 cliente.getTelefone().get(0).setCliente(cliente);
	    
		repository.save(cliente);		
	}
	
	public Optional<Cliente> buscar(Long id) {
		return repository.findById(id);
	}

	@Transactional
	public void excluir(Long id) {
		
		try {
			repository.deleteById(id);
			repository.flush();
		
		} catch (EmptyResultDataAccessException e) {
			throw new ClienteNaoEncontradodException(id);
		};			
	}

	public List<Telefone> buscarTelefones(Long id) {
		return repository.buscarTelefonesPorId(id);
	}

	public List<ClienteDTO> listar() {
		
		return repository.findAll()
				.stream()
				.map(cli -> mapper.modelToDTO(cli))
				.collect(Collectors.toList());	
	}

	public List<ClienteResumoDTO> listarResumo() {
		
		List<Cliente> clientes = repository.findAll();
			
		return clientes
				.stream()
				.map(cli -> mapper.modelToDtoResumo(cli))
				.collect(Collectors.toList());

	}
	
}
