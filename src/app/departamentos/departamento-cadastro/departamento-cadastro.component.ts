import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ToastyService } from 'ng2-toasty';

import { DepartamentoService } from './../departamento.service';
import { Departamento } from './../../core/model';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-departamento-cadastro',
  templateUrl: './departamento-cadastro.component.html',
  styleUrls: ['./departamento-cadastro.component.css']
})
export class DepartamentoCadastroComponent implements OnInit {

  departamento = new Departamento();

  constructor(
    private departamentoService: DepartamentoService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle('Novo departamento');
    const codigo = this.route.snapshot.params['codigo'];
    if (codigo) {
      this.carregarDepartamento(codigo);
    }
  }

  salvar(form: FormControl) {    
    if (this.editando) {
      this.atualizarDepartamento(form);
    } else {
      this.adicionarDepartamento(form);
    }
  }
  carregarDepartamento(codigo: number) {
    this.departamentoService.buscarPorCodigo(codigo)
    .then(retorno => {
      this.departamento = retorno;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
  get editando() {
    return Boolean(this.departamento.codigo);
  }
  adicionarDepartamento(form: FormControl) {
    this.departamentoService.adicionar(this.departamento)
      .then(() => {
        this.toasty.success('Departamento adicionado com sucesso!');

        form.reset();
        this.departamento = new Departamento();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarDepartamento(form: FormControl) {
    this.departamentoService.atualizar(this.departamento)
      .then(departamento => {
        this.departamento = departamento;
        this.toasty.success('Departamento alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.departarmento = new Departamento();
    }.bind(this), 1);
    this.router.navigate(['/departamentos/novo']);
  }
  atualizarTituloEdicao() {
    this.title.setTitle(`Edição do departamento:  ${this.departamento.descricao}`);
  }

}
