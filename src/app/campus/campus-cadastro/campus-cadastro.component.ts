import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';

import { Campus } from './../../core/model';
import { CampusService } from '../campus.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { AuthService } from '../../seguranca/auth.service';


@Component({
  selector: 'app-campus-cadastro',
  templateUrl: './campus-cadastro.component.html',
  styleUrls: ['./campus-cadastro.component.css']
})
export class CampusCadastroComponent implements OnInit {

  campus = new Campus();

  constructor(
    private campusService: CampusService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle('Novo campus');
    const codigo = this.route.snapshot.params['codigo'];
    if (codigo) {
      this.carregarCampus(codigo);
    }
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarCampus(form);
    } else {
      this.adicionarCampus(form);
    }
  }
  carregarCampus(codigo: number) {
    this.campusService.buscarPorCodigo(codigo)
    .then(retorno => {
      this.campus = retorno;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
  get editando() {
    return Boolean(this.campus.codigo);
  }
  adicionarCampus(form: FormControl) {
    this.campusService.adicionar(this.campus)
      .then(() => {
        this.toasty.success('Campus adicionado com sucesso!');

        form.reset();
        this.campus = new Campus();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarCampus(form: FormControl) {
    this.campusService.atualizar(this.campus)
      .then(campus => {
        this.campus = campus;
        this.toasty.success('Campus alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.departarmento = new Campus();
    }.bind(this), 1);
    this.router.navigate(['/campus/novo']);
  }
  atualizarTituloEdicao() {
    this.title.setTitle(`Edição do campus:  ${this.campus.nome}`);
  }

}
