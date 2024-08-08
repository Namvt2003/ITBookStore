import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageNavbarComponent } from './admin-manage-navbar.component';

describe('AdminManageNavbarComponent', () => {
  let component: AdminManageNavbarComponent;
  let fixture: ComponentFixture<AdminManageNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminManageNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManageNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
