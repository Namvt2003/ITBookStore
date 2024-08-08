import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageViewNavbarComponent } from './page-view-navbar.component';

describe('PageViewNavbarComponent', () => {
  let component: PageViewNavbarComponent;
  let fixture: ComponentFixture<PageViewNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageViewNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageViewNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
