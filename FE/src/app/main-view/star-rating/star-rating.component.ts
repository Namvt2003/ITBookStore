import { Book } from '../../../models/book.model';
import { BookService } from './../../services/book.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
  @Input() book!: Book ;
  @Input() total = 5;
  @Input() rating = 0;
  @Input() readonly = false;
  @Input() size = '24px';
  @Input() type: 'filled' | 'hollow' = 'hollow';
  @Input() filledColor = '#ddfa5c';
  @Input() emptyColor = '#ffff';
  @Output() rated = new EventEmitter<number>();
  books: Book[] = [];
  ratings: number[] = [];
  constructor(private bookService : BookService ) {}

  ngOnInit() {
    this.rating = this.book.rating;
    console.log(this.book.title);
    console.log(this.book.rating);
    // this.bookService.getBooks().subscribe((data) => {
    //   this.books = data;
    //   this.ratings = data.map(book => book.rating);
    // })


    for (let i = 1; i <= this.total; i++) {
      this.ratings.push(i);
    }
  }

  getRatingColor(index: number): string {
    return this.rating >= index || this.rating >= index - 0.5
      ? 'yellow'
      : 'white';
  }

  getIcon(index: number): string {
    if (this.rating >= index) {
      return 'star';
    } else {
      if (this.rating >= index - 0.5) {
        return 'star_half';
      } else {
        return this.type === 'hollow' ? 'star_border' : 'star';
      }
    }
  }

  rate(index: number): void {
    if (!this.readonly) {
      this.rating = index;
      this.rated.emit(index);
    }
  }
}