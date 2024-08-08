import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { debounceTime, Subscription, switchMap, take } from 'rxjs';
import { AddtocartService } from '../../services/addtocart.service';
import { Cartitem } from '../../../models/cartitem.model';
import { Book } from '../../../models/book.model';
import { FormControl } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from '../../services/loading.service';
import { DetectaddtocartService } from '../../services/detectaddtocart.service';

@Component({
  selector: 'app-payment-navbar',
  templateUrl: './payment-navbar.component.html',
  styleUrl: './payment-navbar.component.css'
})
export class PaymentNavbarComponent implements OnInit {
  quantity!: number;
  cartProducts: Cartitem[] = [];
  filteredBooks: Book[] = [];
  searchControl = new FormControl();
  bookList: Book[] = [];
  cartTotalPrice!: number;
  isLoading = false;
  isSticky = false;
  private addToCartSubscription!: Subscription;
  constructor(
    private carItemService: AddtocartService, 
    private router: Router, 
    private bookService: BookService, 
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private loadingService: LoadingService,
    private detectAddToCartService: DetectaddtocartService
  ) {}

  ngOnInit(): void {
   
    this.isLoading = true;
    this.carItemService.sumOfCartItems().pipe(
      take(1)   
    ).subscribe({
      next: (sum) => {
        this.quantity = sum;
        
        this.cdr.detectChanges();
      },
      complete: () => {
        this.loadingService.loadingOff();
        this.isLoading = false;
      }
    });

    this.carItemService.getCartItems().subscribe((cartItems: Cartitem[]) => {
      this.cartProducts = cartItems;
      this.quantity = this.calculateQuantity(cartItems);
      this.cartTotalPrice = this.totalOfCartPrice();
      this.cdr.detectChanges();
    });


  
    this.bookService.getBooks().subscribe((books: Book[]) => {
      this.bookList = books;
    });


    
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      switchMap((term: string) => this.bookService.searchBooks(term))
    ).subscribe(results => {
      this.filteredBooks = results;
    });
    this.cartTotalPrice = this.totalOfCartPrice();
    this.addToCartSubscription = this.detectAddToCartService.addToCart$.subscribe(() => {
      this.updateCartQuantity();
      this.cartTotalPrice = this.totalOfCartPrice();
      this.cdr.detectChanges();
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.pageYOffset > 50) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }

  ngOnDestroy(): void {
    if (this.addToCartSubscription) {
      this.addToCartSubscription.unsubscribe();
    }
  }
  updateCartQuantity(): void {
    this.carItemService.sumOfCartItems().pipe(take(1)).subscribe(sum => {
      this.quantity = sum;
      
      this.cdr.detectChanges();
    });
    this.cartTotalPrice = this.totalOfCartPrice();
  }

  calculateQuantity(cartItems: Cartitem[]): number {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }


  totalOfCartPrice(): number {
    let sum = 0;
    for(let i = 0; i<this.cartProducts.length;i++){
      sum += this.cartProducts[i].totalPrice;
      console.log(this.cartProducts[i].totalPrice);
    }
    
    return sum;
    
  }

  numberOfItems(): number {
    let totalItems: number = 0;
    this.carItemService.sumOfCartItems().subscribe(sum => totalItems = sum);
    return totalItems;
  }

  redirectToSale(): void {
    this.router.navigateByUrl("/payment");
  }

  onSearch(): void {
    const searchTerm = this.searchControl.value;
    this.bookService.searchBooks(searchTerm).subscribe(results => {
      this.filteredBooks = results;
      this.cdr.detectChanges();
    });
  }

  goToDetails(id: number): void {
    this.router.navigateByUrl(`book-details/${id}`);
  }

  filterSearch(text: string): void {
    if (!text) {
      this.filteredBooks = this.bookList;
      return;
    }

    this.filteredBooks = this.bookList.filter(
      bookResult => bookResult?.title.toLowerCase().includes(text.toLowerCase())
    );
  }

  cleanCart(): void{
    this.carItemService.cleanCart().subscribe(() => {
      this.cartProducts = [];
      this.quantity = 0;
      this.cdr.detectChanges();
    });
  }
  toContactForm(): void{
     this.router.navigateByUrl('contact');
  }
  

}
