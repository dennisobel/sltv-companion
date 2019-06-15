import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveredViewPage } from './delivered-view';

@NgModule({
  declarations: [
    DeliveredViewPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveredViewPage),
  ],
})
export class DeliveredViewPageModule {}
