// Imports
import { Component, OnInit, Input, ViewChildren, QueryList} from '@angular/core';
import { Performance } from '../performance';
import { PerfDist } from '../perfs/perfdist';
import { IndicatorDetailComponent } from './indicator-detail.component';
import { AggregateDetailComponent } from '../attributes/aggregate-detail.component';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'indicator-list',
  template: `
     <div *ngIf="major" id="majors">
      <h3>{{title}}</h3>
       <ul class="inds">
          <li *ngFor="let ind of major.range.inds"
          [class.selected]="ind === selectedInd"
            (click)="onSelect(ind)">
            {{ind.name}}

            <indicator-detail [indicator]="ind" [style.display]="'none'"></indicator-detail>
          </li>
          <li [class.selected]="agg"
          (click)="onSelectAgg()"> Aggregated Indicators</li>
        </ul>
        <aggregate-detail [aggregate]="major.range.inds" [style.display]="'none'"></aggregate-detail>

        <button (click)="exportPDF()">Export All to PDF</button>
        <div *ngIf="agg">
           <aggregate-detail [aggregate]="major.range.inds"></aggregate-detail>
        </div>
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
  `]
})
// Component class implementing OnInit
export class IndicatorListComponent implements OnInit {
  
  @Input() major: Performance;

  //constructor(private ref: ComponentFactoryResolver){}

  @ViewChildren(IndicatorDetailComponent) child:QueryList<IndicatorDetailComponent>;
  
  public  exportPDF(){
    var doc = new jsPDF();
    doc = this.child.toArray()[0].exportPDF(doc, false);
    doc = this.child.toArray()[1].exportPDF(doc, false);
    doc = this.child.toArray()[2].exportPDF(doc, false);
    doc = this.child.toArray()[3].exportPDF(doc, false);
    html2canvas(document.getElementById("majors"), {
        onrendered: function (canvas) {
              //doc.save("sampleMajor.pdf")
            }
          });
    //this.child.exportPDF(doc, true);
  }

  public createComponent(){
    this.child
  }

  title = 'Available Indicators:';

  selectedInd: PerfDist;
  agg: boolean = false;

  onSelect(ind: PerfDist): void {
    this.selectedInd = ind;
    this.agg = false;
  }

    onSelectAgg(): void {
    this.selectedInd = null;
    this.agg = true;
  }

  // Load data ones componet is ready
  ngOnInit() {
  }
}
