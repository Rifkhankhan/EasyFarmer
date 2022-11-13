import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowTipsPageRoutingModule } from './show-tips-routing.module';

import { ShowTipsPage } from './show-tips.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowTipsPageRoutingModule,
    TranslateModule
  ],
  declarations: [ShowTipsPage]
})
export class ShowTipsPageModule {}
