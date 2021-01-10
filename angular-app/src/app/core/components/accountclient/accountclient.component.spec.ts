import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountclientComponent } from './accountclient.component';

describe('AccountclientComponent', () => {
  let component: AccountclientComponent;
  let fixture: ComponentFixture<AccountclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountclientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
