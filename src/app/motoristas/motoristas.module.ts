import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule} from 'primeng/dropdown';
import { PanelModule} from 'primeng/panel';
import {DialogModule } from 'primeng/dialog';
import {InputTextareaModule } from 'primeng/inputtextarea';
import {InputMaskModule } from 'primeng/inputmask';
import { TooltipModule } from 'primeng/tooltip';
import {CalendarModule} from 'primeng/calendar';
import {AutoCompleteModule} from 'primeng/autocomplete';


import { CpfCnpjModule } from 'ng2-cpf-cnpj';

import { MotoristasRoutingModule } from './motoristas-routing.module';
import { CondutoresPesquisaComponent } from './condutores-pesquisa/condutores-pesquisa.component';
import { CondutorCadastroComponent } from './condutor-cadastro/condutor-cadastro.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    PanelModule,
    DialogModule,
    InputTextareaModule,
    InputMaskModule,
    TooltipModule,
    CalendarModule,
    AutoCompleteModule, 

    
    CpfCnpjModule,


    SharedModule,
    MotoristasRoutingModule
  ],
  declarations: [CondutoresPesquisaComponent, CondutorCadastroComponent]
})
export class MotoristasModule { }
