import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CropTipsPage } from './crop-tips.page';

const routes: Routes = [
  {
    path: '',
    component: CropTipsPage
  },
  {
    path: 'show-tips',
    loadChildren: () => import('./show-tips/show-tips.module').then( m => m.ShowTipsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CropTipsPageRoutingModule {}

