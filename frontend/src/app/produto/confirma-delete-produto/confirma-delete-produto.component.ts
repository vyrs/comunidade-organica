import { ProdutoModel } from '../model/produto-model';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoRepository } from '../repository/produto-repository';
import { Component, OnInit } from '@angular/core';

import { Message } from 'primeng/api';

@Component({
  selector: 'app-confirma-delete-produto',
  templateUrl: './confirma-delete-produto.component.html',
  styleUrls: ['./confirma-delete-produto.component.css']
})
export class ConfirmaDeleteProdutoComponent implements OnInit {

  id: any;
  produto: ProdutoModel;

  constructor(private produtoRespository: ProdutoRepository, private router: ActivatedRoute,
    private route: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService)
     {
    this.id = this.router.snapshot.params['id'];
    produtoRespository.getProdutoID(this.id).subscribe(resp => this.produto = resp);
   }

  ngOnInit(): void {
    
    this.router.data.subscribe(
      (info) => {
       this.produto = info.produto;       
      }
    );
  }
  confirm() {
    this.confirmationService.confirm({
        message: 'Realmente quer prosseguir?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.produtoRespository.deleteProduto(this.id).subscribe(resp => resp = resp);

          this.messageService.add(
            {
              key: 'toast',
              severity: 'success',
              summary: 'PRODUTO',
              detail: 'excluido com sucesso!'
            });           
            
        },
        reject: () => {
          this.messageService.add(
            {
              key: 'toast',
              severity: 'success',
              summary: 'PRODUTO',
              detail: 'não foi excluido'
            });
        }
    });
}
 
}
