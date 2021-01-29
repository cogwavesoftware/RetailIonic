import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, ViewController,NavParams,ToastController } from "ionic-angular";
import { Nav, Platform } from "ionic-angular";
import { Slides } from "ionic-angular";
// import { CallNumber } from "@ionic-native/call-number";
// import { EmailComposer } from "@ionic-native/email-composer";
import { CartService } from "../../pages/cart.service";
@IonicPage()
@Component({
  selector: "page-about-us",
  templateUrl: "about-us.html",
  //providers: [CallNumber, EmailComposer]
})
export class AboutUsPage {
  // @ViewChild(Slides) slides: Slides;
  // @ViewChild(Nav) nav: Nav;
  items: any = [];
  MobileNo:string;
  mySlideOptions = {
    initialSlide: 1,
    loop: true,
    autoplay: 2000,
    pager: false
  };
  
  currency: {};
  Cart: any[] = [];
  ItemsModel:any=[];
  noOfItems: any;
  Categories: any = [];
  items1: any;
  Subitems: any;
  SubitemsArray: any = [];
  selectedItems: any = [];
  count: number;
 
  Show:boolean=false;
  CommonData: any;
  public cart = {
    itemId: String,
    extraOptions: [],
    price: 0,
    title: "",
    thumb: String,
    itemQunatity: this.count
  };

  public cart1 = {
    itemId: String,
    extraOptions: [],
    price: 0,
    title: "",
    thumb: String,
    itemQunatity: this.count
  };

  constructor(
    public platform: Platform,public toastCtrl:ToastController,public cartService : CartService,
    public navCtrl: NavController,public _viewCtrl:ViewController,
    
    public navParams: NavParams

  ) {
    this.items = navParams.get('items');
    
  }

  goToSlide() {
    //this.slides.slideTo(2, 500);
  }


  dismissNCModal() {
    this._viewCtrl.dismiss(false).catch(() => { });
  }

  removeQuantity(index: number, data:any,CrQty:number) {
  //1//
    this.Cart = JSON.parse(localStorage.getItem("Carts"));

      this.items[index].Qty =
        this.items[index].Qty === 0
          ? 0
          : this.items[index].Qty - 1;
          console.log(data)
          console.log('data')

          if (CrQty > 1) {
            data.Qty =CrQty - 1;
            console.log(this.Cart);
            console.log('this.Cart');
            for (let i = 0; i <= this.Cart.length - 1; i++) {
              let ExtotalPrice = 0;
              let totalPrice = 0;
              if (this.Cart[i].item.itemId == data.ItemCode )
               {
                this.Cart[i].item.itemQunatity = data.Qty;
                for (let j = 0; j <= this.Cart[i].item.extraOptions.length - 1; j++) {
                  ExtotalPrice =
                    ExtotalPrice + this.Cart[i].item.extraOptions[j].value;
                }
                //this.Cart[i].item.price = data.ItemRate *  data.Qty;
                this.Cart[i].itemTotalPrice =data.ItemRate *  data.Qty;
              }
            }
            localStorage.setItem("Carts", JSON.stringify(this.Cart));   
  }
  else{

    for(var i=0; i<= this.Cart.length-1;i++)
    {
      if(this.Cart[i].item.itemId==data.ItemCode)
      {
         this.Cart.splice(i,1);
         if(this.Cart.length==0)
         {
          localStorage.removeItem("Carts");
          this.noOfItems = null;
         }else{
          localStorage.setItem("Carts", JSON.stringify(this.Cart));
          this.Cart = JSON.parse(localStorage.getItem("Carts"));
          this.noOfItems = this.noOfItems - 1;
         }
      }
    }
    console.log(this.cart)
  }
  let data1={'MobileNo': "dd"};
  this._viewCtrl.dismiss(data1);
  }


  contact() {
    let email = {
      // You can change This Email to your own Email to receive contact Email.
      to: "ionicfirebaseapp@gmail.com",
      isHtml: true
    };
    //this.emailComposer.open(email);
  }


  addQuantity(data: any,index: number) {

    this.Show=true;
    this.items[index].Qty =
      this.items[index].Qty
        ? this.items[index].Qty + 1
        : 1;
    this.MobileNo = localStorage.getItem("MobileNo")
    console.log(this.MobileNo)
    if (this.MobileNo == null) {
      this.createToaster1('Please Reload the Page and Enter MobileNo Sorry!',2000);
      this.navCtrl.push("HomePage");
    }
    this.cart1.title = data.ItemName;
    this.cart1.itemId = data.ItemCode;
    this.cart1.thumb = data.thumb;

    this.cart1.itemQunatity = data.Qty;
    this.cart1.price = Number(data.ItemRate) * 1;

      this.cartService.OnsaveLS(this.cart1);
      this.Cart = JSON.parse(localStorage.getItem("Carts"));
      console.log("toatal cart-" + JSON.stringify(this.Cart));
      if (this.Cart != null) {
        this.noOfItems = this.Cart.length;
        this.createToaster(data.ItemName.split('-') + ' Added to the Cart', 2000)
        this.Show=false;
      }
      let data1={'MobileNo': "dd"};
      // let data1 = { 'MobileNo': form.value.Mobile,'GuestName':form.value.CustName,'Email':form.value.Email,'Address':form.value.Address,'PinCode':form.value.PinCode,'City':form.value.City,'Area':form.value.Area};
      this._viewCtrl.dismiss(data1);
      
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


  createToaster1(message, duration) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'middle',
      cssClass: 'toast-green'
    });
    toast.present();
  }

}

