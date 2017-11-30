// Imports
import { Component, OnInit, Input, ViewChildren, QueryList, ChangeDetectorRef} from '@angular/core';
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
      <div>
      <div>
        <label>Course Name: &nbsp;</label>{{major.courseCode}} {{major.courseNumber}}
      </div>
      <div>
        <label>Course Section: &nbsp;</label>{{major.section}}
      </div>
      <div>
        <label>Term: &nbsp;</label>{{major.term}}
      </div>
        <br>
        <h3>{{title}}</h3>
        <br>
       <ul class="inds">
          <li *ngFor="let ind of major.range.inds"
          [class.selected]="ind === selectedInd"
            (click)="onSelect(ind)">
            {{ind.name}}
          </li>
          <li [class.selected]="agg"
          (click)="onSelectAgg()"> Aggregated Indicators</li>
        </ul>

        <button (click)="toggleHidden()">Toggle for Export</button>
        <button [disabled]="exportDisabled" (click)="exportPDF()">Export All to PDF</button>
        <div *ngIf="agg">
           <aggregate-detail [aggregate]="major.range.inds"></aggregate-detail>
        </div>
        <div *ngIf="selectedInd">
          <indicator-detail [indicator]="selectedInd"></indicator-detail>
        </div>
        <div id="fullExport">
          <div *ngFor="let ind of major.range.inds" >
            <indicator-detail class="export" [indicator]="ind" [style.display]="hiding"></indicator-detail>
          </div>
            <aggregate-detail class="export" [aggregate]="major.range.inds" [style.display]="hiding"></aggregate-detail>
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

  public hiding:string = "none";
  public exportDisabled: boolean = true;

  constructor(private changeDetector: ChangeDetectorRef){}
  
  public toggleHidden(){
    if(this.hiding == "block"){
      this.hiding = "none";
      this.exportDisabled = true;
    }
    else{
      this.hiding = "block";
      this.exportDisabled = false;
    }
  } 

  public sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public async exportPDF(){
    var doc = new jsPDF();
    var elements = document.getElementsByClassName("export");

    console.log(this.major)
    var i = 0;
    for(; i < elements.length; i++){
      html2canvas(elements[i], {
        onrendered: function (canvas) {
          console.log(elements[i])
          console.log(canvas)
          var elem = canvas.toDataURL("image/png");
          doc.addImage(elem, 'png', 5, 10);
          if(i < elements.length - 1){
            doc.addPage();
          }
        }
      });
      await this.sleep(400);
    }
    var self = this;
    html2canvas(elements[i], {
      onrendered: function (canvas) {
          doc.save("IndicatorData"+"_"+self.major.name+"_"+self.major.term+"_"+self.major.courseCode+"_"+self.major.courseNumber+"_"
            +self.major.section+".pdf")
        }
      });
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
