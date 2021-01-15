import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindevsComponent } from './admindevs.component';

describe('AdmindevsComponent', () => {
  let component: AdmindevsComponent;
  let fixture: ComponentFixture<AdmindevsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmindevsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmindevsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
