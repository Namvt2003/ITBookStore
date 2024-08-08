import { BookService } from './../../services/book.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Book } from '../../../models/book.model';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent implements OnInit {
  quantity!: number;
 
  filteredBooks: Book[] = [];
  searchControl = new FormControl();
  bookList: Book[] = [];
  isStitcky = false;

  constructor(private bookService:BookService, private router: Router) {
    
  }

  ngOnInit(): void {
   
    this.bookService.getBooks().subscribe((books: Book[]) => {
      this.bookList = books;
    });


    
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      switchMap((term: string) => this.bookService.searchBooks(term))
    ).subscribe(results => {
      this.filteredBooks = results;
    });

  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.pageYOffset > 50) {
      this.isStitcky = true;
    } else {
      this.isStitcky = false;
    }
  }

  redirectToSale() {
    this.router.navigateByUrl("/sale");
  }


  onSearch(): void {
    const searchTerm = this.searchControl.value;
    this.bookService.searchBooks(searchTerm).subscribe(results => {
      this.filteredBooks = results;
      
    });
  }

  goToDetails(id: number): void {
    this.router.navigateByUrl(`book-details/${id}`);
  }




   
}
