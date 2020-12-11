import { Component, OnInit } from '@angular/core';

import { ImagemEntity } from './../entity/imagem-entity';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProdutoRepository } from '../repository/produto-repository';
import { ActivatedRoute } from '@angular/router';

import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-atualizar-fotos',
  templateUrl: './atualizar-fotos.component.html',
  styleUrls: ['./atualizar-fotos.component.css']
})
export class AtualizarFotosComponent implements OnInit {

  fotos: ImagemEntity[];
  uploadedFiles: any[] = [];
  displayBasic: boolean;
  idProduto: number;

  public formulario: FormGroup;

  constructor(private routeActivatedRoute: ActivatedRoute,private repository: ProdutoRepository,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    const codigoProduto = this.routeActivatedRoute.snapshot.params['id'];
    this.idProduto = codigoProduto;
    this.repository.getFotoID(codigoProduto)
    .then(
      fotosProduto => this.fotos = fotosProduto
      ); 

      this.formulario = this.fb.group({
       
      });
      /* this.displayBasic = true; */

  }
  salva(){

    let aux=0;
    
    
    for (let i=0; i < this.uploadedFiles.length; i++){

      
      const formData: any = new FormData();

        
        formData.set('produto', this.idProduto);
        formData.append('imagem', this.uploadedFiles[i]); 
        /* console.log(formData); */
        /* console.log(this.uploadedFiles[i]) */
        if(i >= this.fotos.length){
          aux = null;
        }else {
          aux = this.fotos[i].id;
        }
        

       // this.repository.putImagem(formData,aux).subscribe(resposta => {
          /* this.mensagem = [
            {
              severity: 'success',
              summary: 'PRODUTO',
              detail: 'cadastrado com sucesso!'
            }]; */
       // });
      console.log(aux)
     /*  console.log(this.fotos.length) */
       console.log(this.uploadedFiles[i])
       console.log(formData)

      }
    
  }

  enviarImagem(evento){
    /* this.uploadedFiles = []; */
    
    for(let file of evento.files) {
      this.uploadedFiles.push(file);
    }    
    
  }
  showBasicDialog() {
    this.displayBasic = true;
  }

}
