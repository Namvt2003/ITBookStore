 
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../../models/category.model';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-fixedsidenav',
  templateUrl: './fixedsidenav.component.html',
  styleUrl: './fixedsidenav.component.css'
})

export class FixedsidenavComponent implements OnInit{
  @Output() categorySelected = new EventEmitter<string>();
   menuItems: Category[] = [];
  private isLoading = false;
  constructor(private cdr: ChangeDetectorRef,private loadingService: LoadingService,private categoryService: CategoryService) {}
  ngOnInit(): void {
      this.loadMenuItems();
      console.log(this.menuItems);
  }
   


  loadMenuItems(): void {
    this.isLoading = true;
    this.loadingService.loadingOn();
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.menuItems = data;
        this.isLoading  = false;
        this.loadingService.loadingOff();
        this.cdr.detectChanges();

      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }


  PageFilter(categoryId: number): void {
     this.categorySelected.emit(categoryId.toString());
  }
}
