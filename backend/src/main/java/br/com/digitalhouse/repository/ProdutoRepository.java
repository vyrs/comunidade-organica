package br.com.digitalhouse.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.digitalhouse.model.Imagem;
import br.com.digitalhouse.model.Produto;


@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
	
	@Query(value = "select url, f.produto_id from Produto as p inner join fotos as f on p.id = f.produto_id",nativeQuery = true)
	List<Imagem> buscarImagem();
	
	@Query( " from Produto where nome like %:filtro% " )
	List<Produto> filtroProdutoNome(String filtro);
	

	@Query( "from Produto p  where 0=0 and"
			+"(:cidade is null or p.cliente.endereco.cidade.id = :cidade) and"
			+"(:estado is null or p.cliente.endereco.cidade.estado.id = :estado) and"
			+"(:filtro is null or p.nome like :filtro%)")
	List<Produto> filtroDinamico(@Param("cidade") Long cidade,@Param("estado") Long estado,@Param("filtro")String filtro);
	
	@Query( "from Produto p where p.cliente.id = :idCliente" )
	List<Produto> meusProdutos(Long idCliente);
	
	
//	@Query("delete Produto p inner join Imagem f where p.id = f.produto.id and p.id = :id ")
//	@Query( "delete Imagem f where f.produto.id in "
//			+ "(select p.id from Produto p where p.id = :id)" )
//	@Query( "delete Produto p where p.id in "
//			+ "(select f.id from Imagem f where f.produto.id = :id)" )
	@Query(value = "delete p, f from produto as p join fotos as f where p.id = f.produto_id and  p.id = :id",
	           nativeQuery = true)
	@Modifying
	void apagarProduto(Long id);
	
	
}
