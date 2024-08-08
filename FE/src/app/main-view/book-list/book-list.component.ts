import { Book } from './../../../models/book.model';
import { LoadingService } from './../../services/loading.service';
import { LoadingComponent } from './../../loading/loading.component';
import { BookService } from '../../services/book.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
 

import { Subscription } from 'rxjs';
import { EventEmitter } from 'node:stream';



 

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent implements OnInit  {
  userRating = 3;
  isLoading = false;
  books: Book[]  =[];
  bookSoldOut: boolean[] = [];
  filteredBooks: Book[] = [];
  private routerSubscription!: Subscription;
  


  constructor(private loadingService: LoadingService,private bookService: BookService, private router: Router,private cdr: ChangeDetectorRef) { }
  


  ngOnInit(): void {
    this.loadData();
  } 


  toDetails(book: Book): void{
    this.loadBookAndNavigate(book.id);
  }


  loadBookAndNavigate(bookId: number): void {
     
    this.loadingService.loadingOn();
    this.isLoading = true;
    this.bookService.getBookById(bookId).subscribe(
      (data) => {
        
        setInterval(() => {
          this.isLoading = false;
          this.loadingService.loadingOff();
        }, 1000);
        this.router.navigateByUrl(`book-details/${bookId}`);
      },
      (error) => {
        console.error('Error loading book details:', error);
        this.isLoading = false;
        this.loadingService.loadingOff();
      }
    );
  }
  


  loadData(): void {
    this.loadingService.loadingOn();
    this.isLoading = true;
    this.bookService.getBooks().subscribe((data) => {
    this.books = data;
    this.filteredBooks = data;
   
    for (let i = 0; i < this.books.length; i++) {
      if(this.books[i].quantity === 0){
        this.bookService.checkSoldOut(this.books[i].id, 1).subscribe(() => {
          this.books[i].soldout = 1;
          this.isLoading = false;
          this.cdr.detectChanges();
         
          this.loadingService.loadingOff();
        
          
        }
        );
      
      }
    }
    this.isLoading = false;
    this.cdr.detectChanges();
   
    this.loadingService.loadingOff();
    }
    );
   
  }

  onCategorySelected(categoryId: string): void {
    for(let i = 0; i < this.books.length; i++){
      if (this.books[i].category && this.books[i].category.id) {
        console.log("Book category id: " + this.books[i].category.id);
      } else {
        console.warn("Book category id is undefined for book: " + this.books[i].title);
      }
    }
    this.filteredBooks = this.books.filter((book) => 
      book.category && book.category.id != null && book.category.id.toString() === categoryId 
    );
  
    console.log("Filtered books: " + this.filteredBooks);
  }
}
