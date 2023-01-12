import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { registerLocaleData } from '@angular/common';  // module regional frnaçais
import localeFr from '@angular/common/locales/fr';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HotelModule } from './hotels/hotel.module';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';





registerLocaleData(localeFr, 'fr');   // enregistrer le module regional français

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
      ],
    imports: [
        BrowserModule,   // permet d'utiliser les directives *ngIf et *ngFor
        FormsModule,     // permet d'utiliser ngModel
        HttpClientModule,  // envoie des requetes http  httpClient
        HotelModule ,
        AppRoutingModule   // ce module routing doit être declaré en dernier si il va bloquer les routes declaées dans HotelModule   
    ],
    providers: [],
    bootstrap: [AppComponent],
    
})
export class AppModule { }
