import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise' ;
import { AuthHttp } from 'angular2-jwt';

import { Veiculo, VeiculoFiltro } from '../core/model';
import { AuthService } from '../seguranca/auth.service';

@Injectable()
export class VeiculoService {
  veiculosUrl: string;

  constructor(
    private http: AuthHttp,
    public auth: AuthService) {
    this.veiculosUrl = `${environment.apiUrl}/veiculos`;
  }

  pesquisar(filtro: VeiculoFiltro): Promise<any> {

    const params = new URLSearchParams();
    params.set('campus', this.auth.jwtPayload.campus);

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.modelo) {
      params.set('modelo', filtro.modelo);
    }
    if (filtro.fabricante) {
      params.set('fabricante', filtro.fabricante);
    }
    if (filtro.placa) {
      params.set('placa', filtro.placa);
    }
    if (filtro.ano) {
      params.set('ano', filtro.ano);
    }
    if (filtro.observacao) {
      params.set('observacao', filtro.observacao);
    }
    if (filtro.campus) {
      params.set('campus', filtro.campus);
    }
    return this.http.get(`${this.veiculosUrl}`, {search: params})
    .toPromise()
    .then(response => {
      const responseJson = response.json();
      const veiculos = responseJson.content;
    const resultado = {
      veiculos,
      total: responseJson.totalElements
    };
    return resultado;
    });
  }
  
  pesquisarVeiculoModeloPlacaPorCampus(nome: string, campus: string): Promise<any> {    
    return this.http.get(`${this.veiculosUrl}/pesquisar?campus=${campus}&modelo=${nome}`)
    .toPromise()
    .then(response => response.json() );
  }
  pesquisarVeiculoModeloPlaca(nome: string): Promise<any> {    
    return this.http.get(`${this.veiculosUrl}/pesquisar?&modelo=${nome}`)
    .toPromise()
    .then(response => response.json() );
  }
  listarTodos(): Promise<any> {
    return this.http.get(this.veiculosUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.veiculosUrl}/${codigo}`,  )
    .toPromise()
    .then(() => null);
  }
  adicionar(veiculo: Veiculo): Promise<Veiculo> {
    if(this.auth.jwtPayload.idCampus !== 1) {
      veiculo.campus.codigo = this.auth.jwtPayload.idCampus;
    }
    return this.http.post(this.veiculosUrl,
        JSON.stringify(veiculo))
      .toPromise()
      .then(response => response.json());
  }
  atualizar(veiculo: Veiculo): Promise<Veiculo> {
    return this.http.put(`${this.veiculosUrl}/${veiculo.codigo}`,
        JSON.stringify(veiculo))
      .toPromise()
      .then(response => {
        return response.json();
      });
  }

  buscarPorCodigo(codigo: number): Promise<Veiculo> {
    return this.http.get(`${this.veiculosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        return response.json();
      });
  }

}
