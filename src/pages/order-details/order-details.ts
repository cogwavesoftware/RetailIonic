import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController ,AlertController} from "ionic-angular";
import { map } from "rxjs/operators";
import { BillerService } from './../biller-service';
import { GenericService } from './../generic-service';
import { firebaseConfig } from '../../app/firebase.config'

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@IonicPage()
@Component({
  selector: "page-order-details",
  templateUrl: "order-details.html"
})
export class OrderDetailsPage {
 

  orders: any;
  ordersDetails: any[] = [];
  public noOfItems: number;
  public currency: {};
  paymenturl:any;
  loadintervel:any;
  mobile:string;
  constructor(
    
    public navCtrl: NavController,public billSrv: BillerService, public genSrv: GenericService,
    public loadingCtrl: LoadingController,public _iab: InAppBrowser,
     public _alertCtrl: AlertController,
  ) 

  {

    this.currency = JSON.parse(localStorage.getItem('currency'));
    this.mobile= localStorage.getItem('MobileNo');
    let loader = this.loadingCtrl.create({
          content: "Please wait..."
      });


      loader.present();
    
      this.billSrv.GetPaymentUrl(firebaseConfig.Api).subscribe(res=>{
        this.paymenturl=res;
        console.log(this.paymenturl)
      })
  

 
    this.billSrv.GetItemdetail(firebaseConfig.Api,this.mobile, this.genSrv.getBranchCode()).subscribe(
      data => {
        console.log(data);
        this.orders = data;

      },
      error => {
       // this.navCtrl.setRoot("Error", { code: "HAILHYDRA-002", title: "NOT FOUND", message: "NetWork Error" });
        loader.dismiss();
      }, () => {
        loader.dismiss();
      });

  }

  buyAgain(key) {
    this.navCtrl.push("ProductDetailsPage", { id: key });
  }

  isOrders(): boolean {
    
    return this.orders == 0 ? false : true;
  }
 
}
