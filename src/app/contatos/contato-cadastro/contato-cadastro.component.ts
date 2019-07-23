import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { Title } from '@angular/platform-browser';
import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { DepartamentoService } from './../../departamentos/departamento.service';
import { TipoTelefoneString, TipoTelefone, Contato } from '../../core/model';
import { ContatoService } from '../contato.service';
import { AuthService } from '../../seguranca/auth.service';

@Component({
  selector: 'app-contato-cadastro',
  templateUrl: './contato-cadastro.component.html',
  styleUrls: ['./contato-cadastro.component.css']
})
export class ContatoCadastroComponent implements OnInit {


  departamentos = [];
  tipos = [];
  contato = new Contato();
  constructor(
    private departamentoService: DepartamentoService,
    private contatoService: ContatoService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    public auth: AuthService
  ) {

   }

  ngOnInit() {
    this.title.setTitle('Novo contato');
    const codigo = this.route.snapshot.params['codigo'];    
    if (codigo) {
      this.carregarContato(codigo);
    }
  }
  pesquisaDepartamentos(event) {
    this.departamentoService.pesquisarDepartamentoDescricao(event.query).then(data => {
        this.departamentos = data;
    });
  }
  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarContato(form);
    } else {
      this.adicionarContato(form);
    }

  }
  
  carregarContato(codigo: number) {
    this.contatoService.buscarPorCodigo(codigo)
    .then(retorno => {
      this.contato = retorno;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
  get editando() {
    return Boolean(this.contato.codigo);
  }

  adicionarContato(form: FormControl) {
    this.contatoService.adicionar(this.contato)
    .then(() => {
      this.toasty.success('Contato adicionado com sucesso!');

      form.reset();
      this.contato = new Contato();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarContato(form: FormControl) {
    this.contatoService.atualizar(this.contato)
      .then(contato => {
        this.contato = contato;
        this.toasty.success('Contato alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.contato = new Contato();
    }.bind(this), 1);
    this.router.navigate(['/contatos/novo']);
  }
  atualizarTituloEdicao() {
    this.title.setTitle(`Edição do contato:  ${this.contato.nome}`);
  }
}
