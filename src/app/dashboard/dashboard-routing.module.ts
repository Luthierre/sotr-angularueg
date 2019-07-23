import { DashboardViagemComponent } from './dashboard-viagem/dashboard-viagem.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { DashboardAgendaComponent } from './dashboard-agenda/dashboard-agenda.component';

const routes: Routes = [
  { path: 'agenda', component: DashboardAgendaComponent},
  { path: 'viagem', component: DashboardViagemComponent}

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
