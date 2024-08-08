import { LoadingService } from './../../services/loading.service';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap, take } from 'rxjs/operators';
import { BookService } from '../../services/book.service';
import { AddtocartService } from '../../services/addtocart.service';
import { Book } from '../../../models/book.model';
import { Cartitem } from '../../../models/cartitem.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactpopupComponent } from '../../contactpopup/contactpopup.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  quantity: number = 0;
  cartProducts: Cartitem[] = [];
  filteredBooks: Book[] = [];
  searchControl = new FormControl();
  bookList: Book[] = [];
  cartTotalPrice!: number;
  isLoading = false;
  isStitcky = false;

  constructor(
    private carItemService: AddtocartService, 
    private router: Router, 
    private bookService: BookService, 
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.loadingOn();
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

    setTimeout(() => {
      this.cartTotalPrice = this.totalOfCartPrice();
      this.loadingService.loadingOff();
      this.isLoading = false;
    }, 1000);
    
     
    this.cdr.detectChanges();

    
  }


  navigateToMainPage(): void {
    this.router.navigateByUrl('/main-page').then(() => {
      window.location.reload();
    }
    );

  }

  @HostListener('window:scroll', ['$event'])
  checkScroll(): void {
    this.isStitcky = window.pageYOffset >= 50;
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
    setTimeout(() => {
    this.router.navigateByUrl("/payment");
    },1000);
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
