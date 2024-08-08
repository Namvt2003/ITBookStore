import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageViewFooterComponent } from './page-view-footer.component';

describe('PageViewFooterComponent', () => {
  let component: PageViewFooterComponent;
  let fixture: ComponentFixture<PageViewFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageViewFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageViewFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
