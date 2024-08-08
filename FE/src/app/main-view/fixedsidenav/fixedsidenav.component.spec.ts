import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedsidenavComponent } from './fixedsidenav.component';

describe('FixedsidenavComponent', () => {
  let component: FixedsidenavComponent;
  let fixture: ComponentFixture<FixedsidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FixedsidenavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixedsidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
