import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-converter-item',
  templateUrl: './converter-item.component.html',
  styleUrls: ['./converter-item.component.css'],
})
export class ConverterItemComponent {
  value: number = 1;
  currency: string = 'UAH';

  setValue(value: number) {
    this.value = value;
  }

  setCurrency(currency: string) {
    this.currency = currency;
  }

  onInputChangeSubject = new Subject<number>();
  onInputChange(event: any) {
    const inputValue = parseFloat(event.target.value);
    this.value = isNaN(inputValue) ? 0 : inputValue;
    this.onInputChangeSubject.next(this.value);
  }

  onSelectChangeSubject = new Subject<string>();
  onSelectChange(event: any) {
    this.currency = event.target.value;
    this.onSelectChangeSubject.next(this.currency);
  }
}
