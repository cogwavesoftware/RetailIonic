import { FoodService } from './../food-service';
import { Component } from "@angular/core";
import { IonicPage, NavController, LoadingController } from "ionic-angular";
// import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { map } from "rxjs/operators";

@IonicPage()
@Component({
  selector: "page-category",
  templateUrl: "category.html"
})
export class CategoryPage {
  noOfItems: any;
  // public Categories: Array<any> = [];
  // categories: AngularFireList<any>;
  Categories: any=[];
  
  constructor(
    public navCtrl: NavController,
    public foodSrv: FoodService,public authSrv: FoodService,
    public loadingCtrl: LoadingController
  ) {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present().then(() => {

      this.foodSrv.getCats(localStorage.getItem("API")).subscribe(data => {
        this.Categories = data;
        console.log(this.Categories)
      })


      
      loader.dismiss();
      // .subscribe(data => {
      //   this.Categories = [];
      //   loader.dismiss();
      //   data.forEach(item => {
      //     let temp = item.payload.toJSON();
      //     temp["$key"] = item.payload.key;
      //     this.Categories.push(temp);
      //   });
      // });

    });
  }

  ionViewWillEnter() {
    let cart: Array<any> = JSON.parse(localStorage.getItem("Cart"));
    this.noOfItems = cart != null ? cart.length : null;
  }

  // navigate(id) {
  //   this.navCtrl.push("HomePage", { id: id });
  // }

  navcart() {
    this.navCtrl.push("CartPage");
  }
}
