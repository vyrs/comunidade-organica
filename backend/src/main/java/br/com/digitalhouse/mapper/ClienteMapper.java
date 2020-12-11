package br.com.digitalhouse.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.digitalhouse.dto.ClienteDTO;
import br.com.digitalhouse.dto.ClienteResumoDTO;
import br.com.digitalhouse.dto.CompradorDTO;
import br.com.digitalhouse.dto.VendedorDTO;
import br.com.digitalhouse.model.Cliente;
import br.com.digitalhouse.request.ClienteRequest;

@Component
public class ClienteMapper {

    @Autowired
    private ModelMapper modelMapper;

    public Cliente requestToModel(ClienteRequest clienteRequest) {
        return modelMapper.map(clienteRequest, Cliente.class);
    }
    
    public ClienteDTO modelToDTO(Cliente cliente) {
        return modelMapper.map(cliente, ClienteDTO.class);
    }
    public VendedorDTO vendedorModelToDTO(Cliente vendedor) {
        return modelMapper.map(vendedor, VendedorDTO.class);
    }
    public CompradorDTO compradorModelToDTO(Cliente comprador) {
        return modelMapper.map(comprador, CompradorDTO.class);
    }
    
    public ClienteResumoDTO modelToDtoResumo(Cliente cliente) {
        return modelMapper.map(cliente, ClienteResumoDTO.class);
    }

	
}
