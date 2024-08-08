import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoadingstateService } from '../../services/loadingstate.service';

@Component({
  selector: 'app-page-view-footer',
  templateUrl: './page-view-footer.component.html',
  styleUrl: './page-view-footer.component.css'
})
export class PageViewFooterComponent implements OnInit {
  constructor(private loadingStateService: LoadingstateService) {}
  ngOnInit(): void {
     
    setTimeout(() => {
      this.loadingStateService.setComponentLoaded('footer');
    }, 500);
  }
  
  
  
}
