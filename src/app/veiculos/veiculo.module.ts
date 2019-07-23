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
import {AutoCompleteModule} from 'primeng/autocomplete';

import { VeiculoRoutingModule } from './veiculo-routing.module';
import { VeiculosPesquisaComponent } from './veiculos-pesquisa/veiculos-pesquisa.component';
import { VeiculoCadastroComponent } from './veiculo-cadastro/veiculo-cadastro.component';
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
    AutoCompleteModule,

    SharedModule,

    VeiculoRoutingModule
  ],
  declarations: [VeiculosPesquisaComponent, VeiculoCadastroComponent]
})
export class VeiculoModule { }
