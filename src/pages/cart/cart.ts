import { BillerService } from './../biller-service';
import { GenericService } from './../generic-service';
import { Component } from "@angular/core";
import { NavController, IonicPage, ToastController } from "ionic-angular";
import { AlertController, LoadingController } from "ionic-angular";
//import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";
import { firebaseConfig } from '../../app/firebase.config'
@IonicPage()
@Component({
  selector: "page-cart",
  templateUrl: "cart.html"
})
export class CartPage {
  Cart: any[] = [];
  
  public settings: any = {};
  subTotal: any;
  GrandTotal: any;
  couponDiscount: any = 0;
  deductedPrice: number = 0;
  otherTaxes = 0.0;
  otherDeliveryAmount=0.0;
  //setting: AngularFireObject<any>;
  noOfItems: any;
  total: any;
  coupons: any = [];
  retailOpen:boolean;
  public Deliveryop:string="0"
  public IsHomeDelivery :boolean=false;
  currency: {};
  Deliveryoptions: string[] =["TakeAway","Home Delivery"];
  constructor(
  //  public db: AngularFireDatabase,
    public navCtrl: NavController,
    public alertCtrl: AlertController, public genSrv: GenericService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,public _BillSr:BillerService
  ) {
    

   

    this.currency = JSON.parse(localStorage.getItem('currency'));
    this.Cart = JSON.parse(localStorage.getItem("Carts"));

    this.retailOpen=this.genSrv.getOpenstatus();

    //console.log("cart-"+JSON.stringify(this.Cart));
    if (this.Cart != null) {
      this.noOfItems = this.Cart.length;
      this.callFunction();
    }
    // this.db
    //   .list("/coupons", ref => ref.orderByChild("value"))
    //   .valueChanges()
    //   .subscribe(response => {
    //     this.coupons = response;
    //   });

    this._BillSr.GetdeliveryAmount(firebaseConfig.Api).subscribe(res=>{
       this.otherDeliveryAmount=Number(res);
    })
  }

  applyCoupon() {
    var subTotals = this.subTotal;
    this.deductedPrice = Number(
      (this.couponDiscount / 100 * subTotals).toFixed(2)
    );
    subTotals = subTotals - this.couponDiscount / 100 * subTotals;
    this.GrandTotal = Number((subTotals + this.total).toFixed(2));
  }

  deleteItem(data) {
    for (var i = 0; i <= this.Cart.length - 1; i++) {
      if (this.Cart[i].item.itemId == data.item.itemId)
      {
        this.Cart.splice(i, 1);
        this.callFunction();
        if (this.Cart.length == 0) {
          localStorage.removeItem("Carts");
          this.noOfItems = null;
        } else {
          localStorage.setItem("Carts", JSON.stringify(this.Cart));
          this.Cart = JSON.parse(localStorage.getItem("Carts"));
          this.noOfItems = this.noOfItems - 1;
        }
      }
      this.callFunction();
    }
  }

  deleteAll()
  {}

  callFunction() {

    
    let subTotal = 0;
    for (var i = 0; i <= this.Cart.length - 1; i++) {
      subTotal = subTotal + this.Cart[i].itemTotalPrice;
    }
    this.subTotal = Number(subTotal.toFixed(2));

    //this.total = Number((this.subTotal * 5 / 100).toFixed(2));
   // this.total = this.subTotal;
     this.total=0.0    
    this.GrandTotal = Number((this.subTotal + this.total).toFixed(2));
    if(this.Deliveryop!= "Home Delivery")
    {
      this.otherTaxes=0.0;
      this.GrandTotal=0;
      this.GrandTotal = Number((this.subTotal + this.total +  this.otherTaxes).toFixed(2));
      this.GrandTotal=Math.round(this.GrandTotal).toFixed(2);
      console.log('this.GrandTotal=Math.floor(this.GrandTotal).toFixed(2)')
      console.log(this.GrandTotal)
    }
    else{
      this.otherTaxes=this.otherDeliveryAmount;
      this.GrandTotal=0;
      this.GrandTotal = Number((this.subTotal + this.total +  this.otherTaxes).toFixed(2));
      this.GrandTotal=Math.round(this.GrandTotal).toFixed(2);
      console.log('this.GrandTotal=Math.floor(this.GrandTotal).toFixed(2)')
      console.log(this.GrandTotal)
    }
    
  
  }

  nav() {
    
      if(this.Deliveryop=="0")
      {        
        let alert = this.alertCtrl.create({
          title: 'SORRY',
          subTitle: 'Please Select Order Option!',
          buttons: ['Ok']
        });
        alert.present();

      }
      else{

        if (localStorage.getItem("uid") == null) {
          let alert = this.alertCtrl.create({
            title: "SORRY!",
            subTitle: "You Have to Login First!",
            buttons: [
              {
                text: "Ok",
                handler: data => {
                  this.navCtrl.push("LoginPage");
                }
              }
            ]
          });
          alert.present();
        } 
        else {

            this.navCtrl.push("AddressListPage", {
              grandTotal: Math.round(this.GrandTotal) ,
              subTotal: this.subTotal,
              couponDiscount: this.couponDiscount,
              deductedPrice: this.deductedPrice,
              totalVat: this.total,
              DeliveryCharge:this.otherTaxes,
              DeliveryOption:this.Deliveryop
            });  
          
        }

      }
  }



