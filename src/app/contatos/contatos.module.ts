
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



import { ContatoCadastroComponent } from './contato-cadastro/contato-cadastro.component';
import { ContatosPesquisaComponent } from './contatos-pesquisa/contatos-pesquisa.component';
import { SharedModule } from '../shared/shared.module';
import { ContatosPesquisaTelefonesComponent } from './contatos-pesquisa-telefones/contatos-pesquisa-telefones.component';
import { ContatosRoutingModule } from './contatos-routing.module';
import { ContatoCadastroTelefoneComponent } from './contato-cadastro-telefone/contato-cadastro-telefone.component';

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
    ContatosRoutingModule
  ],
  declarations: [
    ContatoCadastroComponent,
    ContatosPesquisaComponent,
    ContatoCadastroTelefoneComponent,
    ContatosPesquisaTelefonesComponent

  ],
  exports: [

  ]
})
export class ContatosModule { }
