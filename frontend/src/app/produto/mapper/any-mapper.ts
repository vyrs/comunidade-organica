import { anyEntity } from '../entity/produto-entity';
import { anyModel } from '../model/produto-model';

import { Mapper } from '../../base/mapper';


export class AnyMapper extends Mapper <anyModel, anyEntity> {

    mapFrom(entity: anyEntity): anyModel  {
        return {
            id: entity.id,
           produto: entity.produto
        };
    }

    mapTo(model: anyModel): anyEntity  {
        return {
            id: model.id,
            produto: model.produto
         };
    }

}