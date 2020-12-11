import { ImagemModel } from '../produto/model/imagem-model';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ProdutoRepository } from '../produto/repository/produto-repository';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeResolverService implements Resolve<ImagemModel[]> {

  constructor(private produtoRepository: ProdutoRepository) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  Observable<ImagemModel[]> | Promise<ImagemModel[]> | ImagemModel[] {

    return this.produtoRepository.getAllFotosResolve();

  }
}
