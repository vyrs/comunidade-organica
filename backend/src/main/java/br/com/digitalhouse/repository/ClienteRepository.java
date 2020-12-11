package br.com.digitalhouse.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.digitalhouse.model.Cliente;
import br.com.digitalhouse.model.Endereco;
import br.com.digitalhouse.model.Telefone;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long>{
	
//	@Query("from Cliente where bairro like :bairro%")
//	List<Cliente> findByBairro(String bairro);
	
//	@Query("from Cliente where cidade like :cidade%")
//	List<Cliente> findByCidade(String cidade);
	
//	@Query("from Cliente where estado like :estado%")
//	List<Cliente> findByEstado(String estado);
//	
	@Query("select telefone from Cliente c where c.id = :id")
	List<Telefone> buscarTelefonesPorId(Long id);
	
//	@Query("select endereco from Cliente c where c.id = :id")
//	List<Endereco> buscarEnderecoPorId(Long id);

}