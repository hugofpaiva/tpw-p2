import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientrevsComponent } from './clientrevs.component';

describe('ClientrevsComponent', () => {
  let component: ClientrevsComponent;
  let fixture: ComponentFixture<ClientrevsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientrevsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientrevsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
