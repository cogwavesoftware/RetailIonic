
import { BillerService } from './../biller-service';
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController, ModalController, LoadingController,
} from "ionic-angular";
// import {
//   AngularFireDatabase,
//   AngularFireList
// } from "@angular/fire/database";
// import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";
import { AuthService } from './../auth-service';
import { FoodService } from './../food-service';
import { GenericService } from './../generic-service';
import { GuestData } from "../../pages/GuestModel";
// declare let google: any;
import { DatePipe } from "@angular/common";
import { firebaseConfig } from '../../app/firebase.config';



@IonicPage()
@Component({
  selector: "page-address-list",
  templateUrl: "address-list.html"
})
export class AddressListPage {
  grandTotal: any;

  subTotal: any;
  address: any = {};
  addressList: any = [];
  payTotal: any;
  couponDiscount: any;
  deductedPrice: any;
  cart: Array<any>;
  GuestData: GuestData;
  orderDetails: any = {};
  pincodes: Array<any>;
  MobileNo: string;
  //Api: string;
  //branch: string;

  Deliveryoptions: string[] = ["TakeAway", "Home Delivery"];
  paymentmode: string[] = ["Cash", "Card", "Online", "Walet"];
  public pincodeMatched: boolean = false;
  public loyaltyPercentage: number = 0;
  public loyaltyPoints: number = 0;
  public leftLoyaltyPoint: number = 0;
  public checked: boolean = false;
  //public userRef: AngularFireList<any>;
  public loyaltyArray: any[] = [];
  public loyaltyLimit: number;
  public currency: {};
  public DeliveryOption: string;
  isTakeAway: boolean = false;

  // public db: AngularFireDatabase,
  // public af: AngularFireAuth,
  constructor(
    public foodSrv: FoodService, public genSrv: GenericService, private datePipe: DatePipe,
    public authSrv: AuthService, public modalCtrl: ModalController,
    public navCtrl: NavController, private billSrv: BillerService,
    private loadingCtrl: LoadingController,
    public navParams: NavParams,
    public alertCtrl: AlertController) 
    {
    this.currency = JSON.parse(localStorage.getItem('currency'));
    this.orderDetails.grandTotal = this.navParams.get("grandTotal");
    this.payTotal = this.orderDetails.grandTotal;
    this.orderDetails.couponDiscount = this.navParams.get("couponDiscount");
    this.orderDetails.subTotal = this.navParams.get("subTotal");
    this.orderDetails.deductedPrice = this.navParams.get("deductedPrice");
    this.orderDetails.tax = this.navParams.get("totalVat");
    this.DeliveryOption = this.navParams.get("DeliveryOption");
    this.orderDetails.DeliveryCharge = this.navParams.get("DeliveryCharge");

    this.MobileNo = localStorage.getItem('MobileNo');
    //this.Api = firebaseConfig.Api;
    //this.branch = firebaseConfig.BranchCode;

    if (this.orderDetails.grandTotal == undefined) {
      this.navCtrl.push("CartPage");
    }

    if (this.DeliveryOption == "TakeAway")
     {
      this.orderDetails.DeliveryOption = "TakeAway";
      this.foodSrv.GetMobileData(firebaseConfig.Api, this.MobileNo,this.genSrv.getBranchCode()).subscribe(res => {
        if (res != null) {
          this.orderDetails.shippingAddress = res;
          this.pincodeMatched = true;

          this.isTakeAway = true
          this.navCtrl.push("CheckoutPage", {
            orderDetails: this.orderDetails
          });
        }
        else {
          let data1 = { 'MobileNo': this.MobileNo }
          this.orderDetails.shippingAddress = data1;
          this.pincodeMatched = true;
          this.isTakeAway = true
          this.navCtrl.push("CheckoutPage", {
            orderDetails: this.orderDetails
          });
        }
      })

    }



    this.foodSrv.GetMobileDataList(firebaseConfig.Api, localStorage.getItem('MobileNo'),this.genSrv.getBranchCode()).subscribe(res => {
      debugger;
      if (res != null) {
        this.addressList = res;
      }
    })
    console.log(this.addressList)
    this.orderDetails.cart = JSON.parse(localStorage.getItem("Carts"));
  }

