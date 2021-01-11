import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientappsComponent } from './clientapps.component';

describe('ClientappsComponent', () => {
  let component: ClientappsComponent;
  let fixture: ComponentFixture<ClientappsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientappsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientappsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
