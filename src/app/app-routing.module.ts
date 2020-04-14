import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{HomeComponent} from './home/home.component';
import{InvoiceComponent} from './invoice/invoice.component';
import{ContactsComponent} from './contacts/contacts.component';
import{InventoryComponent} from './inventory/inventory.component';
import {HelpComponent } from './help/help.component';
import{SettingsComponent} from './settings/settings.component';
import{ReportsComponent} from './reports/reports.component'

//const routes: Routes = [];
const routes: Routes = [{ path: '', redirectTo: '/home', pathMatch: 'full'},
{ path: 'home', component: HomeComponent},
{path: 'invoice', component: InvoiceComponent},
{path: 'contacts', component: ContactsComponent},
{path: 'inventory', component: InventoryComponent},
{path: 'help', component: HelpComponent},
{path: 'settings', component: SettingsComponent},
{path: 'reports', component: ReportsComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
