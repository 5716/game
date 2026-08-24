import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessNumber } from './guess-number';

describe('GuessNumber', () => {
  let component: GuessNumber;
  let fixture: ComponentFixture<GuessNumber>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuessNumber]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuessNumber);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
