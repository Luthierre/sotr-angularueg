import { AuthService } from './../../seguranca/auth.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

import { TipoTelefoneString, TipoTelefone } from '../../core/model';
import { Telefones } from './../../core/model';

@Component({
  selector: 'app-contato-cadastro-telefone',
  templateUrl: './contato-cadastro-telefone.component.html',
  styleUrls: ['./contato-cadastro-telefone.component.css']
})
export class ContatoCadastroTelefoneComponent implements OnInit {

  exbindoFormularioTelefone = false;
  tipos = [];
  telefone = new Telefones();
  @Input() telefones: any[];
  telefoneIndex: number;

  constructor(
    public auth: AuthService
  ) {
    this.tipos = [
      {label: TipoTelefoneString.Comercial , value: TipoTelefone.Comercial},
      {label: TipoTelefoneString.Corporativo , value: TipoTelefone.Corporativo},
      {label: TipoTelefoneString.Departamento , value: TipoTelefone.Departamento},
      {label: TipoTelefoneString.Pessoal , value: TipoTelefone.Pessoal},
      {label: TipoTelefoneString.Residencial , value: TipoTelefone.Residencial},
      {label: TipoTelefoneString.Trabalho , value: TipoTelefone.Trabalho}
    ];
  }

  ngOnInit() {
  }
  preprarTelefone() {
    this.exbindoFormularioTelefone = true;
    this.telefone = new Telefones();
    this.telefoneIndex = this.telefones.length;
  }
  prepararEdicaoTelefone(telefone: Telefones, index: number) {
    this.telefone = this.clonarTelefone(telefone);
    this.exbindoFormularioTelefone = true;
    this.telefoneIndex = index;
  }

  confirmarTelefone(frm: FormControl) {
    this.telefones[this.telefoneIndex] = this.clonarTelefone(this.telefone);
    this.exbindoFormularioTelefone = false;
    frm.reset();
  }

  removerTelefone(index: number) {
    this.telefones.splice(index, 1);
  }

  clonarTelefone(telefone: Telefones): Telefones {
    return new Telefones(telefone.codigo,
      telefone.tipo, telefone.area, telefone.numero);
  }

  get editando() {
    return this.telefone && this.telefone.codigo;
  }

}
