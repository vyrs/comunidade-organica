import { ProdutoModel } from '../model/produto-model';
import { ProdutoRepository } from '../repository/produto-repository';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProdutoResolverService implements Resolve<ProdutoModel> {

  constructor(private produtoRespository: ProdutoRepository) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  Observable<ProdutoModel> | Promise<ProdutoModel> | ProdutoModel {

    const id = route.params['id'];
    return this.produtoRespository.getProdutoID(id);

  }
}
