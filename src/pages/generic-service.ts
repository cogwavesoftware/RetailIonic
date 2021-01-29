import { Injectable } from '@angular/core';
// import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GenericService {
  private _pOSEntryDate: Date;
  private _outletCode;
  private _outletName;
  private _isFeedbackSubmitted: boolean = false;
  private _model;
  private _branchcode;
  private _IsOpen;
  constructor(public http: HttpClient) {

  }
  setModel(model) {
    this._model = model;
    console.log(this._model + "SET MODEL");

  }
  getModel(){
    return this._model;
  }
  getOutletCode() {
    return this._outletCode;
  }
  getFeedbackStatus() {
    return this._isFeedbackSubmitted;
  }
  getOutletName() {
    return this._outletName;
  }

  setBranchCode(branchcode) {
    this._branchcode = branchcode;
  }
  getBranchCode() {
    return this._branchcode;
  }
  getOpenstatus()
  {
     return this._IsOpen
  }

  setOpenstatus(IsOpen:boolean)
  {
     this._IsOpen=IsOpen;
  }


  getLocalPOSEntryDate() {
    return this._pOSEntryDate;
  }
  setFeedbackStatus(stat: boolean) {
    this._isFeedbackSubmitted = stat;
  }
  setLocalPOSEntryDate(date: Date) {
    this._pOSEntryDate = date;
  }
  setOutletCode(outletcode) {
    this._outletCode = outletcode;
  }
  setOutletName(outletname) {
    this._outletName = outletname;
  }
  // getGuestDetails(url, roomno) {
  //   return this.http.get('http://' + url + '/api/kot/getguestdetails?roomno=' + roomno)
  //     .map(res => res.json());
  // }
  // getWaiters(url) {
  //   return this.http.get('http://' + url + '/api/kot/getstewards')
  //     .map(res => res.json());
  // }
  // getSubTable(url, outlet, tableno) {
  //   return this.http.get('http://' + url + '/api/kot/getsubtables?outlet=' + outlet + '&tableno=' + tableno)
  //     .map(res => res.json());
  // }
  // getTrSubTable(url, outlet, tableno) {
  //   return this.http.get('http://' + url + '/api/kot/gettrsubtables?outlet=' + outlet + '&table=' + tableno)
  //     .map(res => res.json());
  // }
  // getOutlets(url) {
  //   return this.http.get('http://' + url + '/api/kot/getoutlets')
  //     .map(res => res.json());
  // }
  // getPOSEntryDate(url) {
  //   return this.http.get('http://' + url + '/api/kot/getposentrydate')
  //     .map(res => res.json());
  // }
  // checkPOSEntryDate(url, branch) {
  //   return this.http.get('http://' + url + '/api/kot/checkposentrydate?branch=' + branch)
  //     .map(res => res.json());
  // }
  // getTables(url, outlet) {
  //   return this.http.get('http://' + url + '/api/kot/gettables?outlet=' + outlet)
  //     .map(res => res.json());
  // }
  // getTrTables(url, outlet) {
  //   return this.http.get('http://' + url + '/api/kot/gettrtables?outlet=' + outlet)
  //     .map(res => res.json());
  // }
  // getRooms(url, outlet) {
  //   return this.http.get('http://' + url + '/api/kot/getrooms?outlet=' + outlet)
  //     .map(res => res.json());
  // }
  // getNC(url) {
  //   return this.http.get('http://' + url + '/api/kot/getnc')
  //     .map(res => res.json());
  // }
  // transferTable(url, oldoutlet, branch, oldtableno, oldsubtable, newoutlet, newtable, newsubtable, usercode) {
  //   return this.http.get('http://' + url + '/api/kot/transfertable?oldoutlet=' + oldoutlet + '&branch=' + branch +
  //     '&oldtableno=' + oldtableno + '&oldsubtable=' + oldsubtable + '&newoutlet=' + newoutlet
  //     + '&newtable=' + newtable + '&newsubtable=' + newsubtable + '&usercode=' + usercode).map(res => res.json());
  // }
  // haveAlreadyOccupied(url, outlet, branch, tableno) {
  //   return this.http.get('http://' + url + '/api/kot/havealreadyoccupied?outlet=' + outlet + '&tableno=' + tableno + '&branch=' + branch)
  //     .map(res => res.json());
  // }
  // getServices(url) {
  //   return this.http.get('http://' + url + '/api/kot/getservices')
  //     .map(res => res.json());
  // }
  // postReviews(url, rvform) {
  //   let body = JSON.stringify(rvform);
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.post('http://' + url + '/api/kot/postreview', body, options)
  //     .map(res => res.json());
  // }
  // postKotShift(url, kotdet) {
  //   let body = JSON.stringify(kotdet);
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.post('http://' + url + '/api/kot/postkotdet', body, options)
  //     .map(res => res.json());
  // }
  // getFoodsForTransfer(url, tableno, subtable, branch) {
  //   return this.http.get('http://' + url + '/api/kot/getfoodsfortransfer?table=' + tableno + '&subtable=' + subtable + '&branch=' + branch)
  //     .map(res => res.json());
  // }
  // kot2nckot(url, tableno, subtable, branch, nccode, ncremarks) {
  //   return this.http.get('http://' + url + '/api/kot/kot2nckot?table=' +
  //     tableno + '&subtable=' + subtable + '&branch=' + branch + '&nccode=' + nccode + '&ncremarks=' + ncremarks)
  //     .map(res => res.json());
  // }
  // getFoodListForSplit(url, outlet, table, sub, branch, mode, billno) {
  //   return this.http.get('http://' + url + '/api/kot/getfoodlistforsplit?outlet=' +
  //     outlet + '&table=' + table + '&sub=' + sub + '&branch=' + branch + '&mode=' + mode + "&billno=" + billno)
  //     .map(res => res.json());
  // }
  // submitSplit(url, splitfood) {
  //   let body = JSON.stringify(splitfood);
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.post('http://' + url + '/api/kot/splitkot', body, options)
  //     .map(res => res.json());
  // }
  // submitSplitAfterBill(url, splitfood) {
  //   let body = JSON.stringify(splitfood);
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.post('http://' + url + '/api/kot/splitbill', body, options)
  //     .map(res => res.json());
  // }

  // getOutletAndTable(url, billno) {
  //   return this.http.get('http://' + url + '/api/kot/getoutletandtable?billno=' + billno)
  //     .map(res => res.json());
  // }

  // CheckItemFeedBack(url, billno)
  // {
  //   return this.http.get('http://' + url + '/api/kot/checkfeedback?billno=' + billno)
  //   .map(res => res.json());
  // }

  // // USING

  // getGuest(url, checkinno) {
  //   return this.http.get('http://' + url + '/api/kot/getguest?checkinno=' + checkinno)
  //     .map(res => res.json());
  // }
}
