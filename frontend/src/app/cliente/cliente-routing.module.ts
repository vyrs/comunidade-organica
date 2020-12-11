import { NgModule } from '@angular/core';


import { AreaMeusAnunciosComponent } from '../produto/area-meus-anuncios/area-meus-anuncios.component';
import { PainelCadastroProdutoComponent } from '../produto/painel-cadastro-produto/painel-cadastro-produto.component';
import { AreaProdutoComponent } from '../produto/area-produto/area-produto.component';
import { PainelDashboardComponent } from './painel-dashboard/painel-dashboard.component';
import { PainelPerfilComponent } from './painel-perfil/painel-perfil.component';
import { PainelAreaLogadaComponent } from '../cliente/painel-area-logada/painel-area-logada.component';
import { ConfirmaDeleteProdutoComponent } from '../produto/confirma-delete-produto/confirma-delete-produto.component';
import { PainelComprarComponent } from '../produto/painel-comprar/painel-comprar.component';
import { AtualizarFotosComponent } from '../produto/atualizar-fotos/atualizar-fotos.component';


import { MeusAnuncioResolverService } from '../produto/area-meus-anuncios/meus-anuncio-resolver.service';
import { ResolverService } from '../produto/confirma-delete-produto/resolver.service';
import { ProdutoResolverService } from '../produto/painel-comprar/produto-resolver.service';


import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../seguranca/auth.guard';

const routes: Routes = [
   { path: '', redirectTo: 'home', pathMatch: 'full'},
   { path: 'area-logada', 
        component: PainelAreaLogadaComponent,  
        canActivate: [AuthGuard],
        data: { roles: ['DH01'] }, 

        children: [

          { path: 'perfil', component: PainelPerfilComponent,
             canActivate: [AuthGuard],
             data: { roles: ['DH01'] },
           },

          { path: 'dashboard', component: PainelDashboardComponent},

          { path: 'area-produto',
           component: AreaProdutoComponent,
           canActivate: [AuthGuard],
           data: { roles: ['DH01'] },

           children: [          

            { path: 'cadastra-produto', component: PainelCadastroProdutoComponent,
                canActivate: [AuthGuard],
                data: { roles: ['DH01'] },
            },
            { path: 'cadastra-produto/:codigo', component: PainelCadastroProdutoComponent},

            { path: 'area-meus-anuncios', component: AreaMeusAnunciosComponent,
                      resolve: { imagem: MeusAnuncioResolverService}
            },
            
            { path: 'confirma-delete-produto/:id', component: ConfirmaDeleteProdutoComponent,
            resolve: { produto: ResolverService },
            canActivate: [AuthGuard],
            data: { roles: ['DH01'] },},

            { path: 'atualizar-fotos/:id', component: AtualizarFotosComponent }
            
           ]}          
        ],
        
       },
       { path: 'comprar/:id', component: PainelComprarComponent,
       resolve: { produto: ProdutoResolverService },
                canActivate: [AuthGuard],
                data: { roles: ['DH01'] },  
       },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
