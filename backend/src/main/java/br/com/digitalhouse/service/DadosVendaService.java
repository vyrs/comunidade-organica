package br.com.digitalhouse.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.digitalhouse.dto.DadosVendaDTO;
import br.com.digitalhouse.mapper.DadosVendaMapper;
import br.com.digitalhouse.model.DadosVenda;
import br.com.digitalhouse.repository.DadosVendaRepository;



@Service
public class DadosVendaService {
	
	@Autowired
	private DadosVendaRepository dadosVendaRepository;	
	
	@Autowired
	private DadosVendaMapper dadosVendaMapper;

	
	public List<DadosVendaDTO> dadosVendaMes(Long id) {
		
		return dadosVendaRepository.somaTotalMes(id)
				.stream()
				.map(dados -> dadosVendaMapper.modelToDTO(dados))
				.collect(Collectors.toList());
		
	}
	
	public List<DadosVendaDTO> buscar(String mes, Long id) {
		
		return dadosVendaRepository.Buscar(id, mes)
				.stream()
				.map(dados -> dadosVendaMapper.modelToDTO(dados))
				.collect(Collectors.toList());
		
	}
	
}
