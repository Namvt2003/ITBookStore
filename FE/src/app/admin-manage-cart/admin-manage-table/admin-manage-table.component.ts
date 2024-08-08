import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { forkJoin } from 'rxjs';
import { Order } from '../../../models/order.model';
import * as XLSX from 'xlsx';
 

@Component({
  selector: 'app-admin-manage-table',
  templateUrl: './admin-manage-table.component.html',
  styleUrl: './admin-manage-table.component.css'
})
export class AdminManageTableComponent implements OnInit {
  orderForm!: FormGroup;
  sampleOrders!: Order[];
  constructor(private fb: FormBuilder, private orderService: OrderService) {}

  ngOnInit() {
    this.orderForm = this.fb.group({
      orders: this.fb.array([])
    });

    // this.orderService.getOrders().subscribe((orders: Order[]) => {
    //   this.sampleOrders = orders;
    //   this.sampleOrders.forEach(order => {
    //     console.log(order);
    //     this.addOrder(order);
    //   });
    // });
    this.loadOrders();
    

  }


  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.sampleOrders);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orders');

    XLSX.writeFile(wb, 'Orders.xlsx');
  }

  loadOrders() {
    this.orderService.getOrders().subscribe((orders: Order[]) => {
      const bookNameObservables = orders.map(order => 
         this.orderService.getBookNamesForOrder(order.id)
      );

      forkJoin(bookNameObservables).subscribe((bookNamesArrays: string[][]) => {
        orders.forEach((order, index) => {
          order.booknames = bookNamesArrays[index];
 
          this.addOrder(order);
        });
        
        this.sampleOrders = orders;
      });
    });
  
  }

  
  get orders() {
    return this.orderForm.get('orders') as FormArray;
  }

  addOrder(order: Order) {
    const orderForm = this.fb.group({
      id: [order.id],
      customerName: [order.customer_name],
      address: [order.address],
      bookNames: [order.booknames],
      quantity: [order.quantity],
      totalPrice: [order.totalprice],
      isCheckedOut: [order.checkedout]
    });
    
    this.orders.push(orderForm);
  }

  onCheckoutChange(index: number) {
    const order = this.orders.at(index);
    order.patchValue({ isCheckedOut: !order.value.isCheckedOut });
  }

  onDoneClick(index: number) {
    const orderId = this.sampleOrders[index].id;
    console.log(orderId);
    this.orders.removeAt(index);
    this.orderService.deleteBookNames(orderId).subscribe(() => {
      this.orderService.deleteById(orderId).subscribe(() => {
        // Optionally, you can add some logic here to handle successful deletion
      });
    });

    



  }

  getBookNamesString(bookNames: string[]): string {
    return bookNames.join(', ');
  }
}