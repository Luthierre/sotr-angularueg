import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../seguranca/auth.guard';
import { OrdemCadastroComponent } from './ordem-cadastro/ordem-cadastro.component';
import { OrdensPesquisaComponent } from './ordens-pesquisa/ordens-pesquisa.component';
import { OrdensRelatoriosComponent } from './ordens-relatorios/ordens-relatorios.component';

const routes: Routes = [
  
  {
    path: 'ordem-trafegos',
    component: OrdensPesquisaComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_PESQUISAR_ORDEM']}
  },
  {
    path: 'ordem-trafegos/relatorios',
    component: OrdensRelatoriosComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_PESQUISAR_ORDEM']}
  },
  {
    path: 'ordem-trafegos/novo',
    component: OrdemCadastroComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_CADASTRAR_ORDEM']}
  },
  {
    path: 'ordem-trafegos/:codigo',
    component: OrdemCadastroComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_CADASTRAR_ORDEM']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdemTrafegosRoutingModule { }
