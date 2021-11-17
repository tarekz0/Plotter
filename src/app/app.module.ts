import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {MaterialsModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DndModule} from 'ngx-drag-drop';
import {HighchartsChartModule} from 'highcharts-angular';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MatNativeDateModule,
        MaterialsModule,
        DndModule,
        FlexLayoutModule,
        HighchartsChartModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(
            {
                disableTimeOut: true,
                positionClass: 'toast-bottom-right',
                closeButton: true,
                maxOpened: 1
            }
        ),
        NgxSpinnerModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
