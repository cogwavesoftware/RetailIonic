import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController ,AlertController} from "ionic-angular";
import { map } from "rxjs/operators";
import { BillerService } from './../biller-service';
import { GenericService } from './../generic-service';
import { firebaseConfig } from '../../app/firebase.config'

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@IonicPage()
@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html',
})
export class OrderListPage {
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
  

 
    this.billSrv.getbillpreviewByMobile(firebaseConfig.Api,this.mobile, this.genSrv.getBranchCode()).subscribe(
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

  ionViewDidLeave()
  {
    
    clearInterval(this.loadintervel);
  }



  ionViewWillEnter() {
    let cart: Array<any> = JSON.parse(localStorage.getItem("Cart"));
    this.noOfItems = cart != null ? cart.length : null;


  }

  isOrders(): boolean {
    
    return this.orders == 0 ? false : true;
  }

 

  onCheckOut(order:any)
  {
   
         var path=this.paymenturl + order.BillNo +"&TransNo=" + order.TranscationNo;
          let confirm = this._alertCtrl.create({
            title: 'Credits',
            message: 'Are You sure Pay your  Bill?',
            buttons: [
              {
                text: 'No',
                handler: () => {
                }
              },
              {
                text: 'Yes',
                handler: () => {
                  this._iab.create(path,'_blank');
                  let loader = this.loadingCtrl.create({
                    content: "Loading Wait...",
                  });
                  loader.present();
                  loader.dismiss();
                   this.loadintervel = setInterval(() => {                      
                    this.billSrv.CheckPayment(firebaseConfig.Api, order.TranscationNo,this.genSrv.getBranchCode(),order.BillNo).subscribe(res => {
                      if(res)
                      {                        
                        clearInterval(this.loadintervel);
                        console.log('Submitorder  start')
                        this.navCtrl.push("HomePage");
                      }
                      else{
                        console.log('False')
                        console.log(this.loadintervel)
                        console.log('False')
                      }      
                    });
                  }, 9000);      
                }
              }
            ]
          });
          confirm.present();
        }
        

}
