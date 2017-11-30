import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }  from './app.component';
import { HomeComponent } from './home/home.component';
import { MajorListComponent }    from './indicators/major-list.component';
import { AttrMajorListComponent }    from './attributes/attr-major-list.component';
import { StudentDetailComponent } from './students/student-detail.component';
import { StudentListComponent } from './students/student-list.component';
import { IndicatorListComponent } from './indicators/indicator-list.component';
import { IndicatorDetailComponent } from './indicators/indicator-detail.component';
import { AttributeListComponent } from './attributes/attribute-list.component';
import { AttributeDetailComponent } from './attributes/attribute-detail.component';
import { AggregateDetailComponent } from './attributes/aggregate-detail.component';
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
    HomeComponent,
    MajorListComponent,
    AttrMajorListComponent,
    StudentDetailComponent,
    StudentListComponent,
    IndicatorListComponent,
    IndicatorDetailComponent, 
    AttributeListComponent,
    AttributeDetailComponent, 
    AggregateDetailComponent

  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
