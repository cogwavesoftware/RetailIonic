import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ViewController } from 'ionic-angular';
import { FoodService } from './../food-service';
import { firebaseConfig } from '../../app/firebase.config'
import { GenericService } from './../generic-service';
/**
 * Generated class for the TodayofferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todayoffer',
  templateUrl: 'todayoffer.html',
})
export class TodayofferPage {
  Offerdetails:any=[];
  OfferMessage:number=1;
  constructor(public navCtrl: NavController, public navParams: NavParams,public genSrv: GenericService,
    public _loadCtrl: LoadingController,public foodSrv: FoodService,public _viewCtrl:ViewController
    ) {
  }

  ionViewDidLoad() {

    let  loading=this._loadCtrl.create({
      content:"Wait Offfer Loading"
    })
    loading.present()


    
    this.foodSrv.GetOfferDetail(firebaseConfig.Api,this.genSrv.getBranchCode()).subscribe(data => {  
      this.Offerdetails =data;
      console.log(data)     
      if( this.Offerdetails.length==0)
      this.OfferMessage=1; 
     else
     this.OfferMessage=0;
      
    })
    loading.dismiss()
    console.log('ionViewDidLoad TodayofferPage');
  }

   
  dismissNCModal() {
    this._viewCtrl.dismiss(false).catch(() => { });
  }


}
