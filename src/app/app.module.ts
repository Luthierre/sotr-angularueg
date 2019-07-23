import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';

import {ConfirmationService} from 'primeng/api';

import { AppComponent } from './app.component';
import { CampusModule } from './campus/campus.module';

import { ContatosModule } from './contatos/contatos.module';

import { CoreModule } from './core/core.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { DepartamentosModule } from './departamentos/departamentos.module';
import { InicioModule } from './inicio/inicio.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { SharedModule } from './shared/shared.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { VeiculoModule } from './veiculos/veiculo.module';
import { MotoristasModule } from './motoristas/motoristas.module';
import { OrdemTrafegosModule } from './ordem-trafegos/ordem-trafegos.module';
import { AppRoutingModule } from './app-routing.module';




@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,


    CampusModule,
    ContatosModule,
    CoreModule,
    DashboardModule,
    DepartamentosModule,
    InicioModule,
    OrdemTrafegosModule,
    SegurancaModule,
    SharedModule,
    UsuariosModule,
    VeiculoModule,
    MotoristasModule,
    AppRoutingModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
