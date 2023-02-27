import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GlobalErrorComponent } from './components/global-error/global-error.component';
import { ConverterComponent } from './components/converter/converter.component';
import { AppRoutingModule } from './app-routing.module';
import { ConverterItemComponent } from './components/converter-item/converter-item.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GlobalErrorComponent,
    ConverterComponent,
    ConverterItemComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
