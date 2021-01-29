
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";
import { NgForm } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { BillerService } from './../biller-service';
import { GenericService } from './../generic-service';
import { firebaseConfig } from '../../app/firebase.config'
@IonicPage()
@Component({
  selector: "page-checkout",
  templateUrl: "checkout.html"
  //providers: [ CheckoutService,InAppBrowser] //, PayPal, 
})
export class CheckoutPage {
  date: any;
  orderId: any;
  order: any = {};
  userId: any;
  userDetails: any = {
    email: "",
    name: "",
    userid: ""
  };
  //paymenturl="http://profileui.cogwave.in/Payment/PosBill?CheckinNo=";
  paymenturl:any;
  color: any;
  str: any;
  Option:string;
  paymentType: string="Online Payment";
  paymentDetails: any = {
    paymentStatus: true
  };
  stripe_card: any = {};
  public paymentTypes: any = [
    // {
    //   default: true,
    //   type: "Online Payment",
    //   value: "Online",
    //   logo: "assets/img/pay.png"
    // },
    { 
      default: true, 
      type: "Cash On Delivery",
      value: "COD",
      logo: "assets/img/Cash.png"
     }
  ];
  MobileNo:string;
  Api:string;
  branch:string;
  loadintervel:any;
  constructor(
    public navCtrl: NavController, private datePipe: DatePipe,private _iab:InAppBrowser,
    public navParams: NavParams,private billSrv:BillerService,
    private loadingCtrl: LoadingController,public genSrv: GenericService,
    public alertCtrl: AlertController) 
  {
    this.order = this.navParams.get("orderDetails");
    this.Option = this.navParams.get("Option");
    this.str = "#";
    var num = Math.floor(Math.random() * 900000) + 100000;
    this.color = this.str.concat(num);
    this.MobileNo = localStorage.getItem('MobileNo');
    this.Api =firebaseConfig.Api;
    this.branch = this.genSrv.getBranchCode();

    console.log(this.order)
    console.log('this.order')
    
  }


    
  ionViewDidLeave()
  {
    clearInterval(this.loadintervel);
  }

  ionViewDidLoad() {

     this.billSrv.GetPaymentUrl(this.Api).subscribe(res=>{
       this.paymenturl=res;
       console.log(this.paymenturl)
     })

    // this.paymentType = "Braintree";
    // if (this.af.auth.currentUser) {
    //   this.userId = this.af.auth.currentUser.uid;
    //   this.userDetail = this.db.object("/users/" + this.userId);
    //   this.userDetail.valueChanges().subscribe((res: any) => {
    //     res.mobileNo
    //       ? (this.userDetails = {
    //         email: res.email,
    //         name: res.name,
    //         mobileNo: res.mobileNo,
    //         userid: this.userId
    //       })
    //       : (this.userDetails = {
    //         email: res.email,
    //         name: res.name,
    //         userid: this.userId
    //       });
    //   });
    // }
  }

  choosePaymentType(paymentType) {
    this.paymentType = paymentType;
    this.order.paymentType = paymentType;
    this.paymentDetails.paymentType = paymentType;
    console.log(this.order)
    console.log(this.order.paymentType)
    console.log('choosePaymentType')
    clearInterval(this.loadintervel);
  }



  onCheckOut()
  {
   
    console.log(this.paymentType)
    var timerandom = this.datePipe.transform(new Date(), "ddMMyymmss");
    var Rans = +timerandom * Math.floor(Math.random() * (99999 - 10000)) + 10000;
    var TrancactionId="R"+ Rans;
    this.order.orderId = TrancactionId;
    this.order.paymentType ="Cash On Delivery";
    this.order.Branch = this.branch;
    console.log(this.order);
    let clusId=this.order.shippingAddress.CustId;
    console.log(clusId)
    let OrderType=this.order.DeliveryOption;
    //this.order.Outlet=localStorage.getItem("OltCode");
   // var path=this.paymenturl + this.MobileNo +"&TransNo=" + TrancactionId;
    this.billSrv.SaveTransNo(this.Api,this.MobileNo,TrancactionId, this.order.grandTotal,this.branch,clusId,OrderType).subscribe(res=>{
      if(res)
      {
        console.log('clusId')
             //cASHON DELIVERY Pyment
             let loader1 = this.loadingCtrl.create({
              content: "Loading Wait...",
            });
            loader1.present();
            this.billSrv.SubmitPosOrder(this.Api, this.order).subscribe( data => {           
              if(data)
              {
                console.log('Submitorder  saveed')
                loader1.dismiss();
                this.navCtrl.setRoot("ThankyouPage");
                
              }
               else{
                 console.log('Submitorder not saveed')
                loader1.dismiss();
                this.navCtrl.setRoot("ThankyouPage");
                 //Submitorder not saveed
               }      
          })
        

      }
       
    })
    
  }
  


  // saveLoyaltyData(orderId) {
  //   if (this.order.appliedLoyaltyPoints == true) {
  //     let loayltyObj: any = {
  //       credit: false,
  //       points: -Number(this.order.usedLoyaltyPoints),
  //       orderId: orderId,
  //       createdAt: Date.now()
  //     };
  //     this.db.list("users/" + this.userId + "/loyaltyPoints").push(loayltyObj);
  //     this.db.list("/orders/" + orderId + "/loyaltyPoints")
  //       .push(loayltyObj).then(result => {
  //         // console.log("loyaltyUpdated-" + result);
  //       });
  //   } else {
  //     console.log("loyalaty Not applied!!");
  //   }
  // }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      subTitle: message,
      buttons: ["OK"]
    });
    alert.present();
  }

}
