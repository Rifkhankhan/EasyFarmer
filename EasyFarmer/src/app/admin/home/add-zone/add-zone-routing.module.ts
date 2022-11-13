import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddZonePage } from './add-zone.page';

const routes: Routes = [
  {
    path: '',
    component: AddZonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddZonePageRoutingModule {}
