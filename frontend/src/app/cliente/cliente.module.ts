import { NgModule } from '@angular/core';


import { PainelPerfilComponent } from './painel-perfil/painel-perfil.component';
import { PainelDashboardComponent } from './painel-dashboard/painel-dashboard.component';
import { PainelAreaLogadaComponent } from './../cliente/painel-area-logada/painel-area-logada.component';


import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ClienteRoutingModule } from '../cliente/cliente-routing.module';
import { ChartModule } from 'primeng/chart';



@NgModule({
  declarations: [
    PainelAreaLogadaComponent,
    PainelDashboardComponent,
    PainelPerfilComponent
  ],
  exports:[
    PainelAreaLogadaComponent,
    
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    BrowserAnimationsModule,
    InputMaskModule,
    FileUploadModule,
    ChartModule
    
  ],
  providers: [
    
  ],
})
export class ClienteModule { }
