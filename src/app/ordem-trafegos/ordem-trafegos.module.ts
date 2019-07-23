
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
import { CalendarModule } from 'primeng/calendar';
import {FieldsetModule} from 'primeng/fieldset';
import {KeyFilterModule} from 'primeng/keyfilter';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {CardModule} from 'primeng/card';
import {AccordionModule} from 'primeng/accordion';

import { OrdemCadastroComponent } from './ordem-cadastro/ordem-cadastro.component';
import { OrdensPesquisaComponent } from './ordens-pesquisa/ordens-pesquisa.component';
import { SharedModule } from '../shared/shared.module';
import { OrdemCadastroRotaComponent } from './ordem-cadastro-rota/ordem-cadastro-rota.component';
import { OrdemTrafegosRoutingModule } from './ordem-trafegos-routing.module';
import { OrdensRelatoriosComponent } from './ordens-relatorios/ordens-relatorios.component';

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
    KeyFilterModule,
    FieldsetModule,
    AutoCompleteModule,
    ToggleButtonModule,
    CardModule,
    AccordionModule,

    SharedModule,

    OrdemTrafegosRoutingModule
  ],
  declarations: [OrdemCadastroComponent, OrdensPesquisaComponent, OrdemCadastroRotaComponent, OrdensRelatoriosComponent]
})
export class OrdemTrafegosModule { }
