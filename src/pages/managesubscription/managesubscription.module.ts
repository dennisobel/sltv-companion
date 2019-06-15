import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagesubscriptionPage } from './managesubscription';

@NgModule({
  declarations: [
    ManagesubscriptionPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagesubscriptionPage),
  ],
})
export class ManagesubscriptionPageModule {}
