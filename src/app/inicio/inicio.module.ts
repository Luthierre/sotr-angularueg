import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {CardModule} from 'primeng/card';
import { ButtonModule} from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';



import { InicioComponent } from './inicio/inicio.component';
import { InicioRoutingModule } from './inicio-routing.module';

@NgModule({
  imports: [
    CommonModule,


    TooltipModule,
    CardModule,
    ButtonModule,
    InicioRoutingModule
  ],
  declarations: [InicioComponent]
  , exports: []
})
export class InicioModule { }
