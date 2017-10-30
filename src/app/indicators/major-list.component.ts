// Imports
import { Component, OnInit } from '@angular/core';
import { Performance } from '../performance';
import { PerformanceService } from '../performance.service';
import { IndicatorListComponent } from './indicator-list.component'

@Component({
  template: `
     <div class="col-md-3">
        <ul class="majors">

          <li *ngFor="let major of performances"
          [class.selected]="major === selectedMajor"
            (click)="onSelect(major)">
            {{major.name}}
          </li>
        </ul>
        </div>
        <div class="col-md-9">
          <indicator-list [major]="selectedMajor"></indicator-list>
        </div>
    `,
  styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .majors {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .majors li {
      text-align: center;
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .majors li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .majors li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .majors .text {
      position: relative;
      top: -3px;
    }
    .majors .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `],
    // Providers
    providers: [PerformanceService]
})
// Component class implementing OnInit
export class MajorListComponent implements OnInit {


  performances: Performance[];
  selectedMajor: Performance;

  constructor(private performanceService: PerformanceService) {

  }

getPerformances(): void{
    this.performanceService.getPerformances().then(performances => this.performances = performances);
}

onSelect(major: Performance): void {
    this.selectedMajor = major;
  }

  ngOnInit(){
    this.getPerformances();
  }
}

