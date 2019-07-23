import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise' ;
import { AuthHttp } from 'angular2-jwt';

import { Campus, CampusFiltro } from '../core/model';

@Injectable()
export class CampusService {
  campusUrl: string;

  constructor(private http: AuthHttp) {
    this.campusUrl = `${environment.apiUrl}/campus`;
  }
  pesquisar(filtro: CampusFiltro): Promise<any> {
    const params = new URLSearchParams();
    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());
    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.campusUrl}`, {search: params})
    .toPromise()
    .then(response => {
      const responseJson = response.json();
      const campus = responseJson.content;

    const resultado = {
      campus,
      total: responseJson.totalElements
    };

    return resultado;
    });
  }

  pesquisarCampusNome(nome: string): Promise<any> {
    const params = new URLSearchParams();    
    params.set('nome', nome);
    return this.http.get(`${this.campusUrl}`, {search: params})
    .toPromise()
    .then(response => response.json().content );
  }
  
 
  adicionar(campus: Campus): Promise<Campus> {
    return this.http.post(this.campusUrl,
        JSON.stringify(campus))
      .toPromise()
      .then(response => response.json());
  }
  atualizar(campus: Campus): Promise<Campus> {


    return this.http.put(`${this.campusUrl}/${campus.codigo}`,
        JSON.stringify(campus))
      .toPromise()
      .then(response => {
        return response.json();
      });
  }

  buscarPorCodigo(codigo: number): Promise<Campus> {
    return this.http.get(`${this.campusUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        return response.json();
      });
  }

}
