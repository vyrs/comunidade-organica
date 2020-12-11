import { ClienteModel } from 'src/app/cliente/model/cliente-model';
import { ProdutoModel } from './produto-model';

export interface DashboardModel {
   
    id?: number;
    produto?: ProdutoModel;
    cliente?: ClienteModel;
    vendedor?: ClienteModel;
    ano?: number;
    mes?: number;
    preco?: number;
    nomeMes?: string;
}