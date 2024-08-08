import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Slider } from '../../../models/slider.model';
import { LoadingService } from '../../services/loading.service';
import { SliderService } from '../../services/slider.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-carousel',
  templateUrl: './book-carousel.component.html',
  styleUrls: ['./book-carousel.component.css']
})
export class BookCarouselComponent implements OnInit {
  isLoading = false;
  sliders: Slider[]=[];
  private routerSubscription!: Subscription;
  constructor(private loadingService: LoadingService, private sliderService: SliderService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loadingService.loadingOn();
    this.isLoading = true;
    this.sliderService.getSliderItems().subscribe((data) => {
      this.sliders = data;
      this.isLoading = false;
    this.cdr.detectChanges();
    console.log(data);
    this.loadingService.loadingOff();
    }
    );
  }
}
