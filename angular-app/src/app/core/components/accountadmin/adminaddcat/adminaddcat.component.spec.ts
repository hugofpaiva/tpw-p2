import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaddcatComponent } from './adminaddcat.component';

describe('AdminaddcatComponent', () => {
  let component: AdminaddcatComponent;
  let fixture: ComponentFixture<AdminaddcatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminaddcatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminaddcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
