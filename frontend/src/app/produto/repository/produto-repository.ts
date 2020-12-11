import { AnyMapper } from '../mapper/any-mapper';
import { Injectable } from '@angular/core';

import { HttpHeaders } from '@angular/common/http';
import { ImagemModel } from '../model/imagem-model';
import { ImagemMapper } from '../mapper/imagem-mapper';
import { ImagemEntity } from '../entity/imagem-entity';
import { map, mergeMap, share, delay } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { anyEntity, ProdutoEntity } from '../entity/produto-entity';
import { ProdutoModel, anyModel } from '../model/produto-model';
import { ProdutoMapper } from '../mapper/produto-mapper';

import { Observable } from 'rxjs';


import { BaseHttpService } from './../../services/http/base-http.service';


@Injectable({
    providedIn: 'root',
})
export class ProdutoRepository {

    mapper = new ProdutoMapper();

    mapperImagem = new ImagemMapper();

    mapperCarrinho = new AnyMapper();

    constructor (public http: BaseHttpService  ) {}


    postProduto(param: ProdutoModel) {
        return this.http
            .post<ProdutoEntity>(`${environment.URLSERVIDOR}produto`, this.mapper.mapTo(param))
            .pipe(map((x) => this.mapper.mapFrom(x.data)));
    }
    
    postCarrinho(param: any) {
        return this.http
            .post<any>(`${environment.URLSERVIDOR}produto/carrinho/${param}`, this.mapperCarrinho.mapTo(param))
            .toPromise()
            .then(res => <anyEntity[]> res.valueOf())
            .then(data => {return data;});
    }

    getCarrinho(): Observable<anyModel> {
        return this.http
            .getAll<anyEntity[]>(`${environment.URLSERVIDOR}produto/carrinho`)
            .pipe(mergeMap((x) => x.data))
            .pipe(map((x) => this.mapperCarrinho.mapFrom(x)));
    }
   
    putproduto(param: ProdutoModel) {
        return this.http
            .put<void>(
                `${environment.URLSERVIDOR}produto/${param.id}`,
                this.mapper.mapTo(param)
            )
            .pipe(map((x) => x.data));
    }

    putComprar(param: ProdutoModel) {
        return this.http
            .put<void>(
                `${environment.URLSERVIDOR}produto/${param.id}/comprar`,
                this.mapper.mapTo(param)
            )
            .pipe(map((x) => x.data));
    }

    postImagem(param: any) {
        return this.http
            .post<ImagemEntity>(`${environment.URLSERVIDOR}imagem`, param)
            .pipe(map((x) => this.mapperImagem.mapFrom(x.data)));
    }
    putImagem(param: any, id: number) {
        return this.http
            .put<void>(`${environment.URLSERVIDOR}imagem/${id}`, 
            param
            )
            .pipe(map((x) => x.data));
    }
  
    getAllProduto(): Promise<ProdutoModel[]>{
        
        return (this.http
          .getAll<ProdutoEntity[]>(`${environment.URLSERVIDOR}produto/getAllProduto`)
          .toPromise()
          .then(res =>  {return res.data.map(this.mapper.mapFrom)})          
        );          
    }

/*     getAllProduto(){
        
        return (this.http
          .getAll<ProdutoEntity[]>(`${environment.URLSERVIDOR}produto`)
          .pipe(mergeMap((x) => x.data))
          .pipe(map((x) => this.mapper.mapFrom(x)));
          
    } */
   
    getAllFiltro(filtro: string): Promise<ProdutoModel[]>{
        
        return (this.http
          .getAll<ProdutoEntity[]>(`${environment.URLSERVIDOR}produto/filtro/${filtro}`)         
          .toPromise()
          .then(res =>  {return res.data.map(this.mapper.mapFrom)}));
          
    }

    getAllFiltroParams(params: any): Promise<ProdutoModel[]>{
        
        return (this.http
          .getAll<ProdutoEntity[]>(`${environment.URLSERVIDOR}produto/filtro${params}`)                 
          .toPromise()
          .then(res =>  {return res.data.map(this.mapper.mapFrom)}));
          
    }
    //
    getAllP(): Observable<ProdutoModel> {
        return this.http
            .getAll<ProdutoEntity[]>(`${environment.URLSERVIDOR}produto`)
            .pipe(mergeMap((x) => x.data))
            .pipe(map((x) => this.mapper.mapFrom(x)));
    }

    getAllFotos(): Observable<ImagemModel> {
               
        return this.http
            .getAllImagem<ImagemEntity[]>(`${environment.URLSERVIDOR}imagem/getAllImagem`)
            .pipe(mergeMap((x) => x.data))
            .pipe(map((x) => this.mapperImagem.mapFrom(x)));
    }  

    getAllFotosResolve() {
               
        return this.http
            .getP(`${environment.URLSERVIDOR}imagem/getAllImagem`)
            .pipe(share(),delay(2000));
    } 
    
      getFotoID(id: number){
        
        return (this.http
            .getP(`${environment.URLSERVIDOR}imagem/${id}`)
            .toPromise()
            .then(res => <ImagemEntity[]> res.valueOf())
            .then(data => {return data;})) ;
      }    
      getProdutoID(id: number): Observable<ProdutoModel>{
        
        return (this.http
        .getAll<ProdutoEntity>(`${environment.URLSERVIDOR}produto/${id}`)            
        .pipe(map((x) => this.mapper.mapFrom(x.data))));

      } 
      getMeusProduto(id: number){
        
        return (this.http
            .getP(`${environment.URLSERVIDOR}produto/meusprodutos/${id}`)
            .toPromise()
            .then(res => <ProdutoEntity[]> res.valueOf())
            .then(data => {return data;})) ;
      }   

      deleteProduto(id: number) {

       return this.http.delete2<ProdutoEntity>(`${environment.URLSERVIDOR}produto/delete/${id}`);
       /*  return this.http
            .delete2<ProdutoEntity[]>(`${environment.URLSERVIDOR}produto/delete/${id}`)
            .pipe(); */
            
    } 
}