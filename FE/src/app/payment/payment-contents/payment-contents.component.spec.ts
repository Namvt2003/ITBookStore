import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentContentsComponent } from './payment-contents.component';

describe('PaymentContentsComponent', () => {
  let component: PaymentContentsComponent;
  let fixture: ComponentFixture<PaymentContentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentContentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
