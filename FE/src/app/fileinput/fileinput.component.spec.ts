import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileinputComponent } from './fileinput.component';

describe('FileinputComponent', () => {
  let component: FileinputComponent;
  let fixture: ComponentFixture<FileinputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileinputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
