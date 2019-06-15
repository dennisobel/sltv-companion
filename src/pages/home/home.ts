import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
// import { ChatRoomPage } from "../chat-room/chat-room"
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
// import { Http } from "@angular/http"
// import { ConfigProvider } from '../../providers/config/config'
// import { MoviesProvider } from '../../providers/movies/movies'
// import { NewcartPage } from '../newcart/newcart';
// import { AuthProvider } from '../../providers/auth/auth';
import { UtilsProvider } from "../../providers/utils/utils";

// import { LoginPage } from '../login/login';
import { OrderdetailPage } from '../orderdetail/orderdetail';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	listorders="orders"
	nickname = "";
	cart:any[]=[];
	reversedCart:any[]=[];
	delivered:any[]=[];
	_delivered:any[]=[];
	_del:any[]=[];
	movies:any[]=[];
	tvshows:any[]=[];
	phone_number:any;
	base_url:any;
	poster_sizes:any;
	backdrop_sizes:any;
	configuration:any;
	oldcart:any;
	neworder:any;
	_data:any[]=[];
	APIKEY = "35be3be17f956346becdba89d4f22ca1"


	constructor(
		public navCtrl: NavController, 
		public modalCtrl:ModalController,
		public alertCtrl: AlertController,
		public socket: Socket, 
		public storage: Storage,
		private navParams: NavParams,
		// public http: Http,
		// public authService: AuthProvider,
		// public config: ConfigProvider,	
		public utilsProvider: UtilsProvider,	 
		// public get_movies: MoviesProvider
	){
		this.socket.on('notifyRetailer',(data)=>{
			console.log('INCOMING ORDER:',data);
			// this.getOrders();
			this.ionViewDidLoad()
		})	
	}
 
	ionViewDidLoad(){
		// this.getOrders()

		let data = this.navParams.get('data')
		let id = data.data._id
		this.getOrdersById(id);
		
		
		this.socket.on('connect',()=>{
			var sessionid = this.socket.ioSocket.id;
		})  

		this.storage.get('user').then((data:any)=>{
			// console.log("USER DATA:",data)			 
			/*
			if(data.data._id == undefined){
				let id = data.user._id
				this.getOrdersById(id);
			}else if(data.data.id){
				let id = data.data._id
				this.getOrdersById(id);
			}else if(data.user.id){
				let id = data.user._id
				this.getOrdersById(id);
			}
			*/
			// console.log("TYPEOFID",typeof(id))

			// console.log("ID:",id);

			
		})
		
	}

	viewDetail(cart){
		this.navCtrl.push(OrderdetailPage,{cart})
	}

	getOrders(){
		this.utilsProvider.getCartsPosted()
		.then((data:any)=>{
			console.log("RETAILER CART:",data)
			this.cart.push(data.data);
			this.reversedCart = this.cart.reverse();
			return this.cart
		})		
	}

	getOrdersById(id){
		this.utilsProvider.GetCartById(id).then((data:any)=>{
			console.log('ORDERS BY ID SERVER FEEDBACK:',data)
			this.cart.push(data.data);
			this.reversedCart = this.cart.reverse();
			return this.cart
		})
	}

	/*
	ionViewDidLeave(){
		this.storage.get('user')
		.then((value)=>{
			let nickname = value.username
			// console.log(nickname)
			// console.log(value.username)
			this.socket.emit("offline",{username:nickname})
		})
	}

	logout(){
		this.authService.logout()
		this.navCtrl.setRoot(LoginPage)
	}

	onDelivered(cart){

		let alert = this.alertCtrl.create({
			title:"You sure you wanna mark as delivered?",
			buttons:[
				{
					text:"Sure",
					handler:()=>{							
						this.removeConnected(cart)
						this.getValue()
					}			
				},
				{
					text:"My Bad",
					role:"cancel",
					handler:()=>{
						//this.ionViewDidLoad()
					}
				}				
			]			
		})

		alert.present()

	}

	presentAlert(neworder){		
		let _newcart = this.alertCtrl.create({
			//neworder:this.neworder,
			title:"New Order",
			buttons:[
				{
					text:"View",
					handler:()=>{							
						let _cartModal = this.modalCtrl.create(NewcartPage, {cart:neworder})
						_cartModal.present()
						//this.ionViewDidLoad()
					}			
				},
				{
					text:"Cancel",
					role:"cancel",
					handler:()=>{
						//this.ionViewDidLoad()
					}
				}				
			]				
		})
		_newcart.present()		
		this.ionViewDidLoad()
	}	

	setValue(data){
		this._data.push(data)
		this.storage.set("object",this._data)
		.then((successData)=>{
			// console.log("Data stored")
			// console.log(successData)
		})
		.then(()=>{
			this.ionViewDidLoad()
		})
	}

	getValue(){
		this.storage.get("object")
		.then((data)=>{
			this.cart = data
			// console.log(this.cart)
		})
		return this.cart
	}

	getDelivered(){
		this.storage.get("delivered")
		.then((data)=>{
			this.delivered = data
			// console.log(this.delivered)
		})
		return this.delivered
	}

	removeConnected(cart){
		let index = this.cart.indexOf(cart)
		this._del.push(this.cart[index])
		this.cart.splice(index,1)
		
		// console.log(this._del)
		this.storage.set("object",this.cart)
		.then((successData)=>{
			this._delivered.push(successData)
		})

		this.storage.set("delivered",this._del)
		.then((successDelivered)=>{
			// console.log(successDelivered)
		})
		.then(()=>{
			this.ionViewDidLoad()
		})		
	}

	clearStorage(){
		this.storage.clear()
	}
	*/

}


