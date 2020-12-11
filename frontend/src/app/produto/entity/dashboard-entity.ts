import { ClienteEntity } from 'src/app/cliente/entity/cliente-entity';
import { ProdutoEntity } from './produto-entity';
export interface DashboardEntity {
   
    id?: number;
    produto?: ProdutoEntity;
    cliente?: ClienteEntity;
    vendedor?: ClienteEntity;
    ano?: number;
    mes?: number;
    preco?: number
    nomeMes?: string;
}
