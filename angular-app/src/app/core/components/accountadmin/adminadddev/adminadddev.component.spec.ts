import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminadddevComponent } from './adminadddev.component';

describe('AdminadddevComponent', () => {
  let component: AdminadddevComponent;
  let fixture: ComponentFixture<AdminadddevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminadddevComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminadddevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
