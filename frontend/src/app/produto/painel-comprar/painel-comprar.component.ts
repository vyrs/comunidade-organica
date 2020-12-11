import { MessageService } from 'primeng/api';
import { ProdutoModel } from '../model/produto-model';
import { Router,ActivatedRoute } from '@angular/router';
import { ImagemEntity } from '../entity/imagem-entity';
import { ProdutoRepository } from '../repository/produto-repository';
import { DataService } from '../../produto/painel-produto/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutoEntity } from '../entity/produto-entity';
import { stringify } from '@angular/compiler/src/util';
import { NumberValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-painel-comprar',
  templateUrl: './painel-comprar.component.html',
  styleUrls: ['./painel-comprar.component.css']
})
export class PainelComprarComponent implements OnInit {

  produtoSerComprado: ProdutoEntity;
  produtoSerCompradoID: number;
  fotosProduto: ImagemEntity[];
  teste: any;
  quantidade: number=1;
  qntsMaxima: number;
  qntsMinima: number=1;

  produto: ProdutoModel;
  
  displayMaximizable: boolean;
  
 
  @ViewChild('dv') table: DataView;
 
  

  constructor(private dataService: DataService, private produtoRepository: ProdutoRepository,
     private router: ActivatedRoute, private messageService: MessageService) {
    /* this.produtoSerComprado = this.dataService.getProduto(); */
    /* const nav = this.router.getCurrentNavigation(); */
      
   }

  ngOnInit(): void {

    const codigoCliente = this.router.snapshot.params['id'];
    this.produtoSerCompradoID = codigoCliente;
    
    
    //star usando resolver, pq mostrava um erro no navegado
    //por carregar componete antes do dados
    this.router.data.subscribe(
      (info) => {
        this.produtoSerComprado = info.produto;        
        this.qntsMaxima = info.produto.quantidade;
      }
    );
    //end resolver
      
    this.produtoRepository.getFotoID(codigoCliente)
    .then(
      fotosProduto => this.fotosProduto = fotosProduto
      ); 
      
      
  }  
  
  showMaximizableDialog() {
    this.displayMaximizable = true;
  }
  comprar(){
    
    this.produtoRepository.getProdutoID(this.produtoSerCompradoID).subscribe(resp => {
      
      this.produto = resp;      
      this.produto.quantidade = this.quantidade;

       this.produtoRepository.putComprar(this.produto).subscribe(resp =>{
        this.messageService.add(
          {
            key: 'toast',
            severity: 'success',
            summary: 'PRODUTO',
            detail: 'comprado com sucesso!'
            
          });
          this.produtoSerComprado.quantidade -= this.quantidade;
          this.qntsMaxima = this.produtoSerComprado.quantidade;
          this.displayMaximizable = false;
       }); 
       
    });

  }
  

}
