import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { InputTextModule} from 'primeng/inputtext';
import { ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';


import { DepartamentosPesquisaComponent } from './departamentos-pesquisa/departamentos-pesquisa.component';
import { DepartamentoCadastroComponent } from './departamento-cadastro/departamento-cadastro.component';
import { SharedModule } from '../shared/shared.module';
import { DepartamentosRoutingModule } from './departamentos-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,



    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,

    SharedModule,
    DepartamentosRoutingModule
  ],
  declarations: [
    DepartamentoCadastroComponent,
    DepartamentosPesquisaComponent
  ],
  exports: [

  ]
})
export class DepartamentosModule { }
