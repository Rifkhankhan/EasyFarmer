import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiseasesPageRoutingModule } from './diseases-routing.module';

import { DiseasesPage } from './diseases.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiseasesPageRoutingModule,
    ReactiveFormsModule

  ],
  declarations: [DiseasesPage]
})
export class DiseasesPageModule {}
