import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ConfirmationService, LazyLoadEvent } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { VeiculoFiltro, Veiculo } from '../../core/model';
import { VeiculoService } from '../veiculo.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { AuthService } from '../../seguranca/auth.service';

@Component({
  selector: 'app-veiculos-pesquisa',
  templateUrl: './veiculos-pesquisa.component.html',
  styleUrls: ['./veiculos-pesquisa.component.css']
})
export class VeiculosPesquisaComponent implements OnInit {


  @ViewChild('tabela') grid;
  exibirDialogTelefones = false;
  filtro = new  VeiculoFiltro();
  totalRegistros = 0;
  veiculos: Array<Veiculo>;
  telefones: any[];
  veiculo = new Veiculo();

  constructor(
    private contatoService: VeiculoService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    public auth: AuthService
  ) { }

  ngOnInit() {
      this.title.setTitle('Pesquisa de veiculos');
  }
  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.contatoService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.veiculos = resultado.veiculos;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }


  confirmarExclusao(veiculo: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(veiculo);
      }
    });
  }
  excluir(veiculo: any) {
    this.contatoService.excluir(veiculo.codigo)
    .then(() => {
      if (this.grid.first === 0) {
        this.pesquisar();
      } else {
        this.grid.first = 0;
        this.pesquisar();
      }
      this.toasty.success('Veiculo excluído com sucesso!');
    })
    .catch(erro => this.errorHandler.handle(erro));
  }


}
