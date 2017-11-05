// Imports
import { Component, OnInit, Input } from '@angular/core';
import { Performance } from '../performance';
import { PerfDist } from '../perfs/perfdist';
import { AttributeDetailComponent } from './attribute-detail.component';
import { AggregateDetailComponent } from './aggregate-detail.component';

@Component({
  selector: 'attribute-list',
  template: `
     <div *ngIf="major">
      <h3>{{title}}</h3>
       <ul class="atts">
          <li *ngFor="let attr of major.range.atts"
          [class.selected]="attr === selectedAttr"
            (click)="onSelect(attr)">
            {{attr.name}}
          </li>
          <li [class.selected]="agg"
          (click)="onSelectAgg()"> Aggregated GA's</li>
        </ul>
        <div *ngIf="agg">
           <aggregate-detail [aggregate]="major.range.atts"></aggregate-detail>
        </div>
        <div *ngIf="selectedAttr && !agg">
          <attribute-detail [attribute]="selectedAttr"></attribute-detail>
        </div>
        </div>
        
    `,
  styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .atts {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 25em;
    }
    .atts li {
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
    .atts li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .atts li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .atts .text {
      position: relative;
      top: -3px;
    }
    .atts .badge {
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
export class AttributeListComponent implements OnInit {
  
  @Input() major: Performance;

  title = 'Available Graduate Attributes:';

  selectedAttr: PerfDist;
  agg: boolean = false;

  onSelect(attr: PerfDist): void {
    this.selectedAttr = attr;
    this.agg = false;
  }

  onSelectAgg(): void {
    this.selectedAttr = null;
    this.agg = true;
  }

  // Load data ones componet is ready
  ngOnInit() {
  }
}
