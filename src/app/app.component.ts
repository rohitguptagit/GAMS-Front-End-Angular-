import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Student } from './student';
import { StudentService } from './student.service';
import { Performance } from './performance';
import { PerformanceService } from './performance.service';

@Component({
  selector: 'my-app',
  template: `
  <nav class="navbar navbar navbar-static-top">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" routerLink="/home" routerLinkActive="active">GAMS Home</a>
    </div>
    <ul class="nav navbar-nav">
      <li><a routerLink="/students"  routerLinkActive="active">Student Data</a></li>
      <li><a routerLink="/indicators"  routerLinkActive="active">Indicator Analysis</a></li>
      <li><a routerLink="/attributes"  routerLinkActive="active">Graduate Attribute Analysis</a></li>
    </ul>
  </div>
</nav>
<router-outlet></router-outlet>
    <div class="container">
      <div class="row">
      </div>
    </div>
    <div class = "container">
    <router-outlet></router-outlet>
    </div>
  `,
  providers: [PerformanceService]
})
export class AppComponent implements OnInit {

  ngOnInit(){

  }
 
}
