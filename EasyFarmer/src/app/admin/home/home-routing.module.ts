import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'crop',
    loadChildren: () => import('./crop/crop.module').then( m => m.CropPageModule)
  },
  {
    path: 'add-zone',
    loadChildren: () => import('./add-zone/add-zone.module').then( m => m.AddZonePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