  //Add Address
  addAddress() {

    this.GuestData = {
      Mobile: Number(this.MobileNo),
      CustId: 0,
      CustName: "",
      Email: "",
      Address: "",
      Branch_Code: "",
      PinCode: "",
      City: "",
      Area: ""
    }

    let optionModal = this.modalCtrl.create('NewAddressPage', { Model: this.GuestData, Title: 'Guest Form' });
    optionModal.onDidDismiss(data1 => {
      if (data1 === false || data1 === undefined) {
        console.log(data1);
        console.log('data1');
        console.log('data2');
        //this.navCtrl.pop();
      }
      else {
        console.log(data1)
        console.log('data1')
        this.GuestData = {
          Mobile: data1.MobileNo,
          CustId: 0,
          CustName: data1.GuestName,
          Email: data1.Email,
          Address: data1.Address,
          Branch_Code: this.genSrv.getBranchCode(),
          PinCode: data1.PinCode,
          City: data1.City,
          Area: data1.Area
        }
        console.log(this.GuestData)
        console.log('this.GuestData')
        this.foodSrv.SaveAddressForm(firebaseConfig.Api, this.GuestData).subscribe(data => {
          if (data) {
            localStorage.setItem("MobileNo", data1.MobileNo);
            this.foodSrv.GetMobileDataList(firebaseConfig.Api, this.MobileNo, this.genSrv.getBranchCode()).subscribe(res => {
              if (res != null) {
                this.addressList = res;
              }
            })
          }
          else {
            console.log('SaveAddressForm For Error')
            let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'SaveAddressForm Notsaved Error<br/><b>Sorry Sorry!</b>',
              buttons: ['Ok']
            });
            alert.present();
          }
        }, error => {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Please Check Your Internet Connection<br/><b>Sorry Sorry!</b>',
            buttons: ['Ok']
          });
          alert.present();
        })

      }

    });
    optionModal.present();



  }

  //Selected Address
  selectAddress(key, address) {

    console.log(address)
    console.log('address')
    if (address.Address != "" && address.Area != "" && address.PinCode != "" && address.Mobile != "") {
      this.pincodeMatched = false;
      this.orderDetails.shippingAddress = address;
      this.pincodeMatched = true;
    }
    else {
      this.pincodeMatched = false;
      this.orderDetails.shippingAddress = address;

      this.pincodeMatched = false;
    }

  }



  checkOut() {
    this.orderDetails.DeliveryOption = "HomeDelivery";
    this.orderDetails.orderView = false;
    if (this.orderDetails.shippingAddress && this.pincodeMatched) {
      this.navCtrl.push("CheckoutPage", {
        orderDetails: this.orderDetails
      });
    } else if (this.pincodeMatched == false) {
      this.showAlert("We can not deliver to your Area!");
    } else {
      this.showAlert("Select Your Address First!");
    }
  }


  //not in use
  // checkOutretail() {
  //   // this.order =this.orderDetails;
  //   this.orderDetails.orderView = false;
  //   if (this.orderDetails.shippingAddress && this.pincodeMatched) {

  //     console.log(this.orderDetails);
  //     var timerandom = this.datePipe.transform(new Date(), "ddMMyymmss");
  //     var Rans = +timerandom * Math.floor(Math.random() * (99999 - 10000)) + 10000;
  //     if (this.isTakeAway == true)
  //       var TrancactionId = "T" + Rans;
  //     else
  //       var TrancactionId = "H" + Rans;
  //     // this.order.orderId = TrancactionId;

  //     console.log(this.orderDetails);

  //     this.billSrv.SaveTransNo(firebaseConfig.Api, this.MobileNo, TrancactionId, this.orderDetails.grandTotal, this.genSrv.getBranchCode(),0).subscribe(res => {
  //       if (res) {
  //         //cASHON DELIVERY Pyment
  //         let loader1 = this.loadingCtrl.create({
  //           content: "Loading Wait...",
  //         });
  //         loader1.present();
  //         this.billSrv.SubmitPosOrder(firebaseConfig.Api, this.orderDetails).subscribe(data => {
  //           if (data) {
  //             console.log('Submitorder  saveed')
  //             loader1.dismiss();
  //             this.navCtrl.setRoot("ThankyouPage");
  //           }
  //           else {
  //             console.log('Submitorder not saveed')
  //             loader1.dismiss();
  //             this.navCtrl.setRoot("ThankyouPage");
  //             //Submitorder not saveed
  //           }
  //         })


  //       }

  //     })




  //   }
  //   else if (this.pincodeMatched == false) {
  //     this.showAlert("We can not deliver to your Area!");
  //   } else {
  //     this.showAlert("Select Your Address First!");
  //   }
  // }

  

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: "Sorry!",
      subTitle: message,
      buttons: ["OK"]
    });
    alert.present();
  }




  updateLoyality(event) {
    if (this.loyaltyPoints >= this.loyaltyLimit) {
      this.checked = event.value;
      if (event.value == true) {
        if (this.payTotal < this.loyaltyPoints) {
          this.orderDetails.grandTotal = 0;
          this.leftLoyaltyPoint = this.loyaltyPoints - this.payTotal;
        } else if (this.payTotal > this.loyaltyPoints) {
          this.orderDetails.grandTotal = this.payTotal - this.loyaltyPoints;
          this.leftLoyaltyPoint = 0;
        }
      } else {
        this.orderDetails.grandTotal = this.navParams.get("grandTotal");
      }
    }
  }
}
