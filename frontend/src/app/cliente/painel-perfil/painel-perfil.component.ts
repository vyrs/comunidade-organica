import { Component, OnInit } from '@angular/core';

import { ClienteModel } from './../model/cliente-model';
import { ClienteRepository } from './../repository/cliente-repository';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from './../../seguranca/auth.service';
import { Message, MessageService } from 'primeng/api';


@Component({
  selector: 'app-painel-perfil',
  templateUrl: './painel-perfil.component.html',
  styleUrls: ['./painel-perfil.component.css']
})
export class PainelPerfilComponent implements OnInit {
  
  public formulario: FormGroup;

  operacao: boolean = true;

  estados: any[] = [];
  cidades: any[] = [];
  idTelefone: number;

  public submitted: boolean = false;
  

  constructor(
    private repository: ClienteRepository,   
    private fb: FormBuilder,    
    private auth: AuthService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {

    this.iniciarFormulario();
    this.listarEstados();
  

    this.carregarCliente(this.auth.pegaIdUser); 
  }
  

  carregarCliente(codigoCliente: number){

    this.repository.getClienteById(codigoCliente).subscribe(resposta => {
      
      this.formulario.controls.id.setValue(resposta.id);
      this.formulario.controls.nome.setValue(resposta.nome);
      this.formulario.controls.sobrenome.setValue(resposta.sobrenome);
      
      this.formulario.controls.telefones.setValue(resposta.telefone[0].telefone);
      
      /* this.formulario.controls.dataNasc.setValue(resposta.dataNasc);
      this.formulario.controls.cpf.setValue(resposta.cpf);
      this.formulario.controls.rg.setValue(resposta.rg); */

      this.formulario.controls.email.setValue(resposta.email);
      this.formulario.controls.cep.setValue(resposta.endereco.cep);
      this.formulario.controls.logradouro.setValue(resposta.endereco.logradouro);
      this.formulario.controls.numero.setValue(resposta.endereco.numero);
      this.formulario.controls.complemento.setValue(resposta.endereco.complemento);      
      this.formulario.controls.bairro.setValue(resposta.endereco.bairro);
      
      this.formulario.controls.estado.setValue(resposta.endereco.cidade.estado.id);

      this.listarCidadeSelecionada(resposta.endereco.cidade.id);         
      
      this.idTelefone = resposta.telefone[0].id;
      /* this.atualizarTituloEdicao(); */ 
    });    
  }

  listarEstados() {
    this.repository.getAllEstados().subscribe(resposta => {
      this.estados.push({ label: resposta.nome, value: resposta.id });
    });
  }

  listarCidades() {
    this.cidades = [];
    let id: number = this.formulario.value.estado;
    
    this.repository.getAllCidadesByEstado(id).subscribe(resposta => {
      this.cidades.push({ label: resposta.nome, value: resposta.id });
    });
  }

  listarCidadeSelecionada(idCidade: number){
    this.cidades = [];
    let id: number = this.formulario.value.estado;
    this.repository.getAllCidadesByEstado(id).subscribe(resposta => {
      this.cidades.push({ label: resposta.nome, value: resposta.id });  
      this.formulario.controls.cidade.setValue(idCidade);    
    });    
  }

  public iniciarFormulario() {
    this.formulario = this.fb.group({
      id: [null],
      nome: [''],
      sobrenome: [''],
      telefones: [''],
      /* dataNasc: [''],
      cpf: [''],
      rg: [''], */
      email: [''],
      cep: [''],
      logradouro: [''],
      numero: [''],
      complemento: [''],
      bairro: [''],
      estado: [''],
      cidade: [''],
      
    });
   
  }

  atualizar(){
    this.submitted = true;
    const dados = {

      id: this.formulario.value.id,
      nome: this.formulario.value.nome,
      sobrenome: this.formulario.value.sobrenome,
      telefone: [{
        id: null,
        telefone: this.formulario.value.telefones,
        tipo: 'Casa'
      }],
     /*  dataNasc: this.formulario.value.dataNasc,
      cpf: this.formulario.value.cpf,
      rg: this.formulario.value.rg, */
      email: this.formulario.value.email,
      endereco: {
        cep: this.formulario.value.cep,
        logradouro: this.formulario.value.logradouro,
        numero: this.formulario.value.numero,
        complemento: this.formulario.value.complemento,
        bairro: this.formulario.value.bairro,
        cidade: {
          id: this.formulario.value.cidade
        }
      },

    } as ClienteModel;

    if (dados.id) {
      this.repository.putCliente(dados).subscribe(resposta => {
        this.messageService.add(
          {
            key: 'toast',
            severity: 'success',
            summary: 'CLIENTE',
            detail: 'atualizado com sucesso!'
          });        
        this.limparFormulario();
        this.carregarCliente(this.auth.pegaIdUser);
      },
      (e) => {
          var msg: any[] = [];
          //Erro Principal
          msg.push({
            severity: 'error',
            summary: 'ERRO',
            detail: e.error.userMessage
          });
          //Erro de cada atributo
          var erros = e.error.objects;
          erros.forEach(function (elemento) {
            msg.push(
              {
                severity: 'error',
                summary: 'ERRO',
                detail: elemento.userMessage
              });
          });
          this.messageService.addAll(msg);
    });   
    }
    
  }

  limparFormulario() {
    this.submitted = false;
    this.formulario.reset();
    this.cidades = [];
    this.estados = [];
    this.listarEstados();    
  }

}
