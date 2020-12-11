import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { ConfirmationService, MessageService } from 'primeng/api';
import { InterceptorService } from './services/interceptor.service';


import { NavBarComponent } from './template/nav-bar/nav-bar.component';
import { PainelHomeComponent } from './painel-home/painel-home.component';
import { PainelCadastroComponent } from './cliente/painel-cadastro/painel-cadastro.component';
import { NavAuxComponent } from './template/nav-aux/nav-aux.component';

import { ProdutoModule } from './produto/produto.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ClienteModule } from './cliente/cliente.module';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { NgxSpinnerModule } from "ngx-spinner";
import { InputMaskModule } from 'primeng/inputmask';
/* import { CurrencyMaskModule } from "ng2-currency-mask"; */









@NgModule({
  declarations: [
    AppComponent,    
    PainelHomeComponent,
    PainelCadastroComponent,
    NavBarComponent,
    NavAuxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    HttpClientModule,
    FormsModule,  
    DropdownModule,
    ReactiveFormsModule,    
    ClienteModule,
    SegurancaModule,
    ToastModule,
    ConfirmDialogModule,
    CalendarModule,
    /* CurrencyMaskModule, */
    ProdutoModule,
    NgxSpinnerModule,
    InputMaskModule

  ],
  providers: [
    MessageService,
    Title,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
    /* ProdutoResolverService , */
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
