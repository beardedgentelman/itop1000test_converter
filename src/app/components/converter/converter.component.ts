import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CurrencyService } from '../../services/currency-service.service';
import { ICurrency } from '../../models/currency';
import { ConverterItemComponent } from '../converter-item/converter-item.component';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css'],
})
export class ConverterComponent implements OnInit, AfterViewInit {
  @ViewChild('ci1') ci1: ConverterItemComponent;
  @ViewChild('ci2') ci2: ConverterItemComponent;

  rates: ICurrency[];
  input: number;
  inputCurrency: string;
  output: number;
  outputCurrency: string;

  constructor(private currencyService: CurrencyService) {
    this.inputCurrency = 'UAH';
    this.outputCurrency = 'UAH';
  }

  ngOnInit(): void {
    this.currencyService.getAllRates().subscribe(
      (data) => {
        this.rates = data.filter(
          (rate) => rate.cc === 'USD' || rate.cc === 'EUR'
        );
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-GB');
        const hryvnia = {
          r030: 980,
          txt: 'Гривня',
          rate: 1,
          cc: 'UAH',
          exchangedate: formattedDate,
        };
        this.rates.push(hryvnia);

        this.subscribeToInputChanges();

        console.log(
          this.ci1.value,
          this.ci1.currency,
          this.ci2.value,
          this.ci2.currency
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.convert();
  }

  subscribeToInputChanges(): void {
    this.ci1.onInputChangeSubject.subscribe((value: number) => {
      this.input = value;
      this.convert();
    });
    this.ci1.onSelectChangeSubject.subscribe((currency: string) => {
      this.inputCurrency = currency;
      this.convert();
    });
    this.ci2.onInputChangeSubject.subscribe((value: number) => {
      this.output = value;
      this.convert();
    });
    this.ci2.onSelectChangeSubject.subscribe((currency: string) => {
      this.outputCurrency = currency;
      this.convert();
    });
  }

  convert() {
    if (!this.rates) {
      return;
    }

    const inputRate = this.inputCurrency
      ? this.rates.find((rate) => rate.cc === this.inputCurrency)?.rate
      : undefined;

    const outputRate = this.outputCurrency
      ? this.rates.find((rate) => rate.cc === this.outputCurrency)?.rate
      : undefined;
    if (inputRate && outputRate) {
      const outputValue = (this.input * inputRate) / outputRate;
      const inputValue = (this.output * outputRate) / inputRate;
      this.ci1.setValue(+inputValue.toFixed(2));
      this.ci2.setValue(+outputValue.toFixed(2));
    }
  }
}
