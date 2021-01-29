

import { Component } from "@angular/core";
import { IonicPage, NavController, ViewController, LoadingController,
   ToastController, NavParams, ModalController, AlertController,Platform } from "ionic-angular";
// import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { map } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { AuthService } from './../auth-service';
import { CartService } from "../../pages/cart.service";
import { GuestData } from "../../pages/GuestModel";
import { DatePipe } from "@angular/common";
import { CategoryPage } from "../category/category";
import { FoodService } from './../food-service';
import { GenericService } from './../generic-service';
import { NgForm } from "@angular/forms";
import { BillerService } from './../biller-service';
import { firebaseConfig } from '../../app/firebase.config'
import { BillPreviewPage } from '../bill-preview/bill-preview'

export class categories {
  CategoryId: string;
  description: string;
  thumb: string;
  Category: string;
}

export class ItemsModel {
  CatCode: number;
  ItemCode: string;
  ItemName: string;
  ItemRate: string;
  Qty: number;
  Size: string;
  offerPercentage: string;
  MainItemCode: Number;
  thumb: string;
  IsMain: boolean;
  SubItemQty: number
}
@IonicPage({
  // name: 'HomePage',
  //segment: 'cin/:cin'
  //segment: 'cin/:checkinno/tbl/:OrgTableNo/Olt/:OrgOltCode/OtName/:OrgOltName/TrNo/:Transaction/Stw/:StwardNo/Qrcodes/:Qrcode/guestname/:guestname/HotelName/:HotelName'
})

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})


export class HomePage {

  IsOpened: boolean;
  statusRes: string;
  OfferCount: number;
  OtpNo:number;
  mobileNos:any;
  mySlideOptions = {
    initialSlide: 1,
    loop: true,
    autoplay: 2000,
    pager: false
  };
  guestname: string;
  Transaction: string
  currency: {};
  Cart: any[] = [];
  ItemsModel: any = [];
  noOfItems: any;
  uid;
  Olt: string;
  mdcategory: number;
  api: any;
  cin: string;
  branch: string;
  OltCode: string;
  OltName: string;
  Categories: any = [];
  items: any = [];
  items1: any;
  Subitems: any;
  SubitemsArray: any = [];
  selectedItems: any = [];
  count: number;
  ApiMobile: any = "0";
  MobileNo: string;
  GuestData: GuestData;
  GuestContactNo: string;
  Show: boolean = false;
  CommonData: any;
  public cart = {
    itemId: String,
    extraOptions: [],
    price: 0,
    title: "",
    thumb: String,
    Size: String,
    itemQunatity: this.count,
    MaxQunatity:0
  };

  public cart1 = {
    itemId: String,
    extraOptions: [],
    price: 0,
    title: "",
    thumb: String,
    Size: String,
    itemQunatity: this.count,
    MaxQunatity:0
  };


