import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryMedalsChart } from './country-medals-chart';

describe('CountryMedalsChart', () => {
  let component: CountryMedalsChart;
  let fixture: ComponentFixture<CountryMedalsChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryMedalsChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryMedalsChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
