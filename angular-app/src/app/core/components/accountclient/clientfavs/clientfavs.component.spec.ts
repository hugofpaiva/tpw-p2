import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientfavsComponent } from './clientfavs.component';

describe('ClientfavsComponent', () => {
  let component: ClientfavsComponent;
  let fixture: ComponentFixture<ClientfavsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientfavsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientfavsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
