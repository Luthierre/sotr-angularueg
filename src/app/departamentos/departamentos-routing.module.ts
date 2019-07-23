import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DepartamentosPesquisaComponent } from './departamentos-pesquisa/departamentos-pesquisa.component';
import { DepartamentoCadastroComponent } from './departamento-cadastro/departamento-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';




const routes: Routes = [
  {
    path: 'departamentos',
    component: DepartamentosPesquisaComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_PESQUISAR_DEPARTAMENTO']}
  },
  {
    path: 'departamentos/novo',
    component: DepartamentoCadastroComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_CADASTRAR_DEPARTAMENTO']}
  },
  {
    path: 'departamentos/:codigo',
    component: DepartamentoCadastroComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_CADASTRAR_DEPARTAMENTO']}
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
export class DepartamentosRoutingModule {}
