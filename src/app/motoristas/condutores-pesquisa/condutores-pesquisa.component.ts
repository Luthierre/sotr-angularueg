import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/components/common/api';

import { CondutorFiltro } from '../../core/model';
import { CondutorService } from '../condutor.service';
import { AuthService } from '../../seguranca/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { LocaleService } from '../../core/locale.service';

@Component({
  selector: 'app-condutores-pesquisa',
  templateUrl: './condutores-pesquisa.component.html',
  styleUrls: ['./condutores-pesquisa.component.css']
})
export class CondutoresPesquisaComponent implements OnInit {

  pt: any;
  totalRegistros = 0;
  filtro = new CondutorFiltro();
  condutores = [];
  @ViewChild('tabela') grid;

  constructor(
    private localeService: LocaleService,
    private condutorService: CondutorService,
    public auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit() {
    this.pt = this.localeService.configurarLocale();
    this.title.setTitle('Pesquisa de motoristas');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.condutorService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.condutores = resultado.condutores;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(condutor: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(condutor);
      }
    });
  }

  excluir(condutor: any) {
    this.condutorService.excluir(condutor.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toasty.success('Condutor excluído com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
