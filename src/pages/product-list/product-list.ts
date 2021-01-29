import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,AlertController,ToastController,
  NavParams,
  LoadingController
} from "ionic-angular";
// import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { map } from "rxjs/operators";
import { CartService } from "../../pages/cart.service";

@IonicPage()
@Component({
  selector: "page-product-list",
  templateUrl: "product-list.html"
})
export class ProductListPage {
  id: any;
  count: any = 1;
  public menuItems: Array<any> = [];
  public selectedItems: Array<any> = [];
  //menuItem: AngularFireList<any>;
  noOfItems: any;
  items: any = [];
  Cart: any[] = [];
  currency: {};

  public cart = {
    itemId: String,
    extraOptions: [],
    price: {
      name: "",
      value: 0,
      currency: ""
    },
    title: "",
    thumb: String,
    itemQunatity: this.count
  };
 
  public cart1 = {
    itemId: String,
    extraOptions: [],
    price: {
      name: "",
      value: 0,
      currency: ""
    },
    title: "",
    thumb: String,
    itemQunatity: this.count
  };
  
  constructor(
    public navCtrl: NavController,
    //public af: AngularFireDatabase,
    public navParams: NavParams,
    public cartService: CartService,
    public alertCtrl: AlertController,
    
    public toastCtrl: ToastController,
    
    public loadingCtrl: LoadingController
  ) {
    this.currency = JSON.parse(localStorage.getItem('currency'));

    
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present().then(() => {
      this.id = this.navParams.get("id");
      console.log('this.id')
      console.log(this.id)
      if (this.id == undefined) {
        this.navCtrl.push("HomePage");
      }

      // this.menuItem = af.list("/menuItems");
      // console.log('this.menuItem')
      // console.log(this.menuItem);
      // let subscription = this.menuItem
      //   .snapshotChanges()
      //   .pipe(
      //     map(changes =>
      //       changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))
      //     )
      //   ).subscribe((res: any) => {
      //     this.menuItems = res;
      //     console.log(res)
      //     for (var i = 0; i <= this.menuItems.length - 1; i++) {
      //       this.menuItems[i].itemQty=1;
      //       if (this.menuItems[i].category == this.id) {
      //         this.selectedItems.push(this.menuItems[i]);
      //         this.items = this.selectedItems;
      //         for (var j = 0; j < this.items.length; j++) {
      //           var sum = 0;
      //           if (this.items[j].reviews) {
      //             for (var k = 0; k < this.items[j].reviews.length; k++) {
      //               sum = sum + this.items[j].reviews[k].rating;
      //             }
      //             let avg = sum / this.items[j].reviews.length;
      //             this.items[j].reviewData = avg;
      //           }
      //         }
      //       }
      //     }
          // subscription.unsubscribe();
       // })
      // .subscribe((data: any) => {
      //   this.menuItems = [];
      //   data.forEach(item => {
      //     let temp = item.payload.val();
      //     temp["$key"] = item.payload.key;
      //     this.menuItems.push(temp);
      //     subscription.unsubscribe();
      //   });

      loader.dismiss();
      //this.items = [];

    });

  }

  ionViewWillEnter() {
    let cart: Array<any> = JSON.parse(localStorage.getItem("Cart"));
    this.noOfItems = cart != null ? cart.length : null;
  }

  addToCart() {
    if (this.cart.price.name == "") {
      let alert = this.alertCtrl.create({
        title: "Please!",
        subTitle: "Select Size and Price!",
        buttons: ["OK"]
      });
      alert.present();
    } else {
      this.cartService.OnsaveLS(this.cart);
      //this.navCtrl.push("CartPage");
    }
  }


  addToCart1(data:any,Pric:number,Qunity:number) {

    //let cart: Array<any> = JSON.parse(localStorage.getItem("Cart"));
    //this.noOfItems = cart != null ? cart.length : null;

    //this.menuItems = data;
    this.menuItems["$key"] = data.category;
    this.cart1.title = data.title;
    this.cart1.itemId = data.$key;
    this.cart1.thumb = data.thumb;
    this.cart1.price= {
      name: "Normal",
      value: Pric,
      currency: ""
    };
    this.cart1.itemQunatity=this.count;
    this.cart1.price.value = Number(Pric);
   
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });

    loader.present().then(() => {
      this.cartService.OnsaveLS(this.cart1);
      this.Cart = JSON.parse(localStorage.getItem("Cart"));
    console.log("toatal cart-"+JSON.stringify(this.Cart));
    if (this.Cart != null) {
      this.noOfItems = this.Cart.length;
       
      this.createToaster(data.title.split('-') + ' Added to the Cart',3000)
     
    }
    })

    loader.dismiss()      
  }


  addQuantity() {
    if (this.count < 10) {
      this.count = this.count + 1;
      this.cart.itemQunatity = this.count;
    }
  }

  removeQuantity() {
    if (this.count > 1) {
      this.count = this.count - 1;
      this.cart.itemQunatity = this.count;
    }
  }


  initializeItems() {
    this.items = this.selectedItems;
  }

  getItems(ev: any) {
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != "") {
      this.items = this.items.filter(data => {
        return data.title.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }

  navigate(item) {
    this.navCtrl.push("ProductDetailsPage", { id: item });
  }

  navcart() {
    this.navCtrl.push("CartPage");
  }

  toastFood(food: any) {
    let toast = this.toastCtrl.create({
      message: food.ItemName.split('-')[1] + ' added to the cart',
      duration: 3000,
      position: 'bottom',
      cssClass: 'toast-green'
    });
    toast.present();
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

}
