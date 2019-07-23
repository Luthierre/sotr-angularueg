import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';

import { Campus, CampusFiltro } from './../../core/model';
import { CampusService } from '../campus.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { AuthService } from '../../seguranca/auth.service';

@Component({
  selector: 'app-campus-pesquisa',
  templateUrl: './campus-pesquisa.component.html',
  styleUrls: ['./campus-pesquisa.component.css']
})
export class CampusPesquisaComponent implements OnInit {

  campus: Array<Campus>;
  filtro = new CampusFiltro();
  totalRegistros = 0;
  @ViewChild('tabela') grid;

  constructor(
    private campusService: CampusService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    public auth: AuthService
  ) { }
  ngOnInit() {
    this.title.setTitle('Pesquisa de campus');
    this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.campusService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.campus = resultado.campus;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  
}
