package br.com.digitalhouse.service;
import java.net.URL;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import br.com.digitalhouse.dto.ImagemDTO;

import br.com.digitalhouse.exception.ImagemNaoEncontradaException;
import br.com.digitalhouse.mapper.ImagemMapper;
import br.com.digitalhouse.model.Cliente;
import br.com.digitalhouse.model.Imagem;
import br.com.digitalhouse.repository.ImagemRepository;
import br.com.digitalhouse.request.ImagemRequest;


@Service
public class ImagemService {
	
	@Autowired
	private ImagemRepository repository;
	@Autowired
	private ImagemMapper mapper;
	
	@Autowired
	private S3FotoStorageService s3FotoStorageService;
	
	@Transactional
	public ImagemDTO salvar(ImagemRequest imagemRequest) {
		
		MultipartFile arquivo = imagemRequest.getImagem();
		
		String nomeArquivo = UUID.randomUUID().toString()
				+ "_" + arquivo.getOriginalFilename();	
		
		Imagem imagem = mapper.requestToModel(imagemRequest);
		
		imagem.setNomeArquivoCompleto(nomeArquivo);
		imagem.setNomeArquivo(arquivo.getOriginalFilename());
		imagem.setContentType(arquivo.getContentType());
		imagem.setTamanho(arquivo.getSize());		
		//imagemRequest.getImagem()
		URL url = s3FotoStorageService.armazenar(arquivo, nomeArquivo);
	  	imagem.setUrl(url);
	   
	  	return mapper.modelToDTO( repository.save(imagem) );	
	}
	
	@Transactional
	public void excluir(Long id) {
		
		Imagem imagem =repository.findById(id).get();
		
		s3FotoStorageService.remover(imagem.getNomeArquivoCompleto());
		
		try {
			repository.deleteById(id);
			repository.flush();
		
		} catch (EmptyResultDataAccessException e) {
			throw new ImagemNaoEncontradaException(id);
		};			
	}
	
	public List<ImagemDTO> listar(){
		
		return repository.findAll()
				.stream()
				.map(imagem -> mapper.modelToDTO(imagem))
				.collect(Collectors.toList());
	}
	
	
	public List<Imagem> buscarFotoIdProduto(Long id) {
//		return repository.findById(id);
		return repository.buscarImagemId(id);
				
	}
	public ImagemDTO buscarFotoId(Long id) {
		
		return mapper.modelToDTO(repository.buscarFotoId(id));		
				
				
	}
	
	@Transactional
	public void salvarPut(ImagemRequest imagemRequest, Long id) {
				
		MultipartFile arquivo = imagemRequest.getImagem();
		
		String nomeArquivo = UUID.randomUUID().toString()
				+ "_" + arquivo.getOriginalFilename();	
		
		if(id != null) {
			System.out.println("Altera já existente");
		}else {
			System.out.println("Nova foto");
		}
//		Imagem img = repository.findById(id).get();
//		
//		img.setNomeArquivo(arquivo.getOriginalFilename());
//		img.setNomeArquivoCompleto(nomeArquivo);
//		img.setContentType(arquivo.getContentType());
//		img.setTamanho(arquivo.getSize());
		
//		Imagem imagem = mapper.requestToModel(imagemRequest);
		
		
		
//		imagem.setNomeArquivoCompleto(nomeArquivo);
//		imagem.setNomeArquivo(arquivo.getOriginalFilename());
//		imagem.setContentType(arquivo.getContentType());
//		imagem.setTamanho(arquivo.getSize());		
		//imagemRequest.getImagem()
		//URL url = s3FotoStorageService.armazenar(arquivo, nomeArquivo);
//	  	imagem.setUrl(url);
		//img.setUrl(url);
	   
	  	//repository.save(img);	
	}
	
}