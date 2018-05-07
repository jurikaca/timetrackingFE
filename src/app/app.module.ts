import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';

import { AppComponent } from './app.component';
import { TimeService } from './providers/time-service';
import {ToasterModule} from 'angular2-toaster';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { TableComponent } from './table/table.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
    declarations: [
        AppComponent,
        TableComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        ToasterModule.forRoot(),
        HttpModule,
        FormsModule,
        AngularDateTimePickerModule
    ],
    providers: [
        TimeService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
