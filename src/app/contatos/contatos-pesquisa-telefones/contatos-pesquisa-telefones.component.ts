import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contatos-pesquisa-telefones',
  templateUrl: './contatos-pesquisa-telefones.component.html',
  styleUrls: ['./contatos-pesquisa-telefones.component.css']
})
export class ContatosPesquisaTelefonesComponent implements OnInit {

  exibirDialogTelefones = false;
  @Input() numeros: any[];
  constructor() { }

  ngOnInit() {
  }


}
