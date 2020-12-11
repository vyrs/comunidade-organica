import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PainelComprarComponent } from './painel-comprar/painel-comprar.component';
import { PainelProdutoComponent } from './painel-produto/painel-produto.component';
import { PainelCadastroProdutoComponent } from './painel-cadastro-produto/painel-cadastro-produto.component';
import { AreaMeusAnunciosComponent } from './area-meus-anuncios/area-meus-anuncios.component';
import { ConfirmaDeleteProdutoComponent } from '../produto/confirma-delete-produto/confirma-delete-produto.component';
import { AreaProdutoComponent } from './area-produto/area-produto.component';
import { AtualizarFotosComponent } from './atualizar-fotos/atualizar-fotos.component';


import { ProdutoRountingModule } from './produto-rounting.module';
import { DataViewModule } from 'primeng/dataview';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CarouselModule } from 'primeng/carousel';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { FileUploadModule } from 'primeng/fileupload';




@NgModule({
  declarations: [
    PainelProdutoComponent,
    PainelComprarComponent,
    PainelCadastroProdutoComponent,
    AreaMeusAnunciosComponent,
    ConfirmaDeleteProdutoComponent,
    AreaProdutoComponent,
    AtualizarFotosComponent
  ],
  imports: [
    CommonModule,
    ProdutoRountingModule,
    DataViewModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    DialogModule,
    ConfirmDialogModule,
    InputNumberModule,   
    InputMaskModule,
    CarouselModule,
    MessagesModule,
    MessageModule,
    FileUploadModule,

  ],
  providers: [
    
  ],
})
export class ProdutoModule { }
