import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }  from './app.component';
import { MajorListComponent }    from './indicators/major-list.component';
import { StudentDetailComponent } from './students/student-detail.component';
import { StudentListComponent } from './students/student-list.component';
import { IndicatorListComponent } from './indicators/indicator-list.component';
import { IndicatorDetailComponent } from './indicators/indicator-detail.component';
import { routing } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule,
    routing
  ],
  declarations: [
    AppComponent,
    MajorListComponent,
    StudentDetailComponent,
    StudentListComponent,
    IndicatorListComponent,
    IndicatorDetailComponent 
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
