import { CampusPesquisaComponent } from './campus-pesquisa/campus-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { CampusCadastroComponent } from './campus-cadastro/campus-cadastro.component';

const routes: Routes = [
  {
    path: 'campus',
    component: CampusPesquisaComponent
  },
  {
    path: 'campus/novo',
    component: CampusCadastroComponent
  },
  {
    path: 'campus/:codigo',
    component: CampusCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampusRoutingModule { }
