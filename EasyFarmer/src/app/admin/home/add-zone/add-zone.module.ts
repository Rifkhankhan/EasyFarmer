import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddZonePageRoutingModule } from './add-zone-routing.module';

import { AddZonePage } from './add-zone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddZonePageRoutingModule
  ],
  declarations: [AddZonePage]
})
export class AddZonePageModule {}
