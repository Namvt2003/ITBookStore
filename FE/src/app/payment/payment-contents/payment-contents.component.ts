import { Router } from '@angular/router';
  import { AddtocartService } from './../../services/addtocart.service';
  import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { Cartitem } from '../../../models/cartitem.model';
  import { ModalDismissReasons,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '../../services/order.service';
import { Order } from '../../../models/order.model';
import { BookService } from '../../services/book.service';
import { Book } from '../../../models/book.model';
import { Observable } from 'rxjs';



  @Component({
    selector: 'app-payment-contents',
    templateUrl: './payment-contents.component.html',
    styleUrl: './payment-contents.component.css'
  })
  export class PaymentContentsComponent implements OnInit {
    paymentForm: FormGroup;
    cartItem!: Cartitem;
    cartProducts: Cartitem[] = [];
    totalPrice: number = 0;
    closeResult!: string;

    @ViewChild('content') content: any;
    selectedPaymentMethod!: string;
    
    constructor(private bookService: BookService,private cdr: ChangeDetectorRef,private orderService: OrderService,private router: Router,private modalService: NgbModal,private addToCartService: AddtocartService,private fb: FormBuilder, private addToCardService: AddtocartService) {
      this.paymentForm = this.fb.group({
        customerName: ['', Validators.required],
        phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
        address: ['', Validators.required],
        paymentMethod: ['payAfterDelivery', Validators.required] 
        
        
      });
    }
    ngOnInit(): void {
      

      this.addToCartService.getCartItems().subscribe((cartItems: Cartitem[]) => {
        this.cartProducts = cartItems;
        this.totalPrice = 0;
      this.cartProducts.forEach((cartItem: Cartitem) => {
        this.totalPrice += cartItem.totalPrice;
      });
      });
       
     
        
       

    }
    calcTotalPrice(): void{
      this.totalPrice = 0;
      this.cartProducts.forEach((cartItem: Cartitem) => {
        this.totalPrice += cartItem.totalPrice;
      });
    }
    loadCartItems(): void {
      this.addToCartService.getCartItems().subscribe((cartItems: Cartitem[]) => {
        this.cartProducts = cartItems;
      });
    }
    onSubmit() {
      if (this.paymentForm.valid) {
        this.selectedPaymentMethod = this.paymentForm.value.paymentMethod;
        this.open(this.content);
        const order: Order = {
          customer_name: this.paymentForm.value.customerName,
          phonenumber: this.paymentForm.value.phoneNumber,
          address: this.paymentForm.value.address,
          paymentmethod: this.getPaymentMethod(this.paymentForm.value.paymentMethod),
          id: 0,
          totalprice: this.totalPrice,
          quantity: this.cartProducts.length,
          done:  false,
          checkedout: this.paymentForm.value.paymentMethod === 'payViaMomo' || this.paymentForm.value.paymentMethod === 'payViaZaloPay',
          booknames: this.cartProducts.map((cartItem: Cartitem) => cartItem.title)
        };
        console.log(order);
        this.orderService.addOrder(order).subscribe((res: any) => {
          console.log(res);
          this.addToCardService.cleanCart().subscribe((res: any) => {
            for(let i = 0; i < this.cartProducts.length;i++){
              
              this.bookService.findBookByTitle(this.cartProducts[i].title).subscribe((book: Book) => {
                this.bookService.reduceBookQuantity(this.cartProducts[i], book).subscribe((res: any) => {
                  console.log(res + "Reduce book quantity");
                });
              });
            }
            console.log('Cart cleared!');
        }); 

      });
        
        }
       else {
        console.log('Form is invalid');
      }
    }
    

    private getPaymentMethod(method: string): number {
      switch (method) {
        case 'payViaMomo':
          return 1;
        case 'payViaZaloPay':
          return 2;
        case 'payAfterDelivery':
          return 3;
        case 'payViaBankCard':
          return 4;
        default:
          return 0;
      }
    }

    open(content: any) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          if (result === 'Save click') {
             
            this.navigateToMainPage();
          }
        },
        (reason) => {
          
        }
      );
    }
    
    private navigateToMainPage() {
        this.router.navigate(['/main-page']);
    }
    
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }

    

  }
