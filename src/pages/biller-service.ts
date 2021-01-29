import { Injectable } from '@angular/core';
// import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class BillerService {

  constructor(public http: HttpClient) {

  }


  GenerateingOtp(url, MobileNo) {
    return this.http.get('http://' + url + '/api/kot/otpNo?MobileNo=' + MobileNo);

  }


  SaveTransNo(url, MobileNo, TransNo, Amount, Branch,clusId,OrderType) {
    return this.http.get('http://' + url + '/api/retail/saveTran?MobileNo=' + MobileNo + '&TransNo=' + TransNo + '&Branch=' + Branch + '&Amount=' + Amount + '&CusId=' + clusId + '&OrderType=' + OrderType);

  }


  CheckPayment(url, Tran, branch, Mobile) {
    return this.http.get('http://' + url + '/api/retail/checkpayretail?Tran=' + Tran + '&branch=' + branch + '&Mobile=' + Mobile);

  }
  GetPaymentUrl(url)
  {
    return this.http.get('http://' + url + '/api/retail/GetpayUrl');

  }

  GetdeliveryAmount(url)
  {
    return this.http.get('http://' + url + '/api/retail/Getdelivery');

  }


  GetBillPreview(url, TransNo,branch)
  {
    return this.http.get('http://' + url + '/api/retail/RetailBill?TransNo=' + TransNo + '&Branchcode=' + branch);
      
  }
  getbillpreviewByMobile(url, MobileNo,branch)
  {
    return this.http.get('http://' + url + '/api/retail/BillData?MobileNo=' + MobileNo + '&Branchcode=' + branch);
      
  }

  GetItemdetail(url, MobileNo,branch)
  {
    return this.http.get('http://' + url + '/api/retail/orderitem?MobileNo=' + MobileNo + '&Branchcode=' + branch);
      
  }


  SubmitPosOrder(url, order: any) {
  
    let contentTypeHeaders = new HttpHeaders();
    contentTypeHeaders.append('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
    contentTypeHeaders.append('Content-Type', 'application/json');
    contentTypeHeaders.append('Access-Control-Allow-Origin', '*');
    contentTypeHeaders.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    contentTypeHeaders.append('Accept', 'q=0.8;application/json;q=0.9');

    return this.http.post('http://' + url + '/api/retail/submitposorder', order, { headers: contentTypeHeaders });
  }


 


  // getBills(url, outlet, poscode, branch) {
  //   return this.http.get('http://' + url + '/api/kot/getbills?outlet=' + outlet + '&poscode=' + poscode + '&branch=' + branch)
  //     .map(res => res.json());
  // }
  // getAllBills(url, outlet, date, branch) {
  //   return this.http.get('http://' + url + '/api/kot/getallbills?date=' + date + '&outlet=' + outlet + '&branch=' + branch)
  //     .map(res => res.json());
  // }
  // getAllBillsForSplit(url, outlet, date, branch) {
  //   return this.http.get('http://' + url + '/api/kot/getallbillsforsplit?date=' + date + '&outlet=' + outlet + '&branch=' + branch)
  //     .map(res => res.json());
  // }
  // getBillsForDate(url, outlet, date, branch) {
  //   return this.http.get('http://' + url + '/api/kot/getbills?outlet=' + outlet + '&date=' + date + '&branch=' + branch)
  //     .map(res => res.json());
  // }
  // getCompanies(url) {
  //   return this.http.get('http://' + url + '/api/kot/getcompanies')
  //     .map(res => res.json());
  // }
  // getCards(url) {
  //   return this.http.get('http://' + url + '/api/kot/getcards')
  //     .map(res => res.json());
  // }
  // getCheques(url) {
  //   return this.http.get('http://' + url + '/api/kot/getcheques')
  //     .map(res => res.json());
  // }
  // getRoomsForSettle(url) {
  //   return this.http.get('http://' + url + '/api/kot/getroomsforsettle')
  //     .map(res => res.json());
  // }
  // getRoomDetailsForSettle(url, roomno) {
  //   return this.http.get('http://' + url + '/api/kot/getroomdetailsforsettle?roomno=' + roomno)
  //     .map(res => res.json());
  // }
  // settleBill(url, settlement) {
  //   let body = JSON.stringify(settlement);
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.post('http://' + url + '/api/kot/settlebill', body, options)
  //     .map(res => res.json());
  // }
  // modifySettleBill(url, settlement) {
  //   let body = JSON.stringify(settlement);
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.post('http://' + url + '/api/kot/modifysettlebill', body, options)
  //     .map(res => res.json());
  // }
  // modifyBill(url, bill) {
  //   let body = JSON.stringify(bill);
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.post('http://' + url + '/api/kot/modifybill', body, options)
  //     .map(res => res.json());
  // }
  // unsettleBill(url, settlement) {
  //   let body = JSON.stringify(settlement);
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.post('http://' + url + '/api/kot/unsettlebill', body, options)
  //     .map(res => res.json());
  // }
  // TransferToRoom(url, settlement) {
  //   let body = JSON.stringify(settlement);
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.post('http://' + url + '/api/kot/transfertoroom', body, options)
  //     .map(res => res.json());
  // }
  // getBill(url, cart) {
  //   let body = JSON.stringify(cart);
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.post('http://' + url + '/api/kot/getbill', body, options)
  //     .map(res => res.json());
  // }
  // submitBill(url, bill) {
  //   let body = JSON.stringify(bill);
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.post('http://' + url + '/api/kot/postbill', body, options)
  //     .map(res => res.json());
  // }
  // cancelBill(url, bill) {
  //   let body = JSON.stringify(bill);
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.post('http://' + url + '/api/kot/cancelbill', body, options)
  //     .map(res => res.json());
  // }
  // isBillSettled(url, bill) {
  //   return this.http.get('http://' + url + '/api/kot/isbillsettled?billno=' + bill)
  //     .map(res => res.json());
  // }
  // getFoodList(url, outlet, billno, branch, billdate) {
  //   return this.http.get('http://' + url + '/api/kot/getfoodlist?outlet=' + outlet + '&billno=' + billno +
  //     '&branch=' + branch + '&billdate=' + billdate)
  //     .map(res => res.json());
  // }
  // getDiscountDetails(url, foodlist, branch) {
  //   let data = {
  //     "foods": foodlist,
  //     "branch": branch
  //   }
  //   let body = JSON.stringify(data);
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.post('http://' + url + '/api/kot/getdiscountdetails', body, options)
  //     .map(res => res.json());
  // }

  // getPrevOrders(url, checkinno) {
  //   return this.http.get('http://' + url + '/api/kot/getprevorders?checkinno=' + checkinno)
  //     .map(res => res.json());
  // }


  // GetPrevOrdersbyTrNo(url, checkinno,TrNo) {
  //   return this.http.get('http://' + url + '/api/kot/getprevordersbyTrNo?checkinno=' + checkinno + '&TrNo=' + TrNo)
  //     .map(res => res.json());
  // }
 







}
