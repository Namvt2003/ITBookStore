import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }
  login(user: User ): Observable<object>{
      console.log(user);
      return this.http.post("http://localhost:8080/api/login",user);
  }
}
