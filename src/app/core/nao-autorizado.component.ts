import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nao-autorizado',
  template: `
  <div class="container">
  <h1 class="text-center">Acesso negado!</h1>
  <h2>Você não possui previlégios para acessar esse recurso!</h2>
</div>
  `,
  styles: []
})
export class NaoAutorizadoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
