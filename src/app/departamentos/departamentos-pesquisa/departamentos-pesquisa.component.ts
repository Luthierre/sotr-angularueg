import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from './../../core/error-handler.service';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { AuthService } from './../../seguranca/auth.service';
import { DepartamentoFiltro, Departamento } from './../../core/model';
import { DepartamentoService } from './../departamento.service';

@Component({
  selector: 'app-departamentos-pesquisa',
  templateUrl: './departamentos-pesquisa.component.html',
  styleUrls: ['./departamentos-pesquisa.component.css']
})
export class DepartamentosPesquisaComponent implements OnInit {

  departamentos: Array<Departamento>;
  filtro = new DepartamentoFiltro();
  totalRegistros = 0;
  @ViewChild('tabela') grid;

  constructor(
    private departamentoService: DepartamentoService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    public auth: AuthService
  ) { }
  ngOnInit() {
    this.title.setTitle('Pesquisa de departamentos');
    
    this.pesquisar();
  }

  pesquisar(pagina = 0) {    
    this.filtro.pagina = pagina;
        this.departamentoService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.departamentos = resultado.departamentos;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(departamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(departamento);
      }
    });
  }

  excluir(departamento: any) {
    this.departamentoService.excluir(departamento.codigo)
    .then(() => {
      if (this.grid.first === 0) {
        this.pesquisar();
      } else {
        this.grid.first = 0;
        this.pesquisar();
      }
      this.toasty.success('Departamento excluído com sucesso!');
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
