import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';


import { AuthService } from '../auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  ngOnInit(): void {
    this.title.setTitle('Login SOTR');
  }
  constructor(
    private title: Title,
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  login(usuario: string, senha: string) {
    this.auth.login(usuario, senha)
      .then(() => {
        if (this.auth.temPermissao('ROLE_DASHBOARD_AGENDA') && this.auth.temPermissao('ROLE_DASHBOARD_VIAGEM') ) {
          this.router.navigate(['/inicio']);
        } else if (this.auth.temPermissao('ROLE_DASHBOARD_AGENDA')) {
          this.router.navigate(['/agenda']);
        } else {
          this.router.navigate(['/viagem']);
        }

      })
      .catch(erro => {
        this.errorHandler.handle(erro);
      });
  }

}
