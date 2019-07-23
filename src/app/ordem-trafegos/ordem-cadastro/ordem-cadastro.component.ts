import { RelatoriosService } from './../../core/relatorios.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastyService } from 'ng2-toasty';
import * as moment from 'moment';

import { OrdemService } from './../ordem.service';
import { OrdemTrafego, UsuarioFiltro, Usuario, Rota } from './../../core/model';
import { CondutorService } from '../../motoristas/condutor.service';
import { VeiculoService } from '../../veiculos/veiculo.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { AuthService } from '../../seguranca/auth.service';
import { FormControl } from '@angular/forms';
import { UsuarioService } from '../../usuarios/usuario.service';
import { LocaleService } from '../../core/locale.service';

@Component({
  selector: 'app-ordem-cadastro',
  templateUrl: './ordem-cadastro.component.html',
  styleUrls: ['./ordem-cadastro.component.css']
})
export class OrdemCadastroComponent implements OnInit {
  pt = this.localeService.configurarLocale();
  status = [];  
  condutores = [];
  veiculos = [];
  usuarios = [];
  ordem = new OrdemTrafego();
  filtroUsuario = new UsuarioFiltro();
  usuario = new  Usuario();
  

  constructor(
    private localeService: LocaleService,
    private condutorService: CondutorService,
    private veiculoService: VeiculoService,
    private ordemService: OrdemService,
    private relatorioService: RelatoriosService,
    private usuarioService: UsuarioService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    public auth: AuthService
  ) {
    this.status = [
      {label: "Ativo", value: true},
      {label: "Inativo", value: false},
    ];
    this.pt = this.localeService.configurarLocale();
   }

  ngOnInit() {
    this.pt = this.localeService.configurarLocale();
    this.title.setTitle('Nova ordem de tráfego');
    const codigo = this.route.snapshot.params['codigo'];     
    if (codigo) {
      this.carregarOrdem(codigo);      
    }  
    
  }
  salvar(form: FormControl) {
    this.ordem.usuario.codigo = this.auth.jwtPayload.idNome;           
      this.calcularKmTotalRota();

    if (this.editando) {
      this.atualizarOrdem(form);
    } else {
      this.adicionarOrdem(form);
    }
  }
  calcularKmTotalRota() {
    let total = 0;
    for (const rota of this.ordem.rotas) {
      total = total + rota.kmPercorrido;
    }
    this.ordem.totalKm = total;


  }
  gerar() {
    this.relatorioService.relatorioOrdem(this.ordem.codigo)
    .then(relatorio => {
      const url = window.URL.createObjectURL(relatorio);
      window.open(url);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisaCondutores(event) {
    this.condutorService.pesquisarCondutorNome(event.query, this.auth.jwtPayload.campus).then(resultado => {
        this.condutores = resultado;
    });
  }

  pesquisaVeiculos(event) {    
    if(this.auth.jwtPayload.idCampus !== 1 ) {
    this.veiculoService.pesquisarVeiculoModeloPlacaPorCampus(event.query, this.auth.jwtPayload.campus).then(data => {      
      this.veiculos = data;
    });
  }else {
    this.veiculoService.pesquisarVeiculoModeloPlaca(event.query).then(resposta => {      
      this.veiculos = resposta;
    });
  }
  }

 
  
  carregarOrdem(codigo: number) {
    this.ordemService.buscarPorCodigo(codigo)
    .then(retorno => {
      this.ordem = retorno;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
  get editando() {
    return Boolean(this.ordem.codigo);
  }

  adicionarOrdem(form: FormControl) {
    this.ordemService.adicionar(this.ordem)
    .then(() => {
      this.toasty.success('Ordem de tráfego adicionada com sucesso!');

      form.reset();
      this.ordem = new OrdemTrafego();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarOrdem(form: FormControl) {
    this.ordemService.atualizar(this.ordem)
      .then(ordem => {
        this.ordem = ordem;
        this.toasty.success('Ordem de tráfego alterada com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.ordem = new OrdemTrafego();
    }.bind(this), 1);
    this.router.navigate(['/ordem-trafegos/novo']);
  }
  atualizarTituloEdicao() {
    this.title.setTitle(`Edição da ordem:  ${this.ordem.solicitante}`);
  }
}
