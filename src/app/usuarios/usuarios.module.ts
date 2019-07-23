import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PanelModule} from 'primeng/panel';
import { TooltipModule } from 'primeng/tooltip';
import {PasswordModule} from 'primeng/password';
import { DialogModule } from 'primeng/dialog';
import {AutoCompleteModule} from 'primeng/autocomplete';

import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuariosPesquisaComponent } from './usuarios-pesquisa/usuarios-pesquisa.component';
import { SharedModule } from './../shared/shared.module';
import { UsuariosRoutingModule } from './usuarios-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,


    InputTextModule,
    ButtonModule,
    TableModule,
    PanelModule,
    TooltipModule,
    DialogModule,
    PasswordModule,
    AutoCompleteModule, 

    SharedModule,
    UsuariosRoutingModule

  ],
  declarations: [UsuarioCadastroComponent, UsuariosPesquisaComponent]
  ,
  exports: []
})
export class UsuariosModule { }