  GetSelectedValue(Option:string)
  {

     if(Option=="TakeAway")
     {
       this.Deliveryop=Option;
       this.IsHomeDelivery==false;
       console.log(Option)
       this.otherTaxes=0.0;
       this.GrandTotal=0;
       this.GrandTotal = Number((this.subTotal + this.total +  this.otherTaxes).toFixed(2));
      console.log(this.IsHomeDelivery)
     }
     else{
      this.Deliveryop=Option;
      this.IsHomeDelivery==true;
      this.otherTaxes=this.otherDeliveryAmount;
      this.GrandTotal=0;
      this.GrandTotal = Number((this.subTotal + this.total +  this.otherTaxes).toFixed(2));
      console.log(Option)
      console.log(this.IsHomeDelivery)
     }
    
  }



  add(data) {

      

    this.Cart = JSON.parse(localStorage.getItem("Carts"));
    let count=0;
    let itemcount=0
    if (this.Cart != null) {

      for (let i = 0; i <= this.Cart.length - 1; i++)
      {
       if (this.Cart[i].item.itemId == data.ItemCode)
        {    
         count=this.Cart[i].item.MaxQunatity;
         itemcount=this.Cart[i].item.itemQunatity+1;
        }
      }

      console.log('itemcount')
      console.log(itemcount)
    }



    
    if(count>=itemcount)
     {
      data.item.itemQunatity = data.item.itemQunatity + 1;
      for (let i = 0; i <= this.Cart.length - 1; i++) {
        let ExtotalPrice = 0;
        let totalPrice = 0;
        if (
          this.Cart[i].item.itemId == data.item.itemId
          
        ) {
          this.Cart[i].item.itemQunatity = data.item.itemQunatity;
          for (let j = 0; j <= this.Cart[i].item.extraOptions.length - 1; j++) {
              ExtotalPrice =
              ExtotalPrice + this.Cart[i].item.extraOptions[j].value;
          }
          // if (this.Cart[i].item.price.specialPrice) {
          //   totalPrice = ExtotalPrice + this.Cart[i].item.price.specialPrice;
          // } else {
          //   totalPrice = ExtotalPrice + this.Cart[i].item.price.value;
          // }
          this.Cart[i].itemTotalPrice =data.item.price * data.item.itemQunatity;
        }
      }
      localStorage.setItem("Carts", JSON.stringify(this.Cart));
      this.callFunction();
      this.createToaster(data.item.title.split('-') + ' Added to the  Cart', 2000)
      //this.applyCoupon();
    }
    else{
      this.createToaster('You cannot add any more quantities for this product!', 2000)
    }
  }

 


  remove(data) {
  
      debugger;
    if (data.item.itemQunatity > 1) {
      data.item.itemQunatity = data.item.itemQunatity - 1;
      for (let i = 0; i <= this.Cart.length - 1; i++) {
        let ExtotalPrice = 0;
        let totalPrice = 0;
        if (
          this.Cart[i].item.itemId == data.item.itemId &&
          this.Cart[i].item.price.pname == data.item.price.pname
        ) {
          this.Cart[i].item.itemQunatity = data.item.itemQunatity;
          for (let j = 0; j <= this.Cart[i].item.extraOptions.length - 1; j++) {
            ExtotalPrice =
              ExtotalPrice + this.Cart[i].item.extraOptions[j].value;
          }
          // if (this.Cart[i].item.price.specialPrice) {
          //   totalPrice = ExtotalPrice + this.Cart[i].item.price.specialPrice;
          // } else {
          //   totalPrice = ExtotalPrice + this.Cart[i].item.price.value;
          // }
          this.Cart[i].itemTotalPrice =data.item.price * data.item.itemQunatity;
        }
      }
      localStorage.setItem("Carts", JSON.stringify(this.Cart));
      this.callFunction();
     this.createToaster(data.item.title.split('-') + ' Removed from  Cart', 2000)
    

      //this.applyCoupon();
    }


  }
  ionViewDidLoad() {
   
    if(this.IsHomeDelivery==false)
    {
      this.otherTaxes = 0;
    }
    else{
      this.otherTaxes =this.otherDeliveryAmount;   
    }
    this.callFunction();
  }


  createToaster(message, duration) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'top',
      cssClass: 'toast-green'
    });
    toast.present();
  }
  isCart(): boolean {
    return localStorage.getItem("Carts") == null || this.Cart.length == 0
      ? false
      : true;
  }

  gotoHome() {
    localStorage.removeItem("Carts");
    this.navCtrl.push("HomePage");
  }
}
