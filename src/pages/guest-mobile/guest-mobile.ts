import { BillerService } from './../biller-service';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController, AlertController } from 'ionic-angular';

import { AuthService } from './../auth-service';

/**
 * Generated class for the GuestMobilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-guest-mobile',
  templateUrl: 'guest-mobile.html',
})
export class GuestMobilePage {
  todo = {}
  OtpNo:number;
  mobileNos:any;
  IsGetOtpvissible:boolean=false;
  iSvissible:boolean=false;
  isotpNo:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public _alertCtrl: AlertController,
    public _loadingCtrl: LoadingController,public authSrv: AuthService,public billSrv: BillerService,
    public _viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuestMobilePage');
  }
  CheckValue(Mobile:string)
  {
    if(Mobile.length===10)
    {
      this.IsGetOtpvissible=true;    
    }
    else
    {
      this.isotpNo=false;
      this.iSvissible=false;
      this.IsGetOtpvissible=false;
    }
  }


  GetOtp(MobileNo:string)
  {

    let loader = this._loadingCtrl.create({
      content: "Generateing otp Wait...",
    });
    loader.present();
    this.billSrv.GenerateingOtp(this.authSrv.getAPI(), MobileNo).subscribe(
      data => {
       this.isotpNo=true;
      this.mobileNos=data;
       this.IsGetOtpvissible=false;
       this.iSvissible=true;
      },
      error => {
        this.isotpNo=false;
        this.navCtrl.setRoot("Error", { code: "HAILHYDRA-002", title: "NOT FOUND", message: "NetWork Error" });
        loader.dismiss();
      }, () => {
        loader.dismiss();
      });
  }

  SubmitData()
  {

     console.log(this.todo['OTP'])
     var Mobile=this.todo['Phone']
     if(this.todo['OTP']==this.mobileNos)
     {
      let data = { 'MobileNo': Mobile};
      console.log('data' + data)
      this._viewCtrl.dismiss(data);
     }
     else
     {
      let alert = this._alertCtrl.create({
        title: 'Error',
        subTitle: 'Invalid Otp No Please Enter correct Otp<br/><b>Sorry Sorry!</b>',
        buttons: ['Ok']
      });
      alert.present();
     }
  }
}
