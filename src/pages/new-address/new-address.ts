
import { Component } from "@angular/core";
import { IonicPage, NavController,LoadingController,
   NavParams,AlertController,ViewController } from "ionic-angular";

import { NgForm } from "@angular/forms";
import { BillerService } from './../biller-service';
import { AuthService } from './../auth-service';

@IonicPage()
@Component({
  selector: 'page-new-address',
  templateUrl: 'new-address.html',
})
export class NewAddressPage {
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
   
    this.mobileNos=form.value.Mobile;
    // console.log(this.mobileNos)
    // alert(this.mobileNos);
    this.Mobile= String(this.mobileNos);
    //alert(this.Mobile.length);
    
    if(this.Mobile.length ==10)
    {
      let data1 = { 'MobileNo': form.value.Mobile,'GuestName':form.value.CustName,'Email':form.value.Email,'Address':form.value.Address,'PinCode':form.value.PinCode,'City':form.value.City,'Area':form.value.Area};
      this._viewCtrl.dismiss(data1);
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
    
   
    //  if (this.af.auth.currentUser) {
    //    this.db
    //      .list("/users/" + this.af.auth.currentUser.uid + "/address")
    //      .push(this.address)
    //      .then(res => {
    //        var id = this.navParams.get("id");
    //        if (id == 1) {
    //          this.navCtrl.push("UserAddressListPage");
    //        } else {
    //          this.navCtrl.pop();
    //        }
    //      });
    //  }
  
    dismissNCModal() {
           
      this._viewCtrl.dismiss(false).catch(() => {  });
    }


    addAddress1(form: NgForm) {

  
      var Mob=form.value.Mobile;
      debugger;
      if(Mob.length=="10")
      {
       
        let alert = this._alertCtrl.create({
          title: 'Otp',
          message: 'Please Enter Your Otp!',
          inputs: [
            {
              name: 'Otp',
              placeholder: 'Enter OTP'
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


  ionViewDidLoad() {
    console.log('ionViewDidLoad NewAddressPage');
  }

  Goback()
  {

    this.navCtrl.pop();
  }

}
