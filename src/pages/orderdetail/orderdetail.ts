import { Component } from '@angular/core';
import { IonicPage, NavController, ActionSheetController, ModalController, NavParams, Platform } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config'
import { UtilsProvider } from '../../providers/utils/utils';
import { Storage } from '@ionic/storage';
// import { ReadyPage } from '../ready/ready';
import { ReadyPage } from '../../pages/ready/ready';

@IonicPage()
@Component({
  selector: 'page-orderdetail',
  templateUrl: 'orderdetail.html',
})

export class OrderdetailPage {
  private delivered:any[]=[];
  private ready:any[]=[];
  private orderDetails:any;
  private configuration:any;
  private base_url:any;
  private poster_sizes:any;
  private movies:any;
  private tvs:any;
  

  constructor(
    private platform: Platform,
    private modalCtrl: ModalController,
    private actionsheetCtrl: ActionSheetController,
    private navCtrl: NavController, 
    private navParams: NavParams,
    private config: ConfigProvider,
    private utils: UtilsProvider,
    private storage: Storage
  ){}

  ionViewDidLoad() {
    this.orderDetails = this.navParams.get('cart')
    console.log("ORDER DETAILS",this.orderDetails)
    this.movies = this.orderDetails.moviecart
    this.tvs = this.orderDetails.tvcart

    // IMAGE CONFIGURATIONS
    this.config.getTmdbConfig()
		.subscribe(config => {
      this.configuration = config.images
      console.log("CONFIGURATION:",this.configuration)
      this.base_url = this.configuration.base_url
      this.poster_sizes = this.configuration.poster_sizes[6]
      console.log("POSTERSIZES:",this.poster_sizes)
		})
  }

  onDelivered(){    
    // Mark As Delivered
    this.utils.Delivered(this.orderDetails).then(()=>{
      this.delivered.push(this.orderDetails);
      this.storage.set('delivered',this.orderDetails)
    })     
  }

  markAsReady(){
    // Mark As Ready
    this.utils.Ready(this.orderDetails).then(()=>{
      this.ready.push(this.orderDetails)
      this.storage.set('ready',this.orderDetails)
    })
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
          text:"Ready",
          icon: !this.platform.is("ios")?"cash":null,
          handler: () => {
            this.utils.Ready(this.orderDetails).then((data:any)=>{
              console.log('READY SERVER FEEDBACK:',data)
              if(data.success === true){
                this.modalCtrl.create(ReadyPage,{readyOrders:data,from:'orderdetails'}).present() 
              }else if(data.success === false){
                console.log('ENCOUNTERED ERROR')
              }
            })
          }
        }
      ]
    })

    actionSheet.present()
  }  
}
