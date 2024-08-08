 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
 
import { Order } from '../../models/order.model';
import { Cartitem } from '../../models/cartitem.model';
import { Category } from '../../models/category.model';
import { Book } from '../../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private pageUrl="http://localhost:8080/api/books";
  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(this.pageUrl);
  }

  getBookById(id: number): Observable<Book>{
    return this.http.get<Book>(this.pageUrl + '/byId/' + id);
  }

  searchBooks(title: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.pageUrl}/search?title=${title}`);
  }


  reduceBookQuantity(cartItem: Cartitem, book: Book ): Observable<Object> {
    return this.http.post(`${this.pageUrl}/reduce/${book.id}/${cartItem.quantity}`, cartItem);
  }

  // increaseBookQuantity(cartItem: Cartitem): Observable<Object>{
  //   return this.http.put(`${this.pageUrl}/increase/${cartItem.id}/${cartItem.quantity}`, cartItem);
  // }

  // getBookByCategory(category: Category): Observable<Book[]> {
  //   return this.http.get<Book[]>(`${this.pageUrl}/{category}`);
  // }

  findBookByTitle(title: string): Observable<Book> {
    return this.http.get<Book>(`${this.pageUrl}/byTitle/${title}`);
  }

  checkSoldOut(id: number, soldout: number): Observable<Object> {
    return this.http.post(`${this.pageUrl}/check/${id}/${soldout}`, null);
  }
  
  
  getBooksIgnoreCategory(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.pageUrl}/ignoreCategory`);
  }
}
