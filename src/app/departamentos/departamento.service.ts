import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise' ;

import { AuthHttp } from 'angular2-jwt';
import { DepartamentoFiltro, Departamento } from './../core/model';
import { AuthService } from '../seguranca/auth.service';

@Injectable()
export class DepartamentoService {
  departamentosUrl: string;
  
  constructor(
    private http: AuthHttp,
    public auth: AuthService
    ) {
    this.departamentosUrl = `${environment.apiUrl}/departamentos`;
  }    

  pesquisar(filtro: DepartamentoFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('campus', this.auth.jwtPayload.campus);

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    
    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    if (filtro.campus) {
      params.set('campus', filtro.campus);
    }
    
    return this.http.get(`${this.departamentosUrl}`, {search: params})
    .toPromise()
    .then(response => {
      const responseJson = response.json();
      const departamentos = responseJson.content;

    const resultado = {
      departamentos,
      total: responseJson.totalElements
    };
    return resultado;
    });
  }
  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.departamentosUrl}/${codigo}`)
    .toPromise()
    .then(() => null);
  }
  pesquisarDepartamentoDescricao(descricao: string): Promise<any> {
    const params = new URLSearchParams();
    params.set('campus', this.auth.jwtPayload.campus);
    params.set('descricao', descricao);
    return this.http.get(`${this.departamentosUrl}`, {search: params})
    .toPromise()
    .then(response => response.json().content );
  }
  adicionar(departamento: Departamento): Promise<Departamento> {
    departamento.campus.codigo = this.auth.jwtPayload.idCampus;
    return this.http.post(this.departamentosUrl,
        JSON.stringify(departamento))
      .toPromise()
      .then(response => response.json());
  }
  atualizar(departamento: Departamento): Promise<Departamento> {
    return this.http.put(`${this.departamentosUrl}/${departamento.codigo}`,
        JSON.stringify(departamento))
      .toPromise()
      .then(response => {
        return response.json();
      });
  }

  buscarPorCodigo(codigo: number): Promise<Departamento> {
    return this.http.get(`${this.departamentosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        return response.json();
      });
  }
}
