import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddInterventionPageRoutingModule } from './add-intervention-routing.module';

import { AddInterventionPage } from './add-intervention.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddInterventionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddInterventionPage]
})
export class AddInterventionPageModule {}
