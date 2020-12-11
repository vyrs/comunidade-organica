import { ImagemEntity } from '../entity/imagem-entity';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../seguranca/auth.service';
import { ProdutoRepository } from '../repository/produto-repository';
import { Component, OnInit } from '@angular/core';
import { ProdutoEntity } from '../entity/produto-entity';

@Component({
  selector: 'app-area-meus-anuncios',
  templateUrl: './area-meus-anuncios.component.html',
  styleUrls: ['./area-meus-anuncios.component.css'],
  providers: [ ConfirmationService,MessageService ]
})
export class AreaMeusAnunciosComponent implements OnInit {

  products: ProdutoEntity[];
  urls: any = [{}];  
  obj: any = [{}];
  imagem: ImagemEntity[]=[]; 
  displayBasic: boolean;


  constructor(
    private produtoRepository: ProdutoRepository,
    private service: AuthService,
    private router: Router,
    private routeActivatedRoute: ActivatedRoute,
    ) {

    this.produtoRepository.getMeusProduto(this.service.pegaIdUser).then(resp => this.products = resp);
   }

  ngOnInit(): void {
   
   /*  this.produtoRepository.getAllFotos().subscribe(resp => {
      this.teste.push(resp)
    }); */
    this.criarArrayFotos();
    
  }

  criarArrayFotos(){

    let j: number=1;
    let aux: number;

    this.routeActivatedRoute.data.subscribe( (data: { imagem: ImagemEntity[] }) =>{
      this.imagem = data.imagem;
      let l =0;
      let a = data.imagem[0].produto.id;
      
      for (let i=0; i < data.imagem.length; i++){

        j = data.imagem[i].produto.id;
        aux = data.imagem[i].produto.id;
        
        
        while(data.imagem[i].produto.id == j){
          
          
          aux = data.imagem[i].produto.id;
          /* l = aux -1; */

          if(a != data.imagem[i].produto.id){           
            l++;
            a = data.imagem[i].produto.id;
          }

  
          if(this.urls[l] == null){
            this.urls[l] = new Object();          
          }
          
          if(this.urls[l]["id"] ==  null){
            this.urls[l]["id"] = data.imagem[i].produto.id;
          }
          if(this.urls[l]["url1"] == null){
            this.urls[l]["url1"] = data.imagem[i].url;
          }else if(this.urls[l]["url2"] == null){
            this.urls[l]["url2"] = data.imagem[i].url;
          }else if(this.urls[l]["url3"] == null){
            this.urls[l]["url3"] = data.imagem[i].url;
          }
          
          break;
        } 

      }
    });

  }
  
 /*  criarArrayObjFotos(){
   
    let j: number=1;
    let aux: number;


    this.produtoRepository.getAllFotos().subscribe(resposta => {
     
      
      j = resposta.produto.id;
      aux = resposta.produto.id;
      
      
      while(resposta.produto.id == j){
        
        let l =0;
        aux = resposta.produto.id;
        l = aux -1;

        if(this.urls[l] == null){
          this.urls[l] = new Object();          
        }
        
        if(this.urls[l]["id"] ==  null){
          this.urls[l]["id"] = resposta.produto.id;
        }
        if(this.urls[l]["url1"] == null){
          this.urls[l]["url1"] = resposta.url;
        }else if(this.urls[l]["url2"] == null){
          this.urls[l]["url2"] = resposta.url;
        }else if(this.urls[l]["url3"] == null){
          this.urls[l]["url3"] = resposta.url;
        }
        
      
        break;
      } 
    });
      
  } */

 

}
