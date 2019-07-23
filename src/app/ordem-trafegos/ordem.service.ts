import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { OrdemTrafego } from './../core/model';
import { environment } from '../../environments/environment';
import { OrdemTrafegoFiltro } from '../core/model';
import { AuthService } from '../seguranca/auth.service';

@Injectable()
export class OrdemService {
  ordemTrafegoUrl: string;

  constructor(
    private auth: AuthService,
    private http: AuthHttp
    ) {
    this.ordemTrafegoUrl = `${environment.apiUrl}/ordem-trafego`;
  }

  pesquisar(filtro: OrdemTrafegoFiltro): Promise<any> {
    const params = new URLSearchParams();
    params.set('campus', this.auth.jwtPayload.campus);
    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.solicitante) {
      params.set('solicitante', filtro.solicitante);
    }
    if (filtro.placa) {
      params.set('placa', filtro.placa);
    }
    if (filtro.modelo) {
      params.set('modelo', filtro.modelo);
    }
    if (filtro.cpf) {
      params.set('cpf', filtro.cpf);
    }
    if (filtro.condutor) {
      params.set('condutor', filtro.condutor);
    }
    if (filtro.dataSolicitacaoDe) {
      console.log(moment(filtro.dataSolicitacaoDe).format('YYYY-MM-DD'));

      params.set('dataSolicitacaoDe', moment(filtro.dataSolicitacaoDe).format('YYYY-MM-DD'));
    }
    if (filtro.dataSolicitacaoAte) {
      console.log(moment(filtro.dataSolicitacaoAte).format('YYYY-MM-DD'));
      params.set('dataSolicitacaoAte', moment(filtro.dataSolicitacaoAte).format('YYYY-MM-DD'));

    }
    if (filtro.campus) {
      params.set('campus', filtro.campus);
    }


    return this.http.get(`${this.ordemTrafegoUrl}?resumo`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const ordens = responseJson.content;


        const resultado = {
          ordens,
          total: responseJson.totalElements
        };

        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.ordemTrafegoUrl}/${codigo}`, )
      .toPromise()
      .then(() => null);
  }
  adicionar(ordem: OrdemTrafego): Promise<OrdemTrafego> {
    ordem.campus.codigo = this.auth.jwtPayload.idCampus;    
    return this.http.post(this.ordemTrafegoUrl,
      JSON.stringify(ordem))
      .toPromise()
      .then(response => response.json());
  }
  atualizar(ordemTrafego: OrdemTrafego): Promise<OrdemTrafego> {
    ordemTrafego.campus.nome = null;
    return this.http.put(`${this.ordemTrafegoUrl}/${ordemTrafego.codigo}`,
      JSON.stringify(ordemTrafego))
      .toPromise()
      .then(response => {
        const ordem = response.json() as OrdemTrafego;

        this.converterStringsParaDatas([ordem]);

        return ordem;
      });
  }

  buscarPorCodigo(codigo: number): Promise<OrdemTrafego> {
    
    return this.http.get(`${this.ordemTrafegoUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const ordem = response.json() as OrdemTrafego;
        this.converterStringsParaDatas([ordem]);
        return ordem;
      });
  }
  mudarStatus(codigo: number, ativo: boolean): Promise<OrdemTrafego> {
    return this.http.put(`${this.ordemTrafegoUrl}/${codigo}/ativo`, ativo)
      .toPromise()
      .then(response => {
        const ordem = response.json() as OrdemTrafego;

        this.converterStringsParaDatas([ordem]);

        return ordem;
      });
  }

  kmPorVeiculo(): Promise<Array<any>> {
    const params = new URLSearchParams();
    params.set("campus", this.auth.jwtPayload.campus);
    return this.http.get(`${this.ordemTrafegoUrl}/estatisticas/por-veiculo/`, { search: params })
      .toPromise()
      .then(response => response.json());
  }
  kmPorCampusDia(): Promise<Array<any>> {
    const params = new URLSearchParams();
    params.set("campus", this.auth.jwtPayload.campus);
    return this.http.get(`${this.ordemTrafegoUrl}/estatisticas/por-campus-dia/`, { search: params })
      .toPromise()
      .then(response => {
        const dados = response.json();
        this.converterStringsParaData(dados);
        return dados;
      });
  }
  private converterStringsParaData(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }
  private converterStringsParaDatas(ordens: OrdemTrafego[]) {
    for (const ordem of ordens) {
      ordem.dataSolicitacao = moment(ordem.dataSolicitacao,
        'YYYY-MM-DD').toDate();

        ordem.dataCadastro = moment(ordem.dataCadastro,
          'YYYY-MM-DD').toDate();
         }
         for (const ordem of ordens) {
           if (ordem.rotas !== null && ordem.rotas.length > 0) {
             for (const rota of ordem.rotas) {
              rota.dataChegada =  moment(rota.dataChegada,
                'YYYY-MM-DD').toDate();
                rota.dataSaida =  moment(rota.dataSaida,
                  'YYYY-MM-DD').toDate();
             }
           }
         }
  }
}



