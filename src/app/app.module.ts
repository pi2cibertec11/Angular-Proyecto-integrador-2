import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {Http, Response,HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { ProductModule } from './products/product.module';
import {ClientModule} from './clients/client.module';
import {ProductService} from './products/product.service';
import {ClientComponent} from './clients/client.component';
import {ClientRegComponent} from './clients/client-reg.component';
import {ClientService } from './clients/client.service';
import * as bootstrap from 'bootstrap';
import * as jquery from 'jquery';
import {FormsModule} from '@angular/forms';
import {PopupModule} from 'ng2-opd-popup';

import { LocalStorageHelper } from './shared/localStorageHelper';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
   
  ],
  providers: [ProductService,ClientService,LocalStorageHelper
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    PopupModule.forRoot(),
    RouterModule.forRoot([
        { path: 'welcome', component: WelcomeComponent },
        { path: '', redirectTo: 'welcome', pathMatch: 'full'},
        { path: '**', redirectTo: 'welcome', pathMatch: 'full'}
       
    ]),
    ProductModule,
    ClientModule,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
