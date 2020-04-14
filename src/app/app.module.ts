import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RestApiService } from "./shared/rest-api.service";
import { TonumPipe } from './tonum.pipe';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { HelpComponent } from './help/help.component';
import { SettingsComponent } from './settings/settings.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ReportsComponent } from './reports/reports.component';
import { InventoryComponent } from './inventory/inventory.component';


@NgModule({
  declarations: [
    AppComponent,
    InvoiceComponent,
    TonumPipe,
    HomeComponent,
    HelpComponent,
    SettingsComponent,
    ContactsComponent,
    ReportsComponent,
    InventoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [RestApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
