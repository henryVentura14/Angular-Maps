import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MapsModule } from './maps/maps.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MapsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
