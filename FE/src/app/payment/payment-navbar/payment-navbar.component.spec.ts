import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentNavbarComponent } from './payment-navbar.component';

describe('PaymentNavbarComponent', () => {
  let component: PaymentNavbarComponent;
  let fixture: ComponentFixture<PaymentNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
