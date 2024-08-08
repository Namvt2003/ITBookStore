import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { LoadingstateService } from '../../services/loadingstate.service';
import { LoadingService } from '../../services/loading.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageViewComponent implements OnInit {
  isLoading = false;

  constructor(
    private loadingStateService: LoadingstateService,
    private cdr: ChangeDetectorRef,
    private loadingService: LoadingService,
    private responsive: BreakpointObserver
  ) {}

  ngOnInit(): void {

    this.responsive.observe(Breakpoints.HandsetLandscape).subscribe(result => {

      if (result.matches) {
        console.log('HandsetLandscape');
      }
    })
    this.loadingStateService.isLoading$.subscribe(isLoading => {
      this.loadingService.loadingOn();

      this.isLoading = true;
      
      console.log('Loading state:', isLoading); // Add this for debugging
      this.isLoading = false;
      this.loadingService.loadingOff();
      this.cdr.detectChanges();
    });
  }
}