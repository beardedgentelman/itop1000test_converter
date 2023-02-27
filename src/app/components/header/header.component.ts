import { Component, Input, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency-service.service';
import { ICurrency } from '../../models/currency';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;

  usdRate: number;
  eurRate: number;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getAllRates().subscribe((rates: ICurrency[]) => {
      const usd = rates.find((rate) => rate.cc === 'USD');
      const eur = rates.find((rate) => rate.cc === 'EUR');
      this.usdRate = usd?.rate ?? 0;
      this.eurRate = eur?.rate ?? 0;
    });
  }
}
