package br.com.digitalhouse.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import br.com.digitalhouse.dto.DadosVendaDTO;
import br.com.digitalhouse.model.DadosVenda;


@Repository
public interface DadosVendaRepository extends JpaRepository<DadosVenda, Long> {


//	@Query(value = "select c.nome ,sum(preco) from vendas as v "
//			+ "inner join cliente as c on c.id = v.id_vendedor where v.mes = :mes",
//			 nativeQuery = true)
//	@Query( "from DadosVenda d  where 0=0 and"
//	+"(:mes is null or d.mes like :mes) and"
//	+ "(:vendedor is null or d.vendedor.id = :vendedor)")
	@Query( "from DadosVenda d where d.vendedor.id = :id" )
	List<DadosVenda> somaTotalMes(@PathVariable Long id);
		
//	select * from vendas as v where v.vendedor_id = 20  and v.mes like 'november';
//	@Query(value = "select * from vendas as v "
//	+ "inner join cliente as c on c.id = v.id_vendedor where v.mes like mes",
//	 nativeQuery = true)
	@Query( "from DadosVenda d where d.vendedor.id = :id and d.mes like :mes" )
	List<DadosVenda> Buscar(@PathVariable Long id, @PathVariable String mes);

}
