import { Injectable } from '@angular/core';
// import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FoodService {

  constructor(public http: HttpClient) {

  }
  private _cart: any[] = [];


  getCats(url) {
    
    return this.http.get('http://' + url + '/api/retail/getfoodcategories');
     
  }

  getFoods(url, outlet, category, filter?) {
   
    return this.http.get('http://' + url + '/api/retail/getfoodsimage?outlet=' + outlet + '&category=' + category + '&filter=' + filter);    
  }

  
GetOffer(url,branch)
{
  return this.http.get('http://' + url + '/api/retail/GetOffer?Branchcode=' + branch);
}


GetOfferDetail(url,branch)
{
  return this.http.get('http://' + url + '/api/retail/GetOfferDetail?Branchcode=' + branch);
}

GetAppConfigure(url) {
  return this.http.get('http://' + url + '/api/retail/GetAppConfigure?Api='+ url);

}
GetMobileNoViaTrNo(url,TrNo,branch) {
    return this.http.get('http://' + url + '/api/retail/getmobileno?TrNo=' + TrNo + '&Branchcode=' + branch);
    
}

GetMobileData(url,Mobile,branch)
{
  return this.http.get('http://' + url + '/api/retail/getmobilenoviaData?Mobile=' + Mobile + '&Branchcode=' + branch);    
}


GetMobileDataList(url,Mobile,branch)
{
  
  return this.http.get('http://' + url + '/api/retail/getmobilenoviaDatalist?Mobile=' + Mobile + '&Branchcode=' + branch);
    
}
SaveAddressForm(url, customer: any) {
   

  let contentTypeHeaders = new HttpHeaders();
  contentTypeHeaders.append('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
  contentTypeHeaders.append('Content-Type', 'application/json');
  contentTypeHeaders.append('Access-Control-Allow-Origin', '*');
  contentTypeHeaders.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  contentTypeHeaders.append('Accept', 'q=0.8;application/json;q=0.9');

  return this.http.post('http://' + url + '/api/retail/saveAddress', customer, { headers: contentTypeHeaders });
}


//   getFoodsOnCancel(url, kotno) {
//     return this.http.get('http://' + url + '/api/kot/getfoods?kotno=' + kotno)
//       .map(res => res.json());
//   }


//   getOptions(url) {
//     return this.http.get('http://' + url + '/api/kot/getspecialinfo')
//       .map(res => res.json());
//   }
//   getOldCart(url, table, sub, outlet) {
//     return this.http.get('http://' + url + '/api/kot/getoldcart?outlet=' + outlet + '&tableno=' + table + '&subtable=' + sub)
//       .map(res => res.json());
//   }

//   getKOT(url, tableno, subtable) {
//     return this.http.get('http://' + url + '/api/kot/getkot?tableno=' + tableno + '&subtable=' + subtable)
//       .map(res => res.json());
//   }

//   postOrder(url, cart: any) {
//     let body = JSON.stringify(cart);
//     let headers = new Headers({ 'Content-Type': 'application/json' });
//     let options = new RequestOptions({ headers: headers });
//     return this.http.post('http://' + url + '/api/kot/submitorder', body, options)
//       .map(res => res.json());
//   }

//   addToCart(foods: any) {
//     this._cart.push(foods);
//   }

//   cancelKOT(url, kotno, outlet, remarks) {
//     return this.http.get('http://' + url + '/api/kot/cancelkot?kotno=' + kotno + '&outlet=' + outlet + '&remarks=' + remarks)
//       .map(res => res.json());
//   }

//   addOptions(url, option, branch) {
//     return this.http.get('http://' + url + '/api/kot/addoption?option=' + option + '&branch=' + branch)
//       .map(res => res.json());
//   }


//   getNutrionsData(url, ItemCode, branch) {
//     return this.http.get('http://' + url + '/api/kot/getNutrions?ItemCode=' + ItemCode + '&Branchcode=' + branch)
//       .map(res => res.json());
//   }




  
//   getIngredientsData(url, ItemCode, branch) {
//     return this.http.get('http://' + url + '/api/kot/getIngredients?ItemCode=' + ItemCode + '&Branchcode=' + branch)
//       .map(res => res.json());
//   }





// CheckTranscation(url,TrNo,branch) {
 
//   return this.http.get('http://' + url + '/api/kot/chktrans?TrNo=' + TrNo + '&Branchcode=' + branch)
//   .map(res => res.json());
// }




// GetTableNoViaTransNo(url,TrNo,branch) {
//   return this.http.get('http://' + url + '/api/kot/getTblNo?TrNo=' + TrNo + '&Branchcode=' + branch)
//   .map(res => res.json());
// }


// GetTranAndMobileData(url,TblNo,branch) {
//   return this.http.get('http://' + url + '/api/kot/gettrandMobile?TblNo=' + TblNo + '&Branchcode=' + branch)
//   .map(res => res.json());
// }

// // CheckIsBilled(url,TrNo,branch)
// // {

// //   return this.http.get('http://' + url + '/api/kot/gettrandMobile?TrNo=' + TrNo + '&Branchcode=' + branch)
// //   .map(res => res.json());
// // }

// PostTranscation(url, Posttran: any) {
  
//   let body = JSON.stringify(Posttran);
//   console.log(body)
//   let headers = new Headers({ 'Content-Type': 'application/json' });
//   let options = new RequestOptions({ headers: headers });
//   return this.http.post('http://' + url + '/api/kot/savstransdata', body, options)
//     .map(res => res.json());
// }

//   getNutri(url, food) {
//         //
//         //Get a single model here based on the conditions from variable food.
//         //
//         console.log(food);
    
//         var model2 =
//           {
//             "ItemCode": 1,
//             "ItemName": 'Briyani',
//             "List": [
//             {"Name": "Calories", "Value": "115 KCal"},
//             { "Name": "Fat", "Value": "4.92 g" },
//             { "Name": "SaturatedFat", "Value": "1.04 g" },
//             { "Name": "Cholesterol", "Value": "0 mg" },
//             { "Name": "DietaryFiber", "Value": "19 mg" },
//             { "Name": "Protein", "Value": "26 g" },
//             { "Name": "VitaminA", "Value": "14 %" },
//             { "Name": "VitaminC", "Value": "4 %" },
//             { "Name": "Calcium", "Value": "31.59 %" },
//             { "Name": "Iron", "Value": "90.5 %" }]
//           };
//         return model2;
//       }



//       getIngre(url, food) {
        
//             //
//             //Get a single model here based on the conditions from variable food.
//             //
//             console.log(food);
        
//             var model2 =
//               {
//                 "ItemCode": 1,
//                 "ItemName": 'Briyani',
//                 "List": [
//                 { "Name": "Tomato", "Value": "115 KCal" },
//                 { "Name": "Potato", "Value": "4.92 g" },
//                 { "Name": "Oil", "Value": "1.04 g" },
//                 { "Name": "Salt", "Value": "0 mg" },
//                 { "Name": "Sugar", "Value": "19 mg" },
//                 { "Name": "Protein", "Value": "26 g" },
//                 { "Name": "VitaminA", "Value": "14 %" },
//                 { "Name": "VitaminC", "Value": "4 %" },
//                 { "Name": "Calcium", "Value": "31.59 %" },
//                 { "Name": "Iron", "Value": "90.5 %" }]
//               };
//             return model2;
//           }
}
