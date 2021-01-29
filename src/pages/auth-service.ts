import { Injectable } from '@angular/core';
// import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { ModalController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthService {
  private loggedIn = false;
  private _api;
  private _usercode;
  private _username: string;
  private _branchcode;
  private _billType;
  private _subBillType;



  constructor(public http: HttpClient, public storage: Storage, public modalCtrl: ModalController) {

  }
 
 
 

  setUserName(username) {
    this._username = username;
  }
  setUserCode(usercode) {
    this._usercode = usercode;
  }
  setBranchCode(branchcode) {
    this._branchcode = branchcode;
  }
  setBillType(type) {
    this._billType = type;
  }
  setSubBillType(type) {
    this._subBillType = type;
  }
  getBillType() {
    return this._billType;
  }
  getSubBillType() {
    return this._subBillType;
  }
  getUserName() {
    return this._username;
  }
  getUserCode() {
    return this._usercode;
  }
  getBranchCode() {
    return this._branchcode;
  }
  getAPI() {
    return this._api;
  }
  setAPI(url) {
    this._api = url;
  }
 
  // getUserDetails(url, username, password) {
  //   return this.http.get('http://' + url + '/api/kot/getuserdetails?username=' + username + '&password=' + password)
  //     .map(res => res.json());
  // }
  // getUserRights(url, username, branch) {
  //   return this.http.get('http://' + url + '/api/kot/getuserrights?username=' + username + '&branch=' + branch)
  //     .map(res => res.json());
  // }
  // getBillConfig(url, branchcode) {
  //   return this.http.get('http://' + url + '/api/kot/getbillconfig?branchcode=' + branchcode)
  //     .map(res => res.json());
  // }
  // isCompatible(url) {
  //   return this.http.get('http://' + url + '/api/home/version')
  //     .map(res => res.json());
  // }
  // login(username, password) {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //   let urlSearchParams = new URLSearchParams();
  //   urlSearchParams.append('username', username);
  //   urlSearchParams.append('password', password);
  //   urlSearchParams.append('grant_type', 'password');
  //   let body = urlSearchParams.toString()
  //   return this.http.post('http://' + this._api + '/postoken', body, { headers: headers })
  //     .map(res => res.json())
  //     .map((res) => {
  //       if (res !== null) {
  //         localStorage.setItem('acess_token', res["access_token"]);
  //         localStorage.setItem('access_type', res["access_type"]);
  //         localStorage.setItem('expires_in', res["expires_in"]);
  //         this.loggedIn = true;
  //       }
  //       return res;
  //     });
  // }

  // getAllUsers(url) {
  //   return this.http.get('http://' + url + '/api/kot/getallusers')
  //     .map(res => res.json());
  // }

  // setUserRights(url, rights) {
  //   let body = JSON.stringify(rights);
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.post('http://' + url + '/api/kot/setuserrights', body, options)
  //     .map(res => res.json());
  // }

  // decryptCheckInNo(url, checkinno) {
  //   return this.http.get('http://' + url + '/api/kot/decryptcheckinno?checkinno=' + checkinno)
  //     .map(res => res.json());
  // }

}


