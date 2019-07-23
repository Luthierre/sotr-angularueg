import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VeiculosPesquisaComponent } from './veiculos-pesquisa/veiculos-pesquisa.component';
import { VeiculoCadastroComponent } from './veiculo-cadastro/veiculo-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'veiculos',
    component: VeiculosPesquisaComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_PESQUISAR_VEICULOS_CONDUTOR']}
  },
  {
    path: 'veiculos/novo',
    component: VeiculoCadastroComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_CADASTRAR_VEICULOS_CONDUTOR']}
  },
  {
    path: 'veiculos/:codigo',
    component: VeiculoCadastroComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_CADASTRAR_VEICULOS_CONDUTOR']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VeiculoRoutingModule { }
