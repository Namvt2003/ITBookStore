import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cartitem } from '../../models/cartitem.model';
import { DetectaddtocartService } from './detectaddtocart.service';

@Injectable({
  providedIn: 'root'
})
export class AddtocartService {
  private pageUrl="http://localhost:8080/api";

  constructor(private http: HttpClient, private detectAddToCartService: DetectaddtocartService) { }
  
  getCartItems(): Observable<Cartitem[]>{
    return this.http.get<Cartitem[]>(this.pageUrl);
  }
  saveToCart(obj: Cartitem): Observable<Object> {
    this.detectAddToCartService.notifyAddToCart();
    return this.http.post(`${this.pageUrl}/cartitems`, obj);
    
  }
   sumOfCartItems(): Observable<number>{ 
      return this.http.get<number>(`${this.pageUrl}/sum`);
   
   }

   cleanCart(): Observable<void>{
      return this.http.delete<void>(`${this.pageUrl}/delete`);
    }


}
