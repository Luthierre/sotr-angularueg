import { Injectable } from '@angular/core';
import { URLSearchParams, ResponseContentType } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';


import { OrdemTrafego } from './../core/model';
import { environment } from '../../environments/environment';
import { OrdemTrafegoFiltro } from '../core/model';
import { AuthService } from '../seguranca/auth.service';

@Injectable()
export class RelatoriosService {
  ordemTrafegoUrl: string;

  constructor(
    private auth: AuthService,
    private http: AuthHttp
    ) {
    this.ordemTrafegoUrl = `${environment.apiUrl}/ordem-trafego`;
  }
  relatorioOrdem(codigo: number) {
    const params = new URLSearchParams();
    params.set('codigo', codigo.toString() );
    params.set('usuario', this.auth.jwtPayload.nome);
    return this.http.get(`${this.ordemTrafegoUrl}/relatorios/porOrdem`, { search: params, responseType: ResponseContentType.Blob })
      .toPromise()
      .then(response => response.blob());

  }
}
