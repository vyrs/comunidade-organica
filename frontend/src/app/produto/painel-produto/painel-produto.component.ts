import { ProdutoModel } from '../model/produto-model';
import { ImagemEntity } from '../entity/imagem-entity';
import { async } from '@angular/core/testing';
import { AuthService } from '../../seguranca/auth.service';
import { ClienteRepository } from '../../cliente/repository/cliente-repository';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from './data.service';
import { ProdutoEntity } from '../entity/produto-entity';
import { ProdutoRepository } from '../repository/produto-repository';
import { Component, OnInit, Testability } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';



@Component({
  selector: 'app-painel-produto',
  templateUrl: './painel-produto.component.html',
  styleUrls: ['./painel-produto.component.scss']
})
export class PainelProdutoComponent implements OnInit {

  
  products: ProdutoModel[]=[];
  imagem: ImagemEntity[]=[];   
  urls: any = [{}];  
  obj: any = [{}];
  i =0;
  filtro: string;
  estado: string;
  cidade: string;
  public formulario: FormGroup;
  params: string ="?filtro=";
  paramsEstado: string = "&estado=";
  paramsCidade: string = "&cidade=";
  estados: any[] = [];
  cidades: any[] = [];

  paramsString: string;
  auxArray: string[]=[];

  usuario: string = '';
  

  constructor( private produtoRepository: ProdutoRepository, private router: Router,private fb: FormBuilder,
    private dataService: DataService,private repository: ClienteRepository,public service: AuthService,
    private routeActivatedRoute: ActivatedRoute ) {
      
      this.produtoRepository.getAllProduto().then(products => {

        this.products = products;
        
      }       
        
      );

      this.usuario = service.jwtPayload ? service.jwtPayload.user_name : ''; 
     
   }

  ngOnInit() {

    //this.criarArrayObjFotos();
    this.iniciarFormulario();
    this.criarArrayFotos();
   /*  this.routeActivatedRoute.data.subscribe(
      (info) => {
        console.log(info.url)
        
      }
    ); */
    /* this.routeActivatedRoute.data.subscribe( (data: { imagem: ImagemEntity[] }) =>{
      this.imagem = data.imagem;
      console.log(data.imagem[2].produto.id + ' sou id do produto')
      console.log(data.imagem.length)
      
    }); */

   /*  console.log(this.imagem) */
  
  }
  public iniciarFormulario() {
      
    this.formulario = this.fb.group({
      
      nome: [''],
      cidade: [''],
      estado: [''],
    });
    this.repository.getAllEstados().subscribe(resposta => {      
      this.estados.push({ label: resposta.nome, value: resposta.id });        
    });
  }
 

  /* START dessa forma passa objeto ao utilizar um SERVICE */
  vaiComprarProdutoService(produto: ProdutoEntity){
    this.dataService.setProduto(produto);
    
    this.router.navigateByUrl('/comprar');
    
  }
  /* END  */

  /* STAR dessa forma passa objeto na rota de navigação */
  vaiComprarProdutoServiceOutraForma(produto: ProdutoEntity){
    this.router.navigateByUrl('/comprar', {
      state: produto
    }) 
    
  }
  vaiComprar(produtoId: number){
    this.router.navigateByUrl(`/comprar/${produtoId}`);   
    
  }
  /* END */
  
  checkFoto(){
    
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
          
          
          
          /* console.log(i + ' ' + data.imagem[i].nomeArquivo + ' ' + data.imagem[i].produto.id) */
          /* console.log(a + ' ' + l) */
          break;
        } 

      }
    });

  }
  

   
  filtroNomeProduto(){

    this.filtro =  this.formulario.value.nome
    if(this.filtro == ''){
      this.produtoRepository.getAllProduto().then(products => this.products = products );
      
    }else {
      this.produtoRepository.getAllFiltro(this.filtro).then(res => this.products = res);
      
    }  
    
  }
  inseriParams(){

    this.filtro =  this.formulario.value.nome;
    this.estado = this.formulario.value.estado;
    this.cidade = this.formulario.value.cidade;
    
    this.auxArray.push(this.filtro,this.estado,this.cidade);
   

    
    for(let i=0; i <this.auxArray.length; i++){
     
      if(this.auxArray[i] != ''){  

         if(this.filtro != '' && i == 0){
          this.paramsString="?filtro="+this.filtro;          
         }else if(this.estado != ''   && i == 1 && this.auxArray[0] != ''){
           this.paramsString="?filtro="+this.filtro+"&estado="+this.estado;           
         }else if(this.cidade != '' && this.auxArray[0] != '' && i ==2){
          this.paramsString ="?filtro="+this.filtro+"&estado="+this.estado+"&cidade="+this.cidade;         
         }else if(this.estado != '' && this.cidade != '' && this.auxArray[0] == ''){
           this.paramsString = "?estado="+this.estado+"&cidade="+this.cidade;
         }
         
      }
      if(this.estado != '' && this.filtro == ''  && this.cidade == '' && i ==0){
        this.paramsString = "?estado="+this.estado;        
      }
      if(this.estado == '' && this.filtro == ''  && this.cidade == ''){
        this.produtoRepository.getAllProduto().then(products => this.products = products );       
      }

    }
    this.filtroParams(this.paramsString); 
    this.auxArray = [];
    
  }
  filtroParams(params: string){
    
    this.produtoRepository.getAllFiltroParams(params).then(res => this.products = res);
  }

  listarCidades() {
    this.cidades = [];
    let id: number = this.formulario.value.estado;
    this.repository.getAllCidadesByEstado(id).subscribe(resposta => {
      this.cidades.push({ label: resposta.nome, value: resposta.id });
    });
  }





    /* criarArrayObjFotos(){
   
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
