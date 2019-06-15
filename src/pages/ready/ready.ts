import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
import { ReadyviewPage } from '../readyview/readyview';
import { UtilsProvider } from '../../providers/utils/utils';

@IonicPage()
@Component({
  selector: 'page-ready',
  templateUrl: 'ready.html',
})
export class ReadyPage {
  private readyOrders:any[]=[];
  private close:Boolean = false;
  private menu: Boolean = false;

  constructor(
    private utils: UtilsProvider,
    private modalCtrl: ModalController,
    private navCtrl: NavController, 
    private navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log(this.navParams.get('from'))    
    // console.log('READY ORDERS:',this.readyOrders)
    // Menu
    if(this.navParams.get('from') == 'apphtml'){
      this.menu = true;
    }

		// From
		if(this.navParams.get('from') == 'orderdetails'){
      this.close = true;
      this.readyOrders.push(this.navParams.get('readyOrders').doc)
      console.log(this.readyOrders)
      // this.readyOrders = this.navParams.get('orderdetails').doc
		}else{
      this.utils.GetReady().then((data:any)=>{
        console.log(data)
        // this.readyOrders = data
      })
    }    
  }
  
  onClose(){
    this.navCtrl.pop()
  }
  

  viewReadyDetails(item){
    console.log("DETAILS:",item)
    this.modalCtrl.create(ReadyviewPage,{readyView:item}).present()
  }

}
