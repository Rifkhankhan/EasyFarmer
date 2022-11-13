import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowTipsPage } from './show-tips.page';

const routes: Routes = [
  {
    path: '',
    component: ShowTipsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowTipsPageRoutingModule {}
