import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';

import { AuthService } from './../../seguranca/auth.service';
import { Rota } from '../../core/model';

@Component({
  selector: 'app-ordem-cadastro-rota',
  templateUrl: './ordem-cadastro-rota.component.html',
  styleUrls: ['./ordem-cadastro-rota.component.css']
})
export class OrdemCadastroRotaComponent implements OnInit {

  exibindoFormularioRotas = false;
  exibindoServicoRotas = false;
  editandoRotaZero = true;
  editandoRotaUltima = false;
  rotaIndex: number;
  cols: any[];
  @Input()rotas = [];
  @Input() solicitacao: Date;
  rota = new Rota();
  @ViewChild('tabela') grid;

  constructor(
    private toasty: ToastyService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.rotaIndex = this.rotas.length;
    this.cols = [
      { field: 'localSaida', header: 'Local' },
      { field: 'dataSaida', header: 'Data' },
      { field: 'kmSaida', header: 'Km' },
      { field: 'localChegada', header: 'Local' },
      { field: 'dataChegada', header: 'Data' },
      { field: 'kmChegada', header: 'Km' }
    ];
  }

  exibirServicoRota(rota: any) {
    this.exibindoServicoRotas = true;
    this.rota = rota;
  }
  prepararRota() {
    this.exibindoFormularioRotas = true;
    this.rota = new Rota();
    this.rotaIndex = this.rotas.length;

    if ( this.rotas.length !== 0 ) {
      this.editandoRotaZero = false;
      this.rota.localSaida = this.rotas[this.rotaIndex - 1].localChegada;
        this.rota.dataSaida = this.rotas[this.rotaIndex - 1].dataChegada;
        this.rota.horaSaida = this.rotas[this.rotaIndex - 1].horaChegada;
        this.rota.kmSaida = this.rotas[this.rotaIndex - 1].kmChegada;
    }
  }
  alterarRotasPosteriores(index: number) {
        this.rotas[index].localSaida = this.rotas[index - 1].localChegada;
        this.rotas[index].dataSaida = this.rotas[index - 1].dataChegada;
        this.rotas[index].horaSaida = this.rotas[index - 1].horaChegada;
        this.rotas[index].kmSaida = this.rotas[index - 1].kmChegada;

  }
  alteraKmRotas(index: number) {
    for (let i = index; i < this.rotas.length; i++) {
      this.rotas[i].kmPercorrido = this.rotas[i].kmChegada - this.rotas[i].kmSaida;
    }
  }
  confirmarRota(frm: FormControl) {
    if (this.verificarKmRota()) {
      this.rotas[this.rotaIndex] = this.clonarRota(this.rota);
      if (this.editando && this.rotaIndex < this.rotas.length - 1 && (!this.editandoRotaUltima)) {
      this.alterarRotasPosteriores(this.rotaIndex + 1);
    }
      this.alteraKmRotas(this.rotaIndex);
      this.rota = new Rota();
      frm.reset();
      this.exibindoFormularioRotas = false;
    } else if (!this.verificarKmRota()) {
      this.toasty.error('Verifique a quilometragem de origem e destino!');
    }
  }
  prepararEdicaoRota(rota: Rota, rowIndex: number) {
    this.rota = new Rota();
    this.rotaIndex = rowIndex;
    if (this.rotaIndex === 0) {
      this.editandoRotaZero = true;
      this.editandoRotaUltima = false;
    }
    if (this.rotaIndex >= 1) {
      this.editandoRotaZero = false;
    }
    if (this.rotaIndex === this.rotas.length - 1) {
      this.editandoRotaUltima = true;
    }
    this.rota = this.clonarRota(rota);
    this.exibindoFormularioRotas = true;
  }
  removerRota(rowIndex: number) {
    this.rotas.splice(rowIndex);
  }
  calcularKmPercorridoRota(kmSaida: number, kmChegada: number): number {
    return kmChegada - kmSaida;
  }
  verificarKmRota() {
    let resto = 0;
    resto = this.rota.kmChegada - this.rota.kmSaida;
    if (resto > 0) {
      return true;
    }
    return false;

  }
  fecharDialogRota(frm: FormControl) {
    this.exibindoFormularioRotas = false;
    this.rota = new Rota();
    frm.reset();
  }
  clonarRota(rota: Rota): Rota {
    return new Rota(rota.codigo, rota.localSaida,
      rota.dataSaida, rota.horaSaida, rota.kmSaida,
      rota.localChegada, rota.dataChegada, rota.horaChegada,
       rota.kmChegada,  rota.kmPercorrido, rota.nome, rota.servico);
  }
  get editando() {
    return this.rota && this.rota.codigo;
  }

}
