import { ChangeDetectorRef, Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Cartitem } from '../../../models/cartitem.model';
import { Slider } from '../../../models/slider.model';
import { Book } from '../../../models/book.model';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, Subscription, switchMap, take } from 'rxjs';
import { AddtocartService } from '../../services/addtocart.service';
import { LoadingService } from '../../services/loading.service';
import { BookService } from '../../services/book.service';
import { SliderService } from '../../services/slider.service';
import { LoadingstateService } from '../../services/loadingstate.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetectaddtocartService } from '../../services/detectaddtocart.service';

@Component({
  selector: 'app-page-view-navbar',
  templateUrl: './page-view-navbar.component.html',
  styleUrl: './page-view-navbar.component.css'
})
export class PageViewNavbarComponent implements OnInit, OnDestroy {
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
    this.loadingService.loadingOn();
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
    
    
      
    
   
   
   

    this.cdr.detectChanges();
    
     
    // this.cartTotalPrice = this.totalOfCartPrice();
  }


  @HostListener('window:scroll', ['$event'])
  checkScroll(): void {
    this.isSticky = window.pageYOffset >= 50;
  }


  ngOnDestroy(): void {
    if (this.addToCartSubscription) {
      this.addToCartSubscription.unsubscribe();
    }
  }
  updateCartQuantity(): void {
    this.carItemService.sumOfCartItems().pipe(take(1)).subscribe(sum => {
      this.quantity = sum;
      this.cartTotalPrice = this.totalOfCartPrice();
      this.cdr.detectChanges();
    });
    
  }

  calculateQuantity(cartItems: Cartitem[]): number {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }


  totalOfCartPrice(): number {
    let sum = 0;
    for(let i = 0; i<this.cartProducts.length;i++){
      sum += this.cartProducts[i].totalPrice;
    
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