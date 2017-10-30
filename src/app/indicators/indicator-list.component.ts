// Imports
import { Component, OnInit, Input } from '@angular/core';
import { Performance } from '../performance';
import { PerfDist } from '../perfs/perfdist';
import { IndicatorDetailComponent } from './indicator-detail.component';

@Component({
  selector: 'indicator-list',
  template: `
     <div *ngIf="major">
      <h3>{{title}}</h3>
       <ul class="inds">
          <li *ngFor="let ind of major.range.inds"
          [class.selected]="ind === selectedInd"
            (click)="onSelect(ind)">
            {{ind.name}}
          </li>
        </ul>
        <div *ngIf="selectedInd">
          <indicator-detail [indicator]="selectedInd"></indicator-detail>
        </div>
        </div>
        
    `,
  styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .inds {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .inds li {
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
    .inds li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .inds li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .inds .text {
      position: relative;
      top: -3px;
    }
    .inds .badge {
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
})
// Component class implementing OnInit
export class IndicatorListComponent implements OnInit {
  
  @Input() major: Performance;

  title = 'Available Indicators:';

  selectedInd: PerfDist;

  onSelect(ind: PerfDist): void {
    this.selectedInd = ind;
  }

  // Load data ones componet is ready
  ngOnInit() {
  }
}
