import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise' ;
import { AuthHttp } from 'angular2-jwt';

import { UsuarioFiltro, Usuario } from './../core/model';
import { AuthService } from '../seguranca/auth.service';

@Injectable()
export class UsuarioService {

  usuariosUrl: string;

  constructor(
    public auth: AuthService,
    private http: AuthHttp
    ) {
    this.usuariosUrl = `${environment.apiUrl}/usuarios`;
  }

  pesquisar(filtro: UsuarioFiltro): Promise<any> {
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
    if (filtro.campus) {
      params.set('campus', filtro.campus);
    }

    return this.http.get(`${this.usuariosUrl}`, {search: params})
    .toPromise()
    .then(response => {
      const responseJson = response.json();
      const usuarios = responseJson.content;

    const resultado = {
      usuarios,
      total: responseJson.totalElements
    };

    return resultado;
    });
  }
  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.usuariosUrl}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

  adicionar(usuario: Usuario): Promise<Usuario> {
    if (this.auth.jwtPayload.idCampus !== 1) {
      usuario.campus.codigo = this.auth.jwtPayload.idCampus;
    }
    usuario.campus.nome = null;
    return this.http.post(this.usuariosUrl,
        JSON.stringify(usuario))
      .toPromise()
      .then(response => response.json());
  }
  listarTodos(): Promise<any> {
    return this.http.get(`${this.usuariosUrl}/permissoes`)
      .toPromise()
      .then(response => response.json());
  }
  atualizar(usuario: Usuario): Promise<Usuario> {
    return this.http.put(`${this.usuariosUrl}/${usuario.codigo}`,
        JSON.stringify(usuario))
      .toPromise()
      .then(response => {
        return response.json();
      });
  }

  buscarPorCodigo(codigo: number): Promise<Usuario> {
    return this.http.get(`${this.usuariosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        return response.json();
      });
  }


}
