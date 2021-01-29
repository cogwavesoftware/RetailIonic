
import { BillerService } from './../biller-service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController,  AlertController } from 'ionic-angular';
import { firebaseConfig } from '../../app/firebase.config'

import { GenericService } from './../generic-service';
/**
 * Generated class for the BillPreviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
   name: 'BillPreviewPage',
  segment: 'TrNo/:TrNo/BillNo/:BillNo'
  //segment: 'cin/:checkinno/tbl/:OrgTableNo/Olt/:OrgOltCode/OtName/:OrgOltName/TrNo/:Transaction/Stw/:StwardNo/Qrcodes/:Qrcode/guestname/:guestname/HotelName/:HotelName'
})

@Component({
  selector: 'page-bill-preview',
  templateUrl: 'bill-preview.html',
})
export class BillPreviewPage {
  BillNo: string;
  orders: any;
  //cart: Cart;
  branch: string;
  Path: string;
  bilno:string="123";
  loadintervel:any;
  paymenturl:any;
  
  TrNo:string;
  GuestName:string;
  constructor(
    public modalCtrl: ModalController,
    public genSrv: GenericService,
    public navCtrl: NavController,public _iab: InAppBrowser,
    public navParams: NavParams, public _alertCtrl: AlertController,
    public billSrv: BillerService, public _loadingCtrl: LoadingController,
    ) {
    
      
    this.TrNo=this.navParams.get("TrNo");
    this.BillNo=this.navParams.get("BillNo");
   
    let loader = this._loadingCtrl.create({
      content: "Loading Wait...",
    });

    loader.present();
    
    this.billSrv.GetPaymentUrl(firebaseConfig.Api).subscribe(res=>{
      this.paymenturl=res;
      console.log(this.paymenturl)
    })


    this.billSrv.GetBillPreview(firebaseConfig.Api, this.TrNo, this.genSrv.getBranchCode()).subscribe(
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




  goToFeedback(order:any) {
    // console.log(order)
    // var mobile=order.MobileNo;
    
    // this.cart=order;
    // this.cart.CheckInNo=order.BillNo;
    // this.cart.GuestName=this.GuestName;
    // this.cart.GuestCode=mobile;
    //this.navCtrl.push(Feedback, { cart: this.cart })
  }
 


  onCheckOut()
  {
   
         var path=this.paymenturl + this.BillNo +"&TransNo=" + this.TrNo;
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
                  let loader = this._loadingCtrl.create({
                    content: "Loading Wait...",
                  });
                  loader.present();
                  loader.dismiss();
                   this.loadintervel = setInterval(() => {                      
                    this.billSrv.CheckPayment(firebaseConfig.Api, this.TrNo,this.genSrv.getBranchCode(),this.BillNo).subscribe(res => {
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
 

