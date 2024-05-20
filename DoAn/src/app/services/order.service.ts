import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {CONSTANT} from "../constant/constant";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiEndPoint: string ='';
  constructor(private http: HttpClient) {
    this.apiEndPoint = environment.apiEndPoint;
  }

  placeOrder(orderData: any): Observable<any> {
    return this.http.post(this.apiEndPoint + CONSTANT.ENDPOINTS.ORDER, orderData);
  }
}
