import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpurchasesComponent } from './adminpurchases.component';

describe('AdminpurchasesComponent', () => {
  let component: AdminpurchasesComponent;
  let fixture: ComponentFixture<AdminpurchasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminpurchasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
