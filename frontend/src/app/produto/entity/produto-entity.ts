export interface ProdutoEntity {
    id?: number;
    nome?: String;
    tipo?: String;
    preco?:  number;
    dataColheita?: Date;
    dataAnuncio?: Date;
    quantidade?: number;    
    cliente?: any;
}
export interface anyEntity {
    id?: number;
    produto: any;
}
