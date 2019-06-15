import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UtilsProvider {
	private path = {
		getcartsURL:"http://localhost:4000/getcarts",
		getcartbyidURL:"http://localhost:4000/getcartbyid/",
		deliveredURL:"http://localhost:4000/delivered",
		deliveredTrueURL:"http://localhost:4000/deliveredtrue",
		readyURL:"http://localhost:4000/ready",
		getReadyURL:"http://localhost:4000/getready",
		updateHomeDeliveryURL: "http://localhost:4000/homedelivery"
	}

	private online = {
		getcartsURL:"https://genieinmypocket.herokuapp.com/getcarts",
		getcartbyidURL:"https://genieinmypocket.herokuapp.com/getcartbyid/",
		deliveredURL:"https://genieinmypocket.herokuapp.com/delivered",
		deliveredTrueURL:"https://genieinmypocket.herokuapp.com/deliveredtrue",
		readyURL:"https://genieinmypocket.herokuapp.com/ready",
		getReadyURL:"https://genieinmypocket.herokuapp.com/getready",
		updateHomeDeliveryURL: "https://genieinmypocket.herokuapp.com/homedelivery"
	}

	constructor(
		public http: Http
	){}

	// getcartbyid
	GetCartById(id){
		return new Promise((resolve,reject) => {
			this.http.get(this.path.getcartbyidURL+id)
			.subscribe(res => {
				resolve(res.json())
			},(err)=>{
				reject(err);
			})
		})
	}
	//get carts posted
	getCartsPosted(){		
		return new Promise((resolve,reject)=>{
			this.http.get(this.path.getcartsURL)
			.subscribe(res => {  
				console.log("RES:",res)
				resolve(res.json());
			},(err)=>{
				reject(err);
			});
		})	
  			
	}

	postMovieTvShowCart(data){
		//preloader
		// console.log("calling postMovieTvShowCart");			
  		let headers = new Headers();
      	headers.append("Accept","application/json");
  		headers.append("Content-Type", "application/json");

  		return this.http.post("https://sltvcompanionserver.herokuapp.com/cart/createcart", JSON.stringify(data),{headers:headers})
  		.map(res=>res.json())
	  	//kill loader
	}

	// MARK AS DELIVERED
	Delivered(data){
		return new Promise((resolve,reject)=>{
			let headers = new Headers();
			headers.append("Accept","application/json");
			headers.append("Content-Type", "application/json");

			this.http.post(this.path.deliveredURL,data,{headers})
			.subscribe((res)=>{
				resolve(res.json())
			},(err)=>{
				reject(err);
			})
		})
	}

	GetDelivered(){
		return new Promise((resolve,reject)=>{
			this.http.get(this.path.deliveredTrueURL)
			.subscribe(res => {
				resolve(res.json())
			},(err)=>{
				reject(err);
			})
		})
	}

	// MARK AS READY
	Ready(data){
		return new Promise((resolve,reject)=>{
			let headers = new Headers();
			headers.append("Accept","application/json");
			headers.append("Content-Type", "application/json");

			this.http.post(this.path.readyURL,data,{headers})
			.subscribe((res)=>{
				resolve(res.json())
			},(err)=>{
				reject(err);
			})
		})
	}

	GetReady(){
		return new Promise((reject,resolve)=>{
			this.http.get(this.path.getReadyURL)
			.subscribe(res => {
				resolve(res.json())
			},(err)=>{
				reject(err);
			})
		})
	}

	// HomeDelivery
	HomeDelivery(data){
		return new Promise((resolve,reject)=>{
			let headers = new Headers();
			headers.append("Accept","application/json");
			headers.append("Content-Type", "application/json");

			this.http.post(this.path.updateHomeDeliveryURL,data,{headers})
			.subscribe(res => {
				resolve(res.json())
			},(err)=>{
				reject(err)
			})
		})
	}
}
