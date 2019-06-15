import { Component } from '@angular/core';
import { IonicPage, NavController, ActionSheetController, Platform, NavParams } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';

@IonicPage()
@Component({
  selector: 'page-readyview',
  templateUrl: 'readyview.html',
})
export class ReadyviewPage {
  private readyOrderDetails:any;

  constructor(
    private utils: UtilsProvider,
    private platform: Platform,
    private actionsheetCtrl: ActionSheetController,
    private navCtrl: NavController, 
    private navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.readyOrderDetails = this.navParams.get('readyView')
    console.log('READY ORDER DETAILS:',this.readyOrderDetails);
  }

  onClose(){
    this.navCtrl.pop()
  }

  openMenu(){
    let actionSheet = this.actionsheetCtrl.create({
      title: "Cart Actions",
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text:"Delivered",
          icon: !this.platform.is("ios")?"cash":null,
          handler: () => {
            // this.utils.Delivered()
          }
        }
      ]
    })

    actionSheet.present()
  } 
}
