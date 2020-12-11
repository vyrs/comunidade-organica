import { NgModule } from '@angular/core';



import { PainelProdutoComponent } from './../produto/painel-produto/painel-produto.component';
import { PainelHomeComponent } from './../painel-home/painel-home.component';

import { Routes, RouterModule } from '@angular/router';

import { HomeResolverService } from './../painel-home/home-resolver.service';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: PainelHomeComponent,
          children: [
            { path: 'painel-produto', component: PainelProdutoComponent,
            resolve: { imagem: HomeResolverService },}
          ]
  },
  /* { path: 'cadastro', component: PainelCadastroComponent }, */
 /*  { path: 'area-logada', 
        component: PainelAreaLogadaComponent,
        children: [
          { path: 'perfil', component: PainelPerfilComponent },
          { path: 'dashboard', component: PainelDashboardComponent },
          { path: 'area-produto',
           component: AreaProdutoComponent,
           children: [
            { path: 'cadastra-produto', component: PainelCadastroProdutoComponent },
            { path: 'area-meus-anuncios', component: AreaMeusAnunciosComponent  }  
           ]}          
        ] }, */
  /* { path: 'login', component: PainelLoginComponent }, */
  
 /*  { path: 'comprar/:id', component: PainelComprarComponent,
  resolve: { produto: ProdutoResolverService }  
  }, */
 /*  { path: 'carrinho', component: CarrinhoComponent}, */
  
  
   
   
  
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProdutoRountingModule { }
