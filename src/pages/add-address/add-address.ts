
import { Component } from "@angular/core";
import { IonicPage, NavController,LoadingController, NavParams,AlertController,ViewController } from "ionic-angular";
// import { AngularFireDatabase } from "@angular/fire/database";
// import { AngularFireAuth } from "@angular/fire/auth";
import { NgForm } from "@angular/forms";
import { BillerService } from './../biller-service';
import { AuthService } from './../auth-service';
import { firebaseConfig } from '../../app/firebase.config'
@IonicPage()
@Component({
  selector: "page-add-address",
  templateUrl: "add-address.html"
})
export class AddAddressPage {
  address: any = {};
   Mobile:string;
   IsGetOtpvissible:boolean=false;
   iSvissible:boolean=false;
   isotpNo:boolean=false;
   mobileNos:any;
   OtpNo:number;
   
  constructor(
    public _loadingCtrl: LoadingController,public _alertCtrl:AlertController,
    public authSrv: AuthService,public billSrv: BillerService,
    public navCtrl: NavController,public _viewCtrl:ViewController,
    public navParams: NavParams
  ) {
    //this.Mobile = this.navParams.get("Mobile");
    this.address = navParams.get('Model');
    console.log(this.address)
   }

  addAddress(form: NgForm) {

    if(form.invalid)
    {
      let alert1 = this._alertCtrl.create({
        title: 'Error',
        subTitle: 'please fill All the InputBox<br/><b>Sorry !</b>',
        buttons: ['Ok']
      });
      alert1.present();
      return;
    }
  
    var Mob=form.value.Mobile;
    debugger;
    if(Mob.length=="10")
    {
      this.GetOtp(Mob);

      let alert = this._alertCtrl.create({
        title: 'Otp',
        message: 'Please Enter Your Otp!',
        inputs: [
          {
            name: 'Otp',
            placeholder: 'Enter OTP',
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
            text: 'Process',
            handler: data => {
              if (data.Otp==this.OtpNo) {
                   console.log('true')
                   let data1 = { 'MobileNo': form.value.Mobile,'GuestName':form.value.CustName,'Email':form.value.Email,'Address':form.value.Address,'PinCode':form.value.PinCode,'City':form.value.City,'Area':form.value.Area};
                   this._viewCtrl.dismiss(data1);
                // logged in!
              } else {
                // invalid login
                let alert2 = this._alertCtrl.create({
                  title: 'Error',
                  subTitle: 'Invalid Otp No Please Enter correct Otp<br/><b>Sorry Sorry!</b>',
                  buttons: ['Ok']
                });
                alert2.present();
                return false;
              }
            }
          }
        ]
      });
      alert.present();


    }
    else{
      let alert1 = this._alertCtrl.create({
        title: 'Error',
        subTitle: 'Invalid Mobile No<br/><b>Sorry Sorry!</b>',
        buttons: ['Ok']
      });
      alert1.present();
    }
    
   

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
    this.billSrv.GenerateingOtp(firebaseConfig.Api, MobileNo).subscribe(
      data => {
       this.isotpNo=true;
       this.mobileNos=data;
       this.OtpNo=this.mobileNos;
       console.log(this.OtpNo)
       console.log('this.OtpNo')
       this.IsGetOtpvissible=false;
       this.iSvissible=true;
      },
      error => {
        this.isotpNo=false;
        console.log('Otp Not Generating')
        let alert = this._alertCtrl.create({
          title: 'Error',
          subTitle: 'Otp Not Generating<br/><b>Sorry Sorry!</b>',
          buttons: ['Ok']
        });
        loader.dismiss();
      }, () => {
        loader.dismiss();
      });
  }

  
}
