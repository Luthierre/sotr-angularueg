import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/components/common/api';

import { OrdemTrafegoFiltro } from '../../core/model';
import { OrdemService } from '../ordem.service';
import { AuthService } from '../../seguranca/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { RelatoriosService } from '../../core/relatorios.service';

@Component({
  selector: 'app-ordens-pesquisa',
  templateUrl: './ordens-pesquisa.component.html',
  styleUrls: ['./ordens-pesquisa.component.css']
})
export class OrdensPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new OrdemTrafegoFiltro();
  ordens = [];
  @ViewChild('tabela') grid;

  constructor(
    private ordemService: OrdemService,
    private relatorioService: RelatoriosService,
    public auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa das ordens de tráfego');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.ordemService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.ordens = resultado.ordens;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  prepararRelatorioOrdem(codigo: number) {
    this.relatorioService.relatorioOrdem(codigo)
    .then(relatorio => {
      const url = window.URL.createObjectURL(relatorio);
      window.open(url);
      }
    ).catch(erro => this.errorHandler.handle(erro));
  }
  confirmarExclusao(ordem: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(ordem);
      }
    });
  }

  excluir(ordem: any) {
    this.ordemService.excluir(ordem.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toasty.success('Ordem de tráfego excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  alternarStatus(ordem: any, event: any): void {    
    console.log(event.checked);
    
    const novoStatus = event.checked;

    this.ordemService.mudarStatus(ordem.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'Ativada' : 'Inativada';

        
        this.toasty.success(`Ordem ${acao} com sucesso!`);
        
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
