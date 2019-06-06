import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {UtilsProvider} from '../../providers/utils/utils';

@IonicPage()
@Component({
  selector: 'page-delivered',
  templateUrl: 'delivered.html'
})

export class DeliveredPage {
  private delivered:any;

  constructor(
    private utils: UtilsProvider,
    private navCtrl: NavController, 
    private navParams: NavParams,
    private storage: Storage
  ){}

  ionViewDidLoad(){
    this.utils.GetDelivered()
    .then((res:any) => {
      this.delivered = res.delivered;
      console.log("DELIVERED:",this.delivered);
    })
    // GET DELIVERED
    // this.storage.get('delivered').then(data => {
    //   this.delivered = data;
    // })
  }

  viewDeliveredDetails(item){
    console.log("DETAILS:",item)
  }

}
