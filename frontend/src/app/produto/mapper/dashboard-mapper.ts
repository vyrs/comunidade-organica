import { Mapper } from '../../base/mapper';

import { DashboardModel } from './../model/dashboard-model';
import { DashboardEntity } from './../entity/dashboard-entity';


export class DashboardMapper extends Mapper<DashboardEntity, DashboardModel> {

  mapFrom(param: DashboardEntity): DashboardModel {

    return {
      id: param.id,
      produto: param.produto,
      cliente: param.cliente,
      vendedor: param.vendedor,
      ano: param.ano,
      mes: param.mes,
      preco: param.preco,
      nomeMes: param.nomeMes
    };
  }

  mapTo(param: DashboardModel): DashboardEntity {
    return {
        id: param.id,
        produto: param.produto,
        cliente: param.cliente,
        vendedor: param.vendedor,
        ano: param.ano,
        mes: param.mes,
        preco: param.preco,
        nomeMes: param.nomeMes
    };
  }
}
