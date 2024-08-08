import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';

 

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
 private pageUrl = "http://localhost:8080/api/category";
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.pageUrl);
  }
}