  constructor(private http: HttpClient, private datePipe: DatePipe, public _viewCtrl: ViewController,
    public toastCtrl: ToastController, public navParams: NavParams, public alertCtrl: AlertController,
    public navCtrl: NavController, public cartService: CartService, public modalCtrl: ModalController,
    public foodSrv: FoodService, public genSrv: GenericService,public billSrv: BillerService,
     public loadingCtrl: LoadingController, public authSrv: AuthService,private platform: Platform
  ) {

    platform.ready().then(() => {
      // this.appVersion.getVersionNumber().then(ver => this.appversion = ver);
    });

    this.currency = JSON.parse(localStorage.getItem('currency'));
    this.MobileNo = localStorage.getItem('MobileNo');


    let loader = this.loadingCtrl.create({
      content: "Please wait...",

    });

    this.api=firebaseConfig.Api;

    loader.present().then(() => {

      this.foodSrv.GetAppConfigure(firebaseConfig.Api).subscribe(datares=>{
        console.log(datares)
        this.branch=datares["BranchCode"];
        this.OltName=datares["OutletName"];
        this.OltCode=datares["OutletCode"];
        this.genSrv.setOutletCode(this.OltCode)
        this.genSrv.setOutletName(this.OltName)
        this.genSrv.setBranchCode(this.branch);
        this.mdcategory = 0;
        this.authSrv.setAPI(this.api);

        this.foodSrv.GetOffer(this.authSrv.getAPI(),this.genSrv.getBranchCode()).subscribe(data => {
          this.OfferCount = Number(data);
        })

        this.foodSrv.getCats(firebaseConfig.Api).subscribe(data => {
          this.Categories = data;
          //this.Categories.push({CategoryId:0,Category:"All Items"});
          console.log(' this.Categories data')
          console.log(this.Categories)
        })
  

      this.mdcategory = 0;
      this.Cart = JSON.parse(localStorage.getItem("Carts"));
      this.foodSrv.getFoods(firebaseConfig.Api, 0, this.mdcategory, '').subscribe(data => {
        
        //this.ItemsModel = data;
        this.ItemsModel = data["foodmodellist"];
        this.IsOpened=data["isopen"].IsOpen;
        this.statusRes=data["isopen"].Message;
        this.genSrv.setOpenstatus(this.IsOpened);

        console.log('this.IsOpened')
        console.log(this.IsOpened)
        console.log(this.ItemsModel)
        const MainItemdata = this.ItemsModel.filter(x => {
          if (x.MainItem == true) {
            console.log('Maint Item')
            return x;
          }
        })
        this.items1 = MainItemdata;
        for (var val of this.ItemsModel) {
          var ItemCode = val.ItemCode;
          if (this.Cart != null) {
            for (var i = 0; i <= this.Cart.length - 1; i++) {
              if (this.Cart[i].item.itemId == ItemCode) {
                var qtys = this.Cart[i].item.itemQunatity;
                val.Qty = qtys;
              }

            }
          }

        }
        this.items = this.items1;
        this.selectedItems = this.items;
        console.log(data)
        //loader.dismiss();
      })

      if (this.MobileNo == null) {

        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Login',
          message: 'Please Enter Your MobileNo For Login App!',
          inputs: [
            {
              name: 'Mobile',
              placeholder: 'MobileNo',
              type: 'number'
            }
           
  
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Login',
              handler: data => {
                var Mob = data.Mobile;
                if (Mob.length == 10) {
                  console.log(Mob);
                  console.log(Mob.length);
                  this.foodSrv.GetMobileData(firebaseConfig.Api, data.Mobile, this.genSrv.getBranchCode()).subscribe(res => {
                    if (res != null) {
                      this.CommonData = res;
                      this.GuestData = this.CommonData;
                      this.MobileNo = this.CommonData.Mobile;
                      localStorage.setItem('MobileNo', this.CommonData.Mobile);
                      console.log(res);
                    }
                    else {
                       console.log('otp loop')
                      this.GetOtp(Mob);
                      let alertotp = this.alertCtrl.create({
                        title: 'OTP',
                        message: 'Please Enter Your Otp!',
                        inputs: [
                          {
                            name: 'Otp',
                            placeholder: 'Enter OTP',
                            type: 'number'
                          },
                          {
                            name: 'GuestName',
                            placeholder: 'Enter GuestName',                        
                          }
                        ],
                        buttons: [
                          {
                            text: 'Cancel',
                            role: 'cancel',
                            handler: data => {
                              console.log('Cancel clicked');
                              this.createToaster('Sorry U Clicked Cancel!', 2000);
                              this.navCtrl.push("HomePage");
                            }
                          },
                          {
                            text: 'Process',
                            handler: data => {
                              console.log(data.GuestName)
                              console.log('data.GuestName')
                              if (data.Otp == this.OtpNo && data.GuestName !="") {
                                this.MobileNo = Mob; 
                                var data1={ 'CustName':data.GuestName,'Mobile':this.MobileNo,'Branch_Code':this.genSrv.getBranchCode()}                           
                                this.foodSrv.SaveAddressForm(firebaseConfig.Api,data1).subscribe(data=>{
                                  if(data)
                                  {
                                    localStorage.setItem('MobileNo',  this.MobileNo);
                                  }
                                },
                                error=>{
                                  let alert8 = this.alertCtrl.create({
                                    title: 'Error',
                                    subTitle: 'Please Check Your Internet Connection<br/><b>Sorry Sorry!</b>',
                                    buttons: ['Ok']
                                  });
                                  alert8.present();
                                });
                              }                             
                              else {                              
                              if(data.GuestName =="")
                               var Subtitle='Please Enter Guest Name<br/><b>Sorry Sorry!</b>'
                               else
                               var Subtitle='Invalid Otp No Please Enter correct Otp<br/><b>Sorry Sorry!</b>'
                               if(data.GuestName =="" &&  data.Otp=="")
                               {
                                var Subtitle='Invalid Otp No Please Enter correct Otp<br/><b>Sorry Sorry!</b>'
                               }
                                let alert2 = this.alertCtrl.create({
                                  title: 'Error',
                                  subTitle: Subtitle,
                                  buttons: ['Ok']
                                });
                                alert2.present();
                                return false;
                              }
  
                            }
                          }
                        ]
                      });
                      alertotp.present();
  
  
                    }
                  })
                }
                else {
                  this.createToaster('Invalid MobileNo Please Check!', 2000);
                  this.navCtrl.push("HomePage");
                }
  
              }  //end data
  
            }
          ]
        });
        alert.present();
      }
      else {
        this.foodSrv.GetMobileData(firebaseConfig.Api, this.MobileNo,this.genSrv.getBranchCode()).subscribe(res => {
          if (res != null) {
            loader.dismiss();
            this.CommonData = res;
            this.GuestData = this.CommonData;
            this.MobileNo = this.CommonData.Mobile;
          }
          else {
            loader.dismiss();
            localStorage.removeItem('MobileNo');
            this.navCtrl.push("HomePage");
            
          }
        })
  
      }
  
      })

    })

  }











  navigateretail(id) {
    this.Cart = JSON.parse(localStorage.getItem("Carts"));
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present().then(() => {
      this.mdcategory = id;
     
     
      this.foodSrv.getFoods(firebaseConfig.Api, 0, id, '').subscribe(data => {

        //this.ItemsModel = data;
        this.ItemsModel = data["foodmodellist"];
        this.IsOpened=data["isopen"].IsOpen;
        this.statusRes=data["isopen"].Message;
        this.genSrv.setOpenstatus(this.IsOpened);
        
        console.log('this.items1=data;')
        console.log(this.ItemsModel)

        const MainItem = this.ItemsModel.filter(x => {
          if (x.MainItem == true) {
            console.log('Maint Item')
            console.log(x)
            console.log('x')
            return x;
            
          }
        })
        this.items1 = MainItem;
        console.log(MainItem)
        console.log('MainItem')
        for (var val of this.items1) {
          var ItemCode = val.ItemCode;
          if (this.Cart != null) {
            for (var i = 0; i <= this.Cart.length - 1; i++) {
              if (this.Cart[i].item.itemId == ItemCode) {
                var qtys = this.Cart[i].item.itemQunatity;
                val.Qty = qtys;
              }
            }
          }
        }
        this.items = this.items1
        this.selectedItems = this.items;
        loader.dismiss();
      })
    })

  }


  GetOtp(MobileNo:string)
  {
    let loader = this.loadingCtrl.create({
      content: "Generateing otp Wait...",
    });
    loader.present();
    this.billSrv.GenerateingOtp(firebaseConfig.Api, MobileNo).subscribe(
      data => {
       //this.isotpNo=true;
       this.mobileNos=data;
       this.OtpNo=this.mobileNos;
       console.log(this.OtpNo)
       console.log('this.OtpNo')
      // this.IsGetOtpvissible=false;
      // this.iSvissible=true;
      },
      error => {
        //this.isotpNo=false;
        console.log('Otp Not Generating')
        let alert4 = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Otp Not Generating<br/><b>Sorry Sorry!</b>',
          buttons: ['Ok']
        });
        loader.dismiss();
      }, () => {
        loader.dismiss();
      });
  }

  //|| x.ItemCode==itemCode
  Check(itemCode: number) {
    console.log(this.ItemsModel)
    console.log('this.ItemsModel')
    const filteritem = this.ItemsModel.filter(x => {
      if (x.MainItemCode == itemCode ) {
        console.log('Maint Item')
        return x;
      }
    })
    console.log(filteritem)
    console.log('filteritem')
    let modal = this.modalCtrl.create("AboutUsPage", { itemCode: itemCode, items: filteritem }, { cssClass: 'modal-fullscreen' });
    modal.onDidDismiss(data1 => {
      if (data1 === null || data1 === undefined) {
        console.log(data1);
        this.navCtrl.pop();
      }
      else {

        this.Cart = JSON.parse(localStorage.getItem("Carts"));
        this.noOfItems = this.Cart != null ? this.Cart.length : null;

      }

    });
    modal.present();
  }


  ionViewWillEnter() {
    this.Cart = JSON.parse(localStorage.getItem("Carts"));
    this.noOfItems = this.Cart != null ? this.Cart.length : null;
    this.uid = localStorage.getItem('uid');

  }

  initializeItems() {
    this.items = this.selectedItems;
  }



  removeQuantity(index: number, data: any, CrQty: number) {

    this.Cart = JSON.parse(localStorage.getItem("Carts"));

    this.items[index].Qty =
      this.items[index].Qty === 0
        ? 0
        : this.items[index].Qty - 1;
    console.log(data)
    console.log('data')

    if (CrQty > 1) {
      data.Qty = CrQty - 1;
      console.log(this.Cart);
      console.log('this.Cart');
      for (let i = 0; i <= this.Cart.length - 1; i++) {
        let ExtotalPrice = 0;
        let totalPrice = 0;
        if (this.Cart[i].item.itemId == data.ItemCode) {
          this.Cart[i].item.itemQunatity = data.Qty;
          for (let j = 0; j <= this.Cart[i].item.extraOptions.length - 1; j++) {
            ExtotalPrice =
              ExtotalPrice + this.Cart[i].item.extraOptions[j].value;
          }
          //this.Cart[i].item.price = data.ItemRate *  data.Qty;
          this.Cart[i].itemTotalPrice = data.ItemRate * data.Qty;
        }
      }
      localStorage.setItem("Carts", JSON.stringify(this.Cart));
    }
    else {

      for (var i = 0; i <= this.Cart.length - 1; i++) {
        if (this.Cart[i].item.itemId == data.ItemCode) {
          this.Cart.splice(i, 1);
          if (this.Cart.length == 0) {
            localStorage.removeItem("Carts");
            this.noOfItems = null;
          } else {
            localStorage.setItem("Carts", JSON.stringify(this.Cart));
            this.Cart = JSON.parse(localStorage.getItem("Carts"));
            this.noOfItems = this.noOfItems - 1;
          }
        }
      }
      console.log(this.cart)
      // const itemToRemove = this.cart.findIndex(item => 
      //   item.name === this.menu[catId].products[productId].name);
      //   if(this.cart[itemToRemove] && this.cart[itemToRemove].quantity >= 0) {
      //     this.cart.splice(itemToRemove, 1);
      //   }


    }


  }


  addQuantity(data: any, index: number) {
    
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

    this.Show = true;
    this.items[index].Qty =
      this.items[index].Qty
        ? this.items[index].Qty + 1
        : 1;

    this.MobileNo = localStorage.getItem("MobileNo")
    console.log(this.MobileNo)
    if (this.MobileNo == null) {
      this.createToaster1('Please Reload the Page and Enter MobileNo Sorry!', 2000);
      this.navCtrl.push("HomePage");
    }
    this.cart1.title = data.ItemName;
    this.cart1.itemId = data.ItemCode;
    this.cart1.thumb = data.thumb;
    this.cart1.Size = data.Size;
    this.cart1.MaxQunatity=data.GuestPoint;

    this.cart1.itemQunatity = data.Qty;
    this.cart1.price = Number(data.ItemRate) * 1;

    this.cartService.OnsaveLS(this.cart1);
    this.Cart = JSON.parse(localStorage.getItem("Carts"));
    console.log("toatal cart-" + JSON.stringify(this.Cart));
    if (this.Cart != null) {
      this.noOfItems = this.Cart.length;
      this.createToaster(data.ItemName.split('-') + ' Added to the Cart', 2000)
      this.Show = false;
    }
  }
  else{
    this.createToaster1('You cannot add any more quantities for this product!', 2000)
  }

  }




  OfferPage() {
    this.navCtrl.push("TodayofferPage");
  }



  createToaster(message, duration) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'bottom',
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

  getItems(ev: any) {
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != "") {
      this.items = this.items.filter(data => {
        return data.ItemName.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }





  navigate(id) {
    this.Cart = JSON.parse(localStorage.getItem("Carts"));

    console.log(this.Cart)
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present().then(() => {
      this.mdcategory = id;
      this.foodSrv.getFoods(firebaseConfig.Api, 0, id, '').subscribe(data => {
        //this.items1 = data;

        this.items1 = data["foodmodellist"];
        this.IsOpened=data["isopen"].IsOpen;
        this.statusRes=data["isopen"].Message;
       
        for (var val of this.items1) {
          var ItemCode = val.ItemCode;
          if (this.Cart != null) {
            for (var i = 0; i <= this.Cart.length - 1; i++) {
              if (this.Cart[i].item.itemId == ItemCode) {
                var qtys = this.Cart[i].item.itemQunatity;
                val.Qty = qtys;
              }
            }
          }
        }
        this.items = this.items1;
        this.selectedItems = this.items;
        loader.dismiss();
      })
    })

  }



 


  navcart() {
    this.navCtrl.push("CartPage");
    //this.navCtrl.push("BillPreviewPage", { TrNo: "kk"})
  }






}
