import { LoadingService } from './../../services/loading.service';
import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Cartitem } from '../../../models/cartitem.model';
import { AddtocartService } from '../../services/addtocart.service';
import { LoadingstateService } from '../../services/loadingstate.service';
import { Book } from '../../../models/book.model';
import { DetectaddtocartService } from '../../services/detectaddtocart.service';
 

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrl: './contents.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentsComponent implements OnInit {

  constructor(private detectAddToCartService: DetectaddtocartService,private loadingStateService: LoadingstateService,private addToCartService: AddtocartService,private router: Router,private route: ActivatedRoute, private bookService: BookService, private loadingService: LoadingService, private cdr:ChangeDetectorRef) {}
  @Output() loadingComplete = new EventEmitter<void>();
  book!: Book ;
  cartItem: Cartitem[] = [];
  isLoading = false;
  bookSoldOut: boolean[] = [];
  @Input() quantity: number = 1;
  @Output() quantityChange = new EventEmitter<number>();
  ngOnInit(): void {
    this.loadingService.loadingOn();
    this.isLoading = true;
    
    this.route.params.subscribe((params) => {
      this.bookService.getBookById(params['id']).subscribe(
        (data) => {
          this.book = data;
          
          this.isLoading = false;
          this.loadingService.loadingOff();
          this.loadingStateService.setComponentLoaded('contents');
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error loading book details:', error);
          this.isLoading = false;
          this.loadingService.loadingOff();
          this.loadingStateService.setComponentLoaded('contents');
          this.cdr.detectChanges();
          
        }
      );
    });
    


  }




    increase() {
      this.quantity++;
      this.quantityChange.emit(this.quantity);
    }
  
    decrease() {
      if (this.quantity > 1) {
        this.quantity--;
        this.quantityChange.emit(this.quantity);
      }
    }
    payment(): void{
      
      this.addToCartService.getCartItems().subscribe((cartItems: Cartitem[]) => {
        this.cartItem = cartItems;
        console.log(cartItems);
     
     
      
      // this.cdr.detectChanges();
      // console.log("Cart Items length: "+this.cartItem.length);
     
      if(this.cartItem.length === 0){
     
        const itemToAdd = {
          title: this.book.title,
          quantity: this.quantity,
          totalPrice: this.book.price * this.quantity,
          image_url: this.book.image_url,
          id: 0
      };    
     
       
      this.addToCartService.saveToCart(itemToAdd).subscribe(response => {
        console.log('Item added to cart:', response);
        this.detectAddToCartService.notifyAddToCart();
      }, error => {
        console.error('Failed to add item to cart:', error);
      });
      
    }
 
      this.router.navigateByUrl('payment');
    });
    }

    addToCart(): void{
        const itemToAdd = {
            title: this.book.title,
            quantity: this.quantity,
            totalPrice: this.book.price * this.quantity,
            image_url: this.book.image_url,
            id: 0
        };    
        // JSON.parse(JSON.stringify(itemToAdd));
        // this.addToCartService.saveToCart(itemToAdd);
        console.log();
        this.addToCartService.saveToCart(itemToAdd).subscribe(response => {
          console.log('Item added to cart:', response);
          this.detectAddToCartService.notifyAddToCart();
        }, error => {
          console.error('Failed to add item to cart:', error);
        });
        console.log(itemToAdd);
         
    }
    }
  
      

