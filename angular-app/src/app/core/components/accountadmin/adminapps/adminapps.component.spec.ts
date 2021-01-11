import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminappsComponent } from './adminapps.component';

describe('AdminappsComponent', () => {
  let component: AdminappsComponent;
  let fixture: ComponentFixture<AdminappsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminappsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminappsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
