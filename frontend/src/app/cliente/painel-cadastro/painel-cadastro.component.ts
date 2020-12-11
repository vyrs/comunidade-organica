import { map } from 'rxjs/operators';
import { ClienteModel } from '../../cliente/model/cliente-model';
import { ClienteRepository } from '../../cliente/repository/cliente-repository';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';

/* import { FormsModule } from '@angular/forms'; */




@Component({
  selector: 'app-painel-cadastro',
  templateUrl: './painel-cadastro.component.html',
  styleUrls: ['./painel-cadastro.component.css'],
  
})
export class PainelCadastroComponent implements OnInit {

  estados: any[] = [];
  cidades: any[] = [];
  public formulario: FormGroup;
  operacao: boolean = true;

  public submitted: boolean = false;

  mensagem: Message[] = [];

  constructor(private repository: ClienteRepository,
    private fb: FormBuilder,private messageService: MessageService) { }

    ngOnInit(): void {
      this.iniciarFormulario();
      
      this.repository.getAllEstados().subscribe(resposta => {      
        this.estados.push({ label: resposta.nome, value: resposta.id });        
      });
    }
  
    public iniciarFormulario() {
      
      this.formulario = this.fb.group({
        id: [null],
        nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
        sobrenome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
        telefone: ['', Validators.required],
      /*   dataNasc: [''],
        cpf: [''],
        rg: [''], */
        email: [''],
        cep: ['', Validators.required],
        logradouro: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
        numero: [''],
        complemento: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
        bairro: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
        cidade: [''],
        estado: [''],
        senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      });
  
      // this.formulario.controls.id.setValue('');
     // this.formulario.controls.nome.setValue('Rafael');
     // this.formulario.controls.sobrenome.setValue('Lopes');    
    }
  
    cadastrar() {
      if (this.formulario.invalid) {
        return;
      }
      this.salvar();
    };
  
    salvar() {
      // const listaTelefones = [];
      // this.formulario.value.telefones.forEach(element => {
      //   listaTelefones.push({
      //     id:null,numero:element,tipo:'casa'
      //   })
      // });
      
      const dados = {
  
        id: this.formulario.value.id,
        nome: this.formulario.value.nome,
        sobrenome: this.formulario.value.sobrenome,        
        telefone: [{
          id: null,
          telefone: this.formulario.value.telefone,
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
        senha: this.formulario.value.senha
  
      } as ClienteModel;
  
      if (dados.id) {
          this.repository.putCliente(dados).subscribe(resposta => {
          this.limparFormulario();
        });
      } else {
          this.repository.postCliente(dados).subscribe(resposta => {
            this.messageService.add(
              {
                key: 'toast',
                severity: 'success',
                summary: 'CLIENTE',
                detail: 'cadastrado com sucesso!'
              });        
          this.limparFormulario();     
        },
        (e) => {
          var msg: any[] = [];
          //Erro Principal
          console.log(e.objects)
          this.messageService.add(
            {
              key: 'toast',
              severity: 'warn',
              summary: 'CLIENTE',
              detail: 'não cadastrado!'
            });
          //Erro de cada atributo
          var erros = e.error.objects;
          erros.forEach(function (elemento) {
            msg.push(
              {
                key: 'toast',
                severity: 'error',
                summary: 'ERRO',
                detail: elemento.userMessage
              });
          });
          this.messageService.addAll(msg);
         }
        );
      }
    }
  
    limparFormulario() {
      this.formulario.reset();
    }
  
    listarCidades() {
      this.cidades = [];
      let id: number = this.formulario.value.estado;
      this.repository.getAllCidadesByEstado(id).subscribe(resposta => {
        this.cidades.push({ label: resposta.nome, value: resposta.id });
      });
    }
}
