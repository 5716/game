import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorGuesser } from './color-guesser';

describe('ColorGuesser', () => {
  let component: ColorGuesser;
  let fixture: ComponentFixture<ColorGuesser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorGuesser],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorGuesser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
