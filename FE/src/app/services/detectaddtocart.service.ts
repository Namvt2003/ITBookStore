import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetectaddtocartService {
  flag: boolean = false;
  private addToCartSubject = new Subject<void>();
  addToCart$ = this.addToCartSubject.asObservable();
  constructor() { }

  notifyAddToCart(){
    this.addToCartSubject.next();
    // window.location.reload();
  }

  getFlag() : boolean {
    return this.flag;
  }

  setFlag(flag: boolean) {
    this.flag = flag;
  }
}
