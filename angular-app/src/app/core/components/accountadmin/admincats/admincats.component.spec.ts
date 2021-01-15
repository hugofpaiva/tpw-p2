import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincatsComponent } from './admincats.component';

describe('AdmincatsComponent', () => {
  let component: AdmincatsComponent;
  let fixture: ComponentFixture<AdmincatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmincatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
