package br.com.digitalhouse.exception;

public class ImagemNaoEncontradaException extends RuntimeException {
	
	private static final long serialVersionUID = 1L;
	
	public ImagemNaoEncontradaException(String message) {
		super(message);
	}
	
	public ImagemNaoEncontradaException(Long id) {
		this(String.format("não existe uma imagem com esse id", id));
	}
}