import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { Veiculo } from '../../core/model';
import { CampusService } from '../../campus/campus.service';
import { VeiculoService } from '../veiculo.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { AuthService } from '../../seguranca/auth.service';

@Component({
  selector: 'app-veiculo-cadastro',
  templateUrl: './veiculo-cadastro.component.html',
  styleUrls: ['./veiculo-cadastro.component.css']
})
export class VeiculoCadastroComponent implements OnInit {

  campus = [];
  veiculo = new Veiculo();
  constructor(
    private campusService: CampusService,
    private veiculoService: VeiculoService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    public auth: AuthService
  ) {

   }

  ngOnInit() {
    this.title.setTitle('Novo veiculo');
    const codigo = this.route.snapshot.params['codigo'];    
    if (codigo) {
      this.carregarVeiculo(codigo);
    }
  }

  pesquisaCampus(event) {
    this.campusService.pesquisarCampusNome(event.query).then(data => {
        this.campus = data;
    });
  }
  salvar(form: FormControl) {
    this.veiculo.placa = this.veiculo.placa.toLocaleUpperCase();
    if (this.editando) {
      this.atualizarVeiculo(form);
    } else {
      this.adicionarVeiculo(form);
    }

  }
 
  carregarVeiculo(codigo: number) {
    this.veiculoService.buscarPorCodigo(codigo)
    .then(retorno => {
      this.veiculo = retorno;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
  get editando() {
    return Boolean(this.veiculo.codigo);
  }

  adicionarVeiculo(form: FormControl) {
    this.veiculoService.adicionar(this.veiculo)
    .then(() => {
      this.toasty.success('Veiculo adicionado com sucesso!');

      form.reset();
      this.veiculo = new Veiculo();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarVeiculo(form: FormControl) {
    this.veiculoService.atualizar(this.veiculo)
      .then(veiculo => {
        this.veiculo = veiculo;
        this.toasty.success('Veiculo alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.veiculo = new Veiculo();
    }.bind(this), 1);
    this.router.navigate(['/veiculos/novo']);
  }
  atualizarTituloEdicao() {
    this.title.setTitle(`Edição do veiculo:  ${this.veiculo.placa}`);
  }
}

