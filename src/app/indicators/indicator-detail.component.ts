import { Component, Input, OnInit } from '@angular/core';
import { PerfDist } from '../perfs/perfdist';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'indicator-detail',
  template: `
    <div *ngIf="indicator" id="indicator">
    
      <div>
      <h2 id="title1">Indicator Details</h2>
      <br><br>
        <table id= "table1">
          <tr>
            <th>Type</th>
            <th>Performance Level</th>
            <th>Student Count</th>
            <th>% of Students</th>
          </tr>
          <tr *ngFor="let element of tableLoader">
            <td>{{element.label}}</td>
            <td class="noPadding">
              <tr *ngFor="let level of tableLabels" class="inner">
                <td>{{level}}</td>
              </tr>
            </td>
            <td class="noPadding">
              <tr *ngFor="let count of element.countData" class="inner">
                <td class="wider">{{count}}</td>
              </tr>
            </td>
            <td class="noPadding">
              <tr *ngFor="let percentage of element.percentData" class="inner">
                <td class="wider">{{percentage}}</td>
              </tr>
            </td>
          </tr>
        </table>
      </div>
      <br><br>
      <div>
        <div style="display: block">
              <canvas id="chart1" baseChart
              [datasets]="barChartDataPerf"
              [labels]="barChartLabelsPerf"
              [options]="barChartOptionsPerf"
              [legend]="barChartLegendPerf"
              [chartType]="barChartTypePerf"></canvas>
        </div>
      </div>
    </div>
  `,
    styles: [`
    table, th, td {
      border: 1px solid grey;
      border-collapse: collapse;
      padding: 5px;
      margin: 10px;
      text-align: center;
    }
    .inner td{
      border: none;
    }
    .wider {
      width: 120px;
      text-align: center;
    }
    .noPadding {
      padding: 0px;
    }
    table tr:nth-child(odd) {
      background-color: #f1f1f1;
    }
    table tr:nth-child(even) {
      background-color: #ffffff;
    }
  `]
})
export class IndicatorDetailComponent implements OnInit {
  @Input() indicator: PerfDist;

  public barChartLabelsPerf:string[] = ['BELOW EXPECTATIONS', 'MARGINAL EXPECTATIONS', 'MEETS EXPECTATIONS', "EXCEEDS EXPECTATIONS"];
  public tableLabels:string[] = ['BELOW EXPECTATIONS (0-54%)', 'MARGINAL EXPECTATIONS (55-64%)', 'MEETS EXPECTATIONS (65-79%)', "EXCEEDS EXPECTATIONS (80-100%)"];
  public tableLoader: TableLoader[] = [];

  public barChartTypePerf:string = 'bar';
  public barChartLegendPerf:boolean = false;

  public barChartDataPerf:any[] = [
    {data: [0, 0, 0, 0] }
  ];

  public barChartOptionsPerf:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          max: 100,
          min: 0,
          beginsAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: 'Percentage of Students'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Performance Level'
        }
      }]
    }
  };

    public drawIndicatorPerformanceChart(ind: PerfDist):void {
      var results: number[] = [];
      var below = ind.perfs.BELOW_EXPECTATIONS;
      var marginal = ind.perfs.MARGINAL;
      var meets = ind.perfs.MEETS_EXPECTATIONS;
      var exceeds = ind.perfs.EXCEEDS_EXPECTATIONS;
      var total = below + marginal + meets + exceeds;
      results.push(Math.round(below/total * 100));
      results.push(Math.round(marginal/total * 100));
      results.push(Math.round(meets/total * 100));
      results.push(Math.round(exceeds/total * 100));
      let clone = JSON.parse(JSON.stringify(this.barChartDataPerf));
      clone[0].data = results;
      this.barChartDataPerf = clone;
  }

  public drawTable(ind: PerfDist): void {
    this.tableLoader = [];
      var load: TableLoader = new TableLoader();
      var below = ind.perfs.BELOW_EXPECTATIONS;
      var marginal = ind.perfs.MARGINAL;
      var meets = ind.perfs.MEETS_EXPECTATIONS;
      var exceeds = ind.perfs.EXCEEDS_EXPECTATIONS;
      var total = below + marginal + meets + exceeds;
      load.percentData.push(Math.round(below/total * 100));
      load.percentData.push(Math.round(marginal/total * 100));
      load.percentData.push(Math.round(meets/total * 100));
      load.percentData.push(Math.round(exceeds/total * 100));
      load.countData.push(below);
      load.countData.push(marginal);
      load.countData.push(meets);
      load.countData.push(exceeds);

      load.label = ind.name;

      this.tableLoader.push(load);
    }

  ngOnInit(){
    this.drawIndicatorPerformanceChart(this.indicator);
    this.drawTable(this.indicator);
  }

  ngOnChanges(){
    this.drawIndicatorPerformanceChart(this.indicator);
    this.drawTable(this.indicator);
  }
}

export class TableLoader {
  label: string;
  countData: number[] = [];
  percentData: number[] = [];
}

