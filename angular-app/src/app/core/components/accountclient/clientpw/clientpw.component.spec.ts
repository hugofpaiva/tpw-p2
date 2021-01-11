import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientpwComponent } from './clientpw.component';

describe('ClientpwComponent', () => {
  let component: ClientpwComponent;
  let fixture: ComponentFixture<ClientpwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientpwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientpwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
