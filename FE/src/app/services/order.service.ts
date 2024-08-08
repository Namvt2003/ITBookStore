import { HttpClient } from '@angular/common/http';
import { AbstractType, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  private pageUrl = "http://localhost:8080/api/orders";
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/orders');
  }

  addOrder(order: Order): Observable<any> {
    debugger;
    return this.http.post<any>('http://localhost:8080/api/orders', order);
  }

  getBookNamesForOrder(orderId: number): Observable<string[]> {
    return this.http.get<string[]>(this.pageUrl + '/' + orderId);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete<any>(this.pageUrl + '/' + id);
  }

  deleteBookNames(id:number): Observable<any> {
    return this.http.delete<any>(this.pageUrl +'/booknames'+ '/' + id);
  }

}
