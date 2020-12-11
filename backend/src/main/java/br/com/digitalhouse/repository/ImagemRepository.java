package br.com.digitalhouse.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.digitalhouse.dto.ImagemDTO;
import br.com.digitalhouse.model.Imagem;



@Repository
public interface ImagemRepository extends JpaRepository<Imagem, Long> {
	
//	@Query(value = "select * from Imagem as img where img.produto.id = :id",nativeQuery = true)
	@Query("from Imagem  img where img.produto.id = :id")	
	List<Imagem> buscarImagemId(Long id);
	
	@Query(value = "select * from fotos as f  where f.id =:id",
			nativeQuery = true)	
	Imagem buscarFotoId(Long id);

}
