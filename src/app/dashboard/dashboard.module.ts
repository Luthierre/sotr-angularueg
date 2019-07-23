import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {CardModule} from 'primeng/card';
import { ButtonModule} from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';


import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardAgendaComponent } from './dashboard-agenda/dashboard-agenda.component';
import { DashboardViagemComponent } from './dashboard-viagem/dashboard-viagem.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  imports: [
    CommonModule,


    TooltipModule,
    PanelModule,
    CardModule,
    ButtonModule,
    ChartModule,

    DashboardRoutingModule
  ],
  declarations: [DashboardAgendaComponent, DashboardViagemComponent, DashboardComponent]
  , exports: []
})
export class DashboardModule { }
