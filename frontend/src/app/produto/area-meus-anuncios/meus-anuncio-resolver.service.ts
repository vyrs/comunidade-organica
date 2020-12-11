import { ImagemModel } from '../model/imagem-model';
import { Observable } from 'rxjs';
import { ProdutoRepository } from '../repository/produto-repository';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeusAnuncioResolverService implements Resolve<ImagemModel[]> {

  constructor(private produtoRepository: ProdutoRepository) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  Observable<ImagemModel[]> | Promise<ImagemModel[]> | ImagemModel[] {

    return this.produtoRepository.getAllFotosResolve();

  }
}
