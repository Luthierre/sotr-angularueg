import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/components/common/api';

import { AuthService } from './../../seguranca/auth.service';
import { UsuarioFiltro, Usuario } from '../../core/model';
import { UsuarioService } from '../usuario.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-usuarios-pesquisa',
  templateUrl: './usuarios-pesquisa.component.html',
  styleUrls: ['./usuarios-pesquisa.component.css']
})
export class UsuariosPesquisaComponent implements OnInit {

  exibindoPermissoesUsuario = false;
  usuario = new Usuario();
  usuarios: Array<Usuario>;
  filtro = new UsuarioFiltro();
  totalRegistros = 0;
  @ViewChild('tabela') grid;

  constructor(
    private usuarioService: UsuarioService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    public auth: AuthService
  ) { }
  ngOnInit() {
    this.title.setTitle('Pesquisa de usuários');
    this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.usuarioService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.usuarios = resultado.usuarios;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(usuario: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(usuario);
      }
    });
  }

  excluir(usuario: any) {
    this.usuarioService.excluir(usuario.codigo)
    .then(() => {
      if (this.grid.first === 0) {
        this.pesquisar();
      } else {
        this.grid.first = 0;
        this.pesquisar();
      }
      this.toasty.success('Usuário excluído com sucesso!');
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
  prepararDialogPermissoes(usuario: any) {
    this.exibindoPermissoesUsuario = true;
    this.usuario = usuario;
  }

}
