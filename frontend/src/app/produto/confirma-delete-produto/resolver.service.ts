import { ProdutoModel } from '../model/produto-model';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { ProdutoRepository } from '../repository/produto-repository';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResolverService  implements Resolve<ProdutoModel> {

  constructor(private produtoRespository: ProdutoRepository) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  Observable<ProdutoModel> | Promise<ProdutoModel> | ProdutoModel {

    const id = route.params['id'];
    return this.produtoRespository.getProdutoID(id);

  }
}