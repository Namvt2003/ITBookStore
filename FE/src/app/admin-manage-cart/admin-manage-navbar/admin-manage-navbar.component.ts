import { Component, HostListener, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../../models/book.model';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs';

@Component({
  selector: 'app-admin-manage-navbar',
  templateUrl: './admin-manage-navbar.component.html',
  styleUrl: './admin-manage-navbar.component.css'
})
export class AdminManageNavbarComponent implements OnInit{
  quantity!: number;
  isSticky = false;
  filteredBooks: Book[] = [];
  searchControl = new FormControl();
  bookList: Book[] = [];
   


  
  constructor(private bookService: BookService, private router: Router) {
    
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
      this.isSticky = true;
    } else {
      this.isSticky = false;
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


  filterSearch(text: string): void {
    if (!text) {
      this.filteredBooks = this.bookList;
      return;
    }

    this.filteredBooks = this.bookList.filter(
      bookResult => bookResult?.title.toLowerCase().includes(text.toLowerCase())
    );
  }
  




   
  goToDetails(id: number): void {
    this.router.navigateByUrl(`book-details/${id}`);
  }

  navigateToMainPage(): void{
    this.router.navigateByUrl('/main-page').then(() => {
      window.location.reload();
  }
);
  }




}
