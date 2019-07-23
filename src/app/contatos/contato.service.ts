import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise' ;
import { AuthHttp } from 'angular2-jwt';

import { ContatoFiltro, Contato } from '../core/model';
import { AuthService } from '../seguranca/auth.service';

@Injectable()
export class ContatoService {
  contatosUrl: string;
  
  constructor(
    private http: AuthHttp,
    public auth: AuthService) {
    this.contatosUrl = `${environment.apiUrl}/contatos`;
    
  }

  pesquisar(filtro: ContatoFiltro): Promise<any> {

    const params = new URLSearchParams();
    
    params.set('campus', this.auth.jwtPayload.campus);
  
    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }
    if (filtro.email) {
      params.set('email', filtro.email);
    }
    if (filtro.departamento) {
      params.set('Contato', filtro.departamento);
    }
    if (filtro.observacao) {
      params.set('observacao', filtro.observacao);
    }
    if(filtro.campus) {
      params.set('campus', filtro.campus);
    }

    return this.http.get(`${this.contatosUrl}?resumo`, {search: params})
    .toPromise()
    .then(response => {
      const responseJson = response.json();
      const contatos = responseJson.content;

    const resultado = {
      contatos,
      total: responseJson.totalElements
    };

    return resultado;
    });
  }
  buscarTelefones(codigo: number): Promise<any> {
    const headers = new Headers();

    return this.http.get(`${this.contatosUrl}/telefones/${codigo}`)
    .toPromise()
    .then(response => {
     return response.json();
    });
  }
  excluir(codigo: number): Promise<void> {


    return this.http.delete(`${this.contatosUrl}/${codigo}`,  )
    .toPromise()
    .then(() => null);
  }
  adicionar(contato: Contato): Promise<Contato> {
    return this.http.post(this.contatosUrl,
        JSON.stringify(contato))
      .toPromise()
      .then(response => response.json());
  }
  atualizar(contato: Contato): Promise<Contato> {
    return this.http.put(`${this.contatosUrl}/${contato.codigo}`,
        JSON.stringify(contato))
      .toPromise()
      .then(response => {
        return response.json();
      });
  }

  buscarPorCodigo(codigo: number): Promise<Contato> {


    return this.http.get(`${this.contatosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        return response.json();
      });
  }

}
