package br.com.digitalhouse.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import br.com.digitalhouse.dto.ProdutoDTO;
import br.com.digitalhouse.model.Produto;
import br.com.digitalhouse.request.ProdutoRequest;

@Component
public class ProdutoMapper {

	  @Autowired
	  private ModelMapper modelMapper;
	  
	  public Produto requestToModel(ProdutoRequest produtoRequest) {
	        return modelMapper.map(produtoRequest, Produto.class);
	    }
	    
	  public ProdutoDTO modelToDTO(Produto produto) {
	        return modelMapper.map(produto, ProdutoDTO.class);
	    }
	  	  
	    	
}
