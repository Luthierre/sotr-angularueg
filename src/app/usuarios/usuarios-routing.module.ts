import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { UsuariosPesquisaComponent } from './usuarios-pesquisa/usuarios-pesquisa.component';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuariosPesquisaComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_PESQUISAR_USUARIO']}
  },
  {
    path: 'usuarios/novo',
    component: UsuarioCadastroComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_CADASTRAR_USUARIO']}
  },
  {
    path: 'usuarios/:codigo',
    component: UsuarioCadastroComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_CADASTRAR_USUARIO']}
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
export class UsuariosRoutingModule {}
