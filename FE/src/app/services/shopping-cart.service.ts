import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  get items(): CartItem[] {
    return this.itemsSubject.value;
  }

  addItem(item: CartItem) {
    const items = [...this.items];
    const existingItem = items.find(i => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      items.push(item);
    }

    this.itemsSubject.next(items);
  }

  removeItem(itemId: number) {
    const items = this.items.filter(item => item.id !== itemId);
    this.itemsSubject.next(items);
  }

  clearCart() {
    this.itemsSubject.next([]);
  }
}
