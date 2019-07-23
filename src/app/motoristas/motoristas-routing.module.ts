import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from '../seguranca/auth.guard';
import { CondutoresPesquisaComponent } from './condutores-pesquisa/condutores-pesquisa.component';
import { CondutorCadastroComponent } from './condutor-cadastro/condutor-cadastro.component';

const routes: Routes = [
  {
    path: 'motoristas',
    component: CondutoresPesquisaComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_PESQUISAR_VEICULOS_CONDUTOR']}
  },
  {
    path: 'motoristas/novo',
    component: CondutorCadastroComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_CADASTRAR_VEICULOS_CONDUTOR']}
  },
  {
    path: 'motoristas/:codigo',
    component: CondutorCadastroComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_CADASTRAR_VEICULOS_CONDUTOR']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotoristasRoutingModule { }
