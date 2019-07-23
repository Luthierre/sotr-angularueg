import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastyService } from 'ng2-toasty';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { ContatoFiltro, Contato, Telefones } from './../../core/model';
import { ContatoService } from './../contato.service';
import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-contatos-pesquisa',
  templateUrl: './contatos-pesquisa.component.html',
  styleUrls: ['./contatos-pesquisa.component.css']
})
export class ContatosPesquisaComponent implements OnInit {

  @ViewChild('tabela') grid;
  exibirDialogTelefones = false;
  filtro = new  ContatoFiltro();
  totalRegistros = 0;
  contatos: Array<Contato>;
  telefones: any[];
  contato = new Contato();

  constructor(
    private contatoService: ContatoService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    public auth: AuthService
  ) { }

  ngOnInit() {
      this.title.setTitle('Pesquisa de contatos');
  }
  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.contatoService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.contatos = resultado.contatos;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  prepararDialogTelefones(contato: any) {
    this.contato = contato.nome;
    this.exibirDialogTelefones = true;
    this.contatoService.buscarTelefones(contato.codigo)
    .then(telefones => {
      this.telefones = telefones;
    });
  }
  confirmarExclusao(contato: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(contato);
      }
    });
  }
  excluir(contato: any) {
    this.contatoService.excluir(contato.codigo)
    .then(() => {
      if (this.grid.first === 0) {
        this.pesquisar();
      } else {
        this.grid.first = 0;
        this.pesquisar();
      }
      this.toasty.success('Contato excluído com sucesso!');
    })
    .catch(erro => this.errorHandler.handle(erro));
  }


}
