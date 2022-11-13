import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationPageRoutingModule } from './notification-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { NotificationPage } from './notification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [NotificationPage]
})
export class NotificationPageModule {}
