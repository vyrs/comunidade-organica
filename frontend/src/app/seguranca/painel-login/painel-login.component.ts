import { AuthService } from '../auth.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-painel-login',
  templateUrl: './painel-login.component.html',
  styleUrls: ['./painel-login.component.css']
})
export class PainelLoginComponent implements OnInit {

  public formulario: FormGroup;

  constructor(
    private service: AuthService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.iniciarFormulario();
  }

  public iniciarFormulario() {
    this.formulario = this.fb.group({
      login: ['', Validators.required],
      senha: ['', [Validators.required]]     
    });       
  }

  logar() {
    if (this.formulario.invalid) {
      return;
    }
    //fazer a chamada
    const login = this.formulario.value.login;
    const senha = this.formulario.value.senha;

    this.service.login(login, senha);
    
    
  }

}
