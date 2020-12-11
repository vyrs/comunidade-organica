import { Message, MessageService } from 'primeng/api';
import { ImagemEntity } from '../entity/imagem-entity';
import { Title } from '@angular/platform-browser';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { ProdutoModel } from '../model/produto-model';
import { ProdutoRepository } from '../repository/produto-repository';
import { ClienteRepository } from '../../cliente/repository/cliente-repository';
import { AuthService } from '../../seguranca/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteEntity } from '../../cliente/entity/cliente-entity';

@Component({
  selector: 'app-painel-cadastro-produto',
  templateUrl: './painel-cadastro-produto.component.html',
  styleUrls: ['./painel-cadastro-produto.component.css']
})
export class PainelCadastroProdutoComponent implements OnInit {

  @ViewChild('upload') upload: ElementRef; 
  public formulario: FormGroup;
  public form: FormGroup;
  operacao: boolean = true;

  uploadedFiles: any[] = [];
  fotosProduto: ImagemEntity[]=[];
  idProduto: number;
  idCliente: ClienteEntity;
  displayBasic: boolean;
  position: string;
  displayPosition: boolean;

  idPagAtualizar: number;
  mensagem: Message[] = [];

  constructor(private repository: ProdutoRepository,
    private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute,private title: Title,
    private auth: AuthService, private cliRepository: ClienteRepository,
    private messageService: MessageService ) { 
      
      cliRepository.getClienteById(auth.pegaIdUser).subscribe(resposta => {
        this.idCliente = resposta;
      });
    }
    
  ngOnInit(): void {

    const codigoProduto = this.route.snapshot.params['codigo'];

    if (codigoProduto) {
      this.operacao = false;
      this.idPagAtualizar = codigoProduto;
      this.title.setTitle('Atualizar Produto');
      this.carregarProduto(codigoProduto);

      this.repository.getFotoID(codigoProduto)
    .then(
      fotosProduto => this.fotosProduto = fotosProduto
      ); 
    }
    this.iniciarFormulario();
    
  }
  
  public iniciarFormulario() {
      
    this.formulario = this.fb.group({
      id: [null],
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      tipo: ['', Validators.required],
      preco: ['', Validators.required],    
      quantidade: [''],
      dataColheita: ['']
    });
  }

  cadastrar() {
    if (this.formulario.invalid) {
      console.log(this.formulario);
      return;
    }
    this.salvar();
  };

  salvar() {
   
    const dados = {

      id: this.formulario.value.id,
      nome: this.formulario.value.nome,
      tipo: this.formulario.value.tipo,      
      preco: this.formulario.value.preco,
      quantidade: this.formulario.value.quantidade,      
      dataColheita: this.formulario.value.dataColheita,
      cliente: this.idCliente

    } as ProdutoModel;

    if (dados.id) {
        this.repository.putproduto(dados).subscribe(resposta => { 
        /* this.limparFormulario(); */
        this.formulario.reset();
        this.messageService.add(
          {
            key: 'toast',
            severity: 'success',
            summary: 'PRODUTO',
            detail: 'Atualizado com sucesso!'
          });
          this.carregarProduto(dados.id);
      });
    } else {
        this.repository.postProduto(dados).subscribe(resposta => {

          this.idProduto = resposta.id;

          for (let i=0; i < this.uploadedFiles.length; i++){

          const formData: any = new FormData();

            
            formData.set('produto', this.idProduto);
            formData.append('imagem', this.uploadedFiles[i]); 
            /* console.log(formData); */
            /* console.log(this.uploadedFiles[i]) */

            this.repository.postImagem(formData).subscribe(resposta => {
             /*  this.messageService.add(
                {
                  key: 'toast',
                  severity: 'success',
                  summary: 'IMAGEM',
                  detail: 'cadastrada com sucesso!'
                }); */
            });

          }
          this.messageService.add(
            {
              key: 'toast',
              severity: 'success',
              summary: 'PRODUTO',
              detail: 'cadastrado com sucesso!'
            });

        this.limparFormulario();     
      });
    }
  }

  limparFormulario() {
    this.uploadedFiles = [];
    this.formulario.reset();
    (this.upload as any).clear();    
  }

  enviarImagem(evento){
    /* this.uploadedFiles = []; */
    
    for(let file of evento.files) {
      this.uploadedFiles.push(file);
    }    
    
  }
  carregarProduto(codigoProduto: number){
    this.repository.getProdutoID(codigoProduto).subscribe(resp => {
      this.formulario.controls.id.setValue(resp.id);
      this.formulario.controls.nome.setValue(resp.nome);
      this.formulario.controls.tipo.setValue(resp.tipo);
      this.formulario.controls.preco.setValue(resp.preco);
      this.formulario.controls.quantidade.setValue(resp.quantidade);
      this.formulario.controls.dataColheita.setValue(resp.dataColheita);    
    })
  }
  
  showBasicDialog() {
    this.displayBasic = true;
  }
  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }

  get exibirRodape(){
    return this.router.url == '/area-logada/area-produto/cadastra-produto';
  }
  
}
