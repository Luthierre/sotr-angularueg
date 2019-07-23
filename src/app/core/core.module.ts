
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';



import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/api';
import { TooltipModule } from 'primeng/tooltip';
import { ToastyModule } from 'ng2-toasty';
import { JwtHelper } from 'angular2-jwt';


import { VeiculoService } from './../veiculos/veiculo.service';
import { CampusService } from './../campus/campus.service';
import { AuthService } from './../seguranca/auth.service';
import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { DepartamentoService } from '../departamentos/departamento.service';
import { ContatoService } from '../contatos/contato.service';
import { CondutorService } from './../motoristas/condutor.service';
import { UsuarioService } from '../usuarios/usuario.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { OrdemService } from './../ordem-trafegos/ordem.service';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { RelatoriosService } from './relatorios.service';
import { LocaleService } from './locale.service';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    TooltipModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
    RouterModule,


  ],
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent, NaoAutorizadoComponent],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers: [
    ErrorHandlerService,
    DepartamentoService,
    ContatoService,

    OrdemService,
    UsuarioService,
    CampusService,
    VeiculoService,
    CondutorService,
    JwtHelper,
    RelatoriosService,
    LocaleService,

    ConfirmationService,
    AuthService,
    { provide: LOCALE_ID, useValue: 'pt'}

  ]
})

export class CoreModule { }
