package br.com.digitalhouse.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;

import br.com.digitalhouse.model.Telefone;

@Component
public interface TelefoneRepository  extends JpaRepository<Telefone, Long> {
	
	@Query( "from Telefone t where  t.cliente.id = :id" )
	List<Telefone> buscarUm(@PathVariable Long id);

}
