/* import { ProdutoEntity } from './painel-produto/entity/produto-entity';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  apiUrl = "http://localhost:8080/produto"


  constructor(private httpClient: HttpClient) { 
  
  }

  listar(){
    return this.httpClient.get(this.apiUrl)
      .toPromise()
      .then(res => <ProdutoEntity[]> res.valueOf())
      .then(data => {return data;});
  }

  adicionar(produto: any) {
    return this.httpClient.post(this.apiUrl, produto);
  }

  excluir(id: number) {
    return this.httpClient.delete(this.apiUrl + '/' + id);
  }

  atualizar(cliente: any) {
    return this.httpClient.put(this.apiUrl+ '/' + cliente.id, cliente);
  }

}
 */