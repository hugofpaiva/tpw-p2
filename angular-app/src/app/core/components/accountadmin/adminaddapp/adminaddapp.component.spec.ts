import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaddappComponent } from './adminaddapp.component';

describe('AdminaddappComponent', () => {
  let component: AdminaddappComponent;
  let fixture: ComponentFixture<AdminaddappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminaddappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminaddappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
