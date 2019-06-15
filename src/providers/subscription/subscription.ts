import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
// import { resolve } from 'dns'; 

@Injectable()
export class SubscriptionProvider {
  private offline = {
    SubscribeURL: "http://localhost:4000/subscribe",
    CheckSubscriptionURL: "http://localhost:4000/checksubscription/",
  }

  constructor(public http: Http) {
    console.log('Hello SubscriptionProvider Provider');
  }

  Subscribe(data){
    console.log("INCOMING SUBSCRIBE DATA:",data)
    return new Promise((resolve,reject) => {
      let headers = new Headers(); 
      headers.append("Accept","application/json"); 
      headers.append("Content-Type","application/json");   
      
      this.http.post(this.offline.SubscribeURL,data,{headers})
        .subscribe(res => {  
          resolve(res.json());
      },(err)=>{
          reject(err);
      });
    })    
  }

  CheckSubscription(userName){
    return new Promise((resolve,reject) => {
      this.http.get(this.offline.CheckSubscriptionURL+userName)
      .subscribe(res => {
        resolve(res.json());
      },(err)=>{
          reject(err);
      });
    })
  }

}
