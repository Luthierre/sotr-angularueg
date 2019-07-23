import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';

import { CampusService } from '../../campus/campus.service';
import { Condutor } from '../../core/model';
import { CondutorService } from '../condutor.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { AuthService } from '../../seguranca/auth.service';
import { LocaleService } from '../../core/locale.service';

@Component({
  selector: 'app-condutor-cadastro',
  templateUrl: './condutor-cadastro.component.html',
  styleUrls: ['./condutor-cadastro.component.css']
})
export class CondutorCadastroComponent implements OnInit {

  campus = [];
  condutor = new Condutor();

  pt: any;
  constructor(
    private localeService: LocaleService,
    private campusService: CampusService,
    private condutorService: CondutorService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    public auth: AuthService
  ) {

   }

  ngOnInit() {
    this.pt = this.localeService.configurarLocale();
    this.title.setTitle('Novo motorista');
    const codigo = this.route.snapshot.params['codigo'];
    if (codigo) {
      this.carregarCondutor(codigo);

    }
  }
  traduzirCalendario() {

}
  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarCondutor(form);
    } else {
      this.adicionarCondutor(form);
    }

  }

  pesquisaCampus(event) {
    this.campusService.pesquisarCampusNome(event.query).then(data => {
        this.campus = data;
    });
  }

  carregarCondutor(codigo: number) {
    this.condutorService.buscarPorCodigo(codigo)
    .then(retorno => {
      this.condutor = retorno;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
  get editando() {
    return Boolean(this.condutor.codigo);
  }

  adicionarCondutor(form: FormControl) {
    this.condutorService.adicionar(this.condutor)
    .then(() => {
      this.toasty.success('Motorista adicionado com sucesso!');

      form.reset();
      this.condutor = new Condutor();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarCondutor(form: FormControl) {
    this.condutor.campus.codigo = this.auth.jwtPayload.idCampus;
    this.condutor.campus.nome = null;
    this.condutorService.atualizar(this.condutor)
      .then(condutor => {
        this.condutor = condutor;
        this.toasty.success('Motorista alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.condutor = new Condutor();
    }.bind(this), 1);
    this.router.navigate(['/motoristas/novo']);
  }
  atualizarTituloEdicao() {
    this.title.setTitle(`Edição do condutor:  ${this.condutor.nome}`);
  }
}
