
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { environment } from './../../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { PainelLoginComponent } from './painel-login/painel-login.component';


@NgModule({
  declarations: [PainelLoginComponent],
  imports: [
    CommonModule,
    SegurancaRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule           
  ],
  providers:[
    AuthService,
    AuthGuard,
  ]
})
export class SegurancaModule { }
