import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../seguranca/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-agenda.component.html',
  styleUrls: ['./dashboard-agenda.component.css']
})
export class DashboardAgendaComponent implements OnInit {

  constructor(
    private title: Title,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle('Agenda');
  }

}
