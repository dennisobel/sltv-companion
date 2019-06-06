import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config'
import { UtilsProvider } from '../../providers/utils/utils';
import { Storage } from '@ionic/storage';

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
}
