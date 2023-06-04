import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityInputComponent } from './city-input.component';

describe('CityInputComponent', () => {
  let component: CityInputComponent;
  let fixture: ComponentFixture<CityInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CityInputComponent]
    });
    fixture = TestBed.createComponent(CityInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
