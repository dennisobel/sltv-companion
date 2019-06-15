import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UtilsProvider } from '../../providers/utils/utils';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  private homedelivery:any;
  private user:any;

  constructor(
    private utils: UtilsProvider,
    private storage: Storage,
    private navCtrl: NavController, 
    private navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.storage.get('user').then((data:any)=>{
			console.log("USER DATA:",data)
			this.user = data
		})
  }

  updateDelivery(state) {
    console.log(state)
    // to deliver or not to deliver
    this.homedelivery = state;

    let id = this.user.user._id

    this.utils.HomeDelivery({id:this.user.user._id,status:this.homedelivery}).then(data => {
      console.log('HOME DEL SERVER FEEDBACK:',data)
    }).catch(err => {
      console.log('HOME DEL SERVER FEEDBACK ERROR:',err);
    })
  }

}
