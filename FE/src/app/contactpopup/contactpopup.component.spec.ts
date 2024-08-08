import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactpopupComponent } from './contactpopup.component';

describe('ContactpopupComponent', () => {
  let component: ContactpopupComponent;
  let fixture: ComponentFixture<ContactpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactpopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
