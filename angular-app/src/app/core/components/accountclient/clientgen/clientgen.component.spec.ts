import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientgenComponent } from './clientgen.component';

describe('ClientgenComponent', () => {
  let component: ClientgenComponent;
  let fixture: ComponentFixture<ClientgenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientgenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientgenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
