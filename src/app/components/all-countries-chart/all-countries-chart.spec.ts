import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCountriesChart } from './all-countries-chart';

describe('AllCountriesChart', () => {
  let component: AllCountriesChart;
  let fixture: ComponentFixture<AllCountriesChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCountriesChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCountriesChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
