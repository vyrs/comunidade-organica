import { Injectable } from '@angular/core';

import { ProdutoEntity } from '../entity/produto-entity';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private produto: ProdutoEntity;

  constructor() { }

  setProduto(produto: ProdutoEntity){
    this.produto = produto;
    
  } 
  
  getProduto(){
    return this.produto;
  } 
  
}
