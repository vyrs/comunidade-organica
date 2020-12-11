import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavAuxComponent } from './nav-aux/nav-aux.component';


@NgModule({
  declarations: [NavBarComponent, NavAuxComponent],
  exports: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule
  ]
})
export class TemplateModule { }
