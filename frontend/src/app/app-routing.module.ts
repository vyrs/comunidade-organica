import { NgModule, Component } from '@angular/core';


import { HomeResolverService } from './painel-home/home-resolver.service';
import { PainelProdutoComponent } from './produto/painel-produto/painel-produto.component';
import { PainelHomeComponent } from './painel-home/painel-home.component';
import { PainelCadastroComponent } from './cliente/painel-cadastro/painel-cadastro.component';
import { PainelLoginComponent } from './seguranca/painel-login/painel-login.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: PainelHomeComponent,
          children: [
            { path: 'painel-produto', component: PainelProdutoComponent,
            resolve: { imagem: HomeResolverService },}
          ]
  },
  { path: 'cadastro', component: PainelCadastroComponent },

  { path: 'login', component: PainelLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
