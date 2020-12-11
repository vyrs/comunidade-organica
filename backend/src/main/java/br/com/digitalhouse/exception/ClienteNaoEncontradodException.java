package br.com.digitalhouse.exception;

public class ClienteNaoEncontradodException extends EntidadeNaoEncontradaException{

	public ClienteNaoEncontradodException(String mensagem) {
		super(mensagem);		
	}

	public ClienteNaoEncontradodException(Long id) {
		this(String.format("Não existe um cadastro de cliente com código %d", id));
	}
}
