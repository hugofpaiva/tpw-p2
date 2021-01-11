import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatefavoritesComponent } from './updatefavorites.component';

describe('UpdatefavoritesComponent', () => {
  let component: UpdatefavoritesComponent;
  let fixture: ComponentFixture<UpdatefavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatefavoritesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatefavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
