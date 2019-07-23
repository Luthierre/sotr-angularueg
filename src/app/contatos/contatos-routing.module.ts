import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ContatosPesquisaComponent } from './contatos-pesquisa/contatos-pesquisa.component';
import { ContatoCadastroComponent } from './contato-cadastro/contato-cadastro.component';
import { AuthGuard } from './../seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'contatos',
    component: ContatosPesquisaComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_PESQUISAR_CONTATO']}
  },
  {
    path: 'contatos/novo',
    component: ContatoCadastroComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_CADASTRAR_CONTATO']}
  },
  {
    path: 'contatos/:codigo',
    component: ContatoCadastroComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_CADASTRAR_CONTATO']}
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ContatosRoutingModule {}
