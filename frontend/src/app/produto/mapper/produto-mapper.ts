import { ProdutoModel } from '../model/produto-model';
import { ProdutoEntity } from '../entity/produto-entity';
import { Mapper } from './../../../app/base/mapper';


export class ProdutoMapper extends Mapper <ProdutoEntity, ProdutoModel> {

    mapFrom(entity: ProdutoEntity): ProdutoModel {
        return {
            id: entity.id,
            nome: entity.nome ? entity.nome : '',
            tipo: entity.tipo,
            preco: entity.preco,  
            /* "R$ " + */       
            dataAnuncio: entity.dataAnuncio,
            dataColheita: entity.dataColheita,
            quantidade: entity.quantidade,
            cliente: entity.cliente
        };
    }
    /* Number(entity.preco).toFixed(2), */
    /* preco: Number(model.preco.split( " " )[1]), */ 

    mapTo(model: ProdutoModel): ProdutoEntity {
        return {
            id: model.id,
            nome: model.nome,
            tipo: model.tipo,
            preco: model.preco,                      
            dataColheita: model.dataColheita,
            dataAnuncio: model.dataAnuncio,
            quantidade: model.quantidade,
            cliente: model.cliente
        };
    }

}