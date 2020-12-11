import { DashboardEntity } from '../../produto/entity/dashboard-entity';
import { DashboardModel } from '../../produto/model/dashboard-model';
import { DashboardMapper } from '../../produto/mapper/dashboard-mapper';
import { CidadeMapper } from '../../cliente/mapper/cidade-mapper';
import { EstadoMapper } from '../../cliente/mapper/estado-mapper';
import { BaseHttpService } from './../../services/http/base-http.service';
import { environment } from './../../../environments/environment';
import { ClienteMapper } from '../../cliente/mapper/cliente-mapper';
import { ClienteEntity, EstadoEntity, CidadeEntity } from '../../cliente/entity/cliente-entity';
import { ClienteModel, EstadoModel, CidadeModel } from '../../cliente/model/cliente-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ClienteRepository {

    mapper = new ClienteMapper();
    mapperEstado = new EstadoMapper();
    mapperCidade = new CidadeMapper();

    mapperDashboard = new DashboardMapper();
   
    constructor(public http: BaseHttpService) { }

    getClienteById(id: number): Observable<ClienteModel> {
        return this.http
            .getAll<ClienteModel>(`${environment.URLSERVIDOR}cliente/${id}`)
            .pipe(map((x) => this.mapper.mapFrom(x.data)));
    }

    getAllClientes(): Observable<ClienteModel> {
        return this.http
            .getAll<ClienteEntity[]>(`${environment.URLSERVIDOR}cliente`)
            .pipe(mergeMap((x) => x.data))
            .pipe(map((x) => this.mapper.mapFrom(x)));
    }

    getAllEstados(): Observable<EstadoModel> {
        return this.http
            .getAll<EstadoEntity[]>(`${environment.URLSERVIDOR}estado/getAllEstado`)
            .pipe(mergeMap((x) => x.data))
            .pipe(map((x) => this.mapperEstado.mapFrom(x)));
    }


    getAllCidadesByEstado(id: number): Observable<CidadeModel> {
        return this.http
            .getAll<CidadeEntity[]>(`${environment.URLSERVIDOR}estado/${id}/cidades`)
            .pipe(mergeMap((x) => x.data))
            .pipe(map((x) => this.mapperCidade.mapFrom(x)));
    }
    postCliente(param: ClienteModel) {
        return this.http
            .post<ClienteEntity>(`${environment.URLSERVIDOR}cliente`, this.mapper.mapTo(param))
            .pipe(map((x) => this.mapper.mapFrom(x.data)));
    }

    putCliente(param: ClienteModel) {
        return this.http
            .put<void>(
                `${environment.URLSERVIDOR}cliente/${param.id}`,
                this.mapper.mapTo(param)
            )
            .pipe(map((x) => x.data));
    }

    deleteCliente(id: number): Observable<void> {
        return this.http
            .delete<void>(`${environment.URLSERVIDOR}cliente/${id}`, id)
            .pipe(map((x) => x.data));
    }

    getDadosDashboard(id: number): Observable<DashboardModel>{

        return this.http
            .getAll<DashboardEntity[]>(`${environment.URLSERVIDOR}vendas/dashboard/${id}`) 
            .pipe(mergeMap((x => x.data)))
            .pipe(map ((x) => this.mapperDashboard.mapFrom(x)));
            

    }
}
