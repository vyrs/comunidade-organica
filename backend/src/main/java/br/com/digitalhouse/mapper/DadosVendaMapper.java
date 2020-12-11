package br.com.digitalhouse.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.digitalhouse.dto.DadosVendaDTO;
import br.com.digitalhouse.model.DadosVenda;

@Component
public class DadosVendaMapper {

	 @Autowired
	 private ModelMapper modelMapper;
	 
	 public DadosVendaDTO modelToDTO(DadosVenda dadosVenda) {
		 return modelMapper.map(dadosVenda, DadosVendaDTO.class);
	 }
	 
	 
}
