import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contactinfo } from '../../models/contactinfo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private pageUrl="http://localhost:8080/api";
  constructor(private http: HttpClient) { }

  saveContact(obj: Contactinfo): Observable<Object> {
    return this.http.post(`${this.pageUrl}/contacts`, obj);
  }

}
