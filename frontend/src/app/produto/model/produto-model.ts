import { ClienteModel } from 'src/app/cliente/model/cliente-model';

export interface ProdutoModel {
    id?: number;
    nome?: String;    
    tipo?: String;
    preco?:  number;
    dataColheita?: Date;
    dataAnuncio?: Date;
    quantidade?: number;
    cliente?: any;
}
export interface anyModel {
    id?: number;
    produto: any;
}