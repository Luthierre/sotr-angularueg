import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { AuthService } from './../../seguranca/auth.service';
import { Permissao, Usuario } from './../../core/model';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { UsuarioService } from './../usuario.service';
import { CampusService } from '../../campus/campus.service';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

  campus = [];
  colunas: any[];
  propriedade1: string;
  propriedade2: string;
  exibirFormularioSenhas = false;
  usuario = new Usuario();
  permissoes: Array<Permissao>;


  constructor(
    private campusService: CampusService,
    private usuarioService: UsuarioService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle('Novo usuário');
    this.colunas = [
      { field: 'descricao', header: 'Descrição'}
  ];
  this.carregarTodasPermissoes();
  const codigo = this.route.snapshot.params['codigo'];
    if (codigo) {
      this.carregarUsuario(codigo);
    }
  }
  carregarTodasPermissoes() {
    this.usuarioService.listarTodos()
    .then(response => {
      this.permissoes = response;

    });
  }
  get editando() {
    return Boolean(this.usuario.codigo);
  }
  carregarUsuario(codigo: number) {
    this.usuarioService.buscarPorCodigo(codigo)
    .then(retorno => {
      this.usuario = retorno;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
  pesquisaCampus(event) {
    this.campusService.pesquisarCampusNome(event.query).then(data => {
        this.campus = data;
    });
  }
  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarUsuario(form);
    } else {
      this.adicionarUsuario(form);
    }
  }
  prepararFormularioSenha() {
    this.exibirFormularioSenhas = true;
    this.propriedade1 = '';
    this.propriedade2 = '';
  }
  confirmarSenhas(senha: string, senha2: string) {
    if (senha === senha2) {
      this.usuario.senha = senha2;
      this.toasty.success('Senhas são iguais!');
      this.exibirFormularioSenhas = false;
    } else {
      this.toasty.error('Senhas não coicidem!');
    }
  }
  adicionarUsuario(form: FormControl) {
    this.usuarioService.adicionar(this.usuario)
      .then(() => {
        this.toasty.success('Usuario adicionado com sucesso!');

        form.reset();
        this.usuario = new Usuario();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarUsuario(form: FormControl) {
    this.usuarioService.atualizar(this.usuario)
      .then(usuario => {
        this.usuario = usuario;
        this.toasty.success('Usuário alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.usuario = new Usuario();
    }.bind(this), 1);
    this.router.navigate(['/usuarios/novo']);
  }
  atualizarTituloEdicao() {
    this.title.setTitle(`Edição do departamento:  ${this.usuario.nome}`);
  }


}
