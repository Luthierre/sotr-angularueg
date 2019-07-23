import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { environment } from '../../environments/environment';
import { CondutorFiltro, Condutor } from '../core/model';
import { AuthService } from '../seguranca/auth.service';

@Injectable()
export class CondutorService {

  condutorUrl: string;
  

  constructor(
    private http: AuthHttp,
    public auth: AuthService
    ) {
    this.condutorUrl = `${environment.apiUrl}/motoristas`;    
  }

  pesquisar(filtro: CondutorFiltro): Promise<any> {

    const params = new URLSearchParams();

    params.set('campus', this.auth.jwtPayload.campus);    
    

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }
    if (filtro.cpf) {
      params.set('cpf', filtro.cpf);
    }
    if (filtro.dataNascimentoDe) {
      params.set('dataNascimentoDe', moment(filtro.dataNascimentoDe).format('YYYY-MM-DD'));
    }
    if (filtro.dataNascimentoAte) {
      params.set('dataNascimentoAte', moment(filtro.dataNascimentoAte).format('YYYY-MM-DD'));
    }
    if (filtro.campus) {
      params.set('campus', filtro.campus);
    }
    return this.http.get(`${this.condutorUrl}`, {search: params})
    .toPromise()
    .then(response => {
      const responseJson = response.json();
      const condutores = responseJson.content;
    const resultado = {
      condutores,
      total: responseJson.totalElements
    };
    return resultado;
    });
  }
  pesquisarCondutorNome(nome: string, campus: string): Promise<any> {
    const params = new URLSearchParams();
    params.set('nome', nome);
    return this.http.get(`${this.condutorUrl}?campus=${campus}&nome=${nome}`)
    .toPromise()
    .then(response => response.json().content );
  }

  
  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.condutorUrl}/${codigo}`,  )
    .toPromise()
    .then(() => null);
  }
  adicionar(condutor: Condutor): Promise<Condutor> {
    if (this.auth.jwtPayload.idCampus !== 1) {
      condutor.campus.codigo = this.auth.jwtPayload.idCampus;
    }
    condutor.campus.nome = null;
    return this.http.post(this.condutorUrl,
        JSON.stringify(condutor))
      .toPromise()
      .then(response => response.json());
  }
  atualizar(condutor: Condutor): Promise<Condutor> {    
    return this.http.put(`${this.condutorUrl}/${condutor.codigo}`,
        JSON.stringify(condutor))
      .toPromise()
      .then(response => {
        const cond = response.json() as Condutor;

          this.converterStringsParaDatas([cond]);

          return cond;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Condutor> {
    return this.http.get(`${this.condutorUrl}/${codigo}`)
      .toPromise()
      .then(response => {
          const condutor = response.json() as Condutor;

          this.converterStringsParaDatas([condutor]);

          return condutor;
      });

  }

  private converterStringsParaDatas(condutores: Condutor[]) {
    for (const condutor of condutores) {
      condutor.dataNascimento = moment(condutor.dataNascimento,
        'YYYY-MM-DD').toDate();
      if (condutor.dataVencimentoCnh) {
        condutor.dataVencimentoCnh = moment(condutor.dataVencimentoCnh,
          'YYYY-MM-DD').toDate();
      }
    }
  }

}

