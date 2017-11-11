import { Component, Input, OnInit } from '@angular/core';
import { PerfDist } from '../perfs/perfdist';

@Component({
  selector: 'aggregate-detail',
  template: `
    <div *ngIf="aggregate">
    <div>
      <table>
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
    <h2>Aggregated Scores:</h2>
        <div style="display: block">
              <canvas baseChart
              [datasets]="barChartDataPerf"
              [labels]="barChartLabelsPerf"
              [options]="barChartOptionsPerf"
              [legend]="barChartLegendPerf"
              [chartType]="barChartTypePerf"></canvas>
          </div>
    </div>
  `,
  styles: [`
    table, th, td {
      border: 1px solid grey;
      border-collapse: collapse;
      padding: 5px;
      margin: 0px;
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
export class AggregateDetailComponent implements OnInit {
  @Input() aggregate: PerfDist[];

  public barChartLabelsPerf:string[] = ['BELOW EXPECTATIONS', 'MARGINAL EXPECTATIONS', 'MEETS EXPECTATIONS', "EXCEEDS EXPECTATIONS"];
  public tableLabels:string[] = ['BELOW EXPECTATIONS (0-54%)', 'MARGINAL EXPECTATIONS (55-64%)', 'MEETS EXPECTATIONS (65-79%)', "EXCEEDS EXPECTATIONS (80-100%)"];
  public tableLoader: TableLoader[] = [];

  public barChartTypePerf:string = 'bar';
  public barChartLegendPerf:boolean = false;

  public barChartDataPerf:any[] = [
    {
      label: '',
      data: [0, 0, 0, 0] 
    }
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



  public drawAggregatePerformanceChart(aggregate: PerfDist[]):void {
    var loader: ChartLoader[] = [];
    for(let attr of aggregate){
      var load: ChartLoader = new ChartLoader();
      var below = attr.perfs.BELOW_EXPECTATIONS;
      var marginal = attr.perfs.MARGINAL;
      var meets = attr.perfs.MEETS_EXPECTATIONS;
      var exceeds = attr.perfs.EXCEEDS_EXPECTATIONS;
      var total = below + marginal + meets + exceeds;
      load.data.push(Math.round(below/total * 100));
      load.data.push(Math.round(marginal/total * 100));
      load.data.push(Math.round(meets/total * 100));
      load.data.push(Math.round(exceeds/total * 100));

      load.label = attr.name;

      loader.push(load);
    }
    this.barChartDataPerf = loader;
  }

  public drawTable(aggregate: PerfDist[]):void {
    this.tableLoader = [];
    for(let attr of aggregate){
      var load: TableLoader = new TableLoader();
      var below = attr.perfs.BELOW_EXPECTATIONS;
      var marginal = attr.perfs.MARGINAL;
      var meets = attr.perfs.MEETS_EXPECTATIONS;
      var exceeds = attr.perfs.EXCEEDS_EXPECTATIONS;
      var total = below + marginal + meets + exceeds;
      load.percentData.push(Math.round(below/total * 100));
      load.percentData.push(Math.round(marginal/total * 100));
      load.percentData.push(Math.round(meets/total * 100));
      load.percentData.push(Math.round(exceeds/total * 100));
      load.countData.push(below);
      load.countData.push(marginal);
      load.countData.push(meets);
      load.countData.push(exceeds);

      load.label = attr.name;

      this.tableLoader.push(load);
    }
  }

   ngOnInit(){
    this.drawAggregatePerformanceChart(this.aggregate);
    this.drawTable(this.aggregate);
  }

  ngOnChanges(){
    this.drawAggregatePerformanceChart(this.aggregate);
    this.drawTable(this.aggregate);
  }
}
export class ChartLoader {
  label: string;
  data: number[] = [];
}

export class TableLoader {
  label: string;
  countData: number[] = [];
  percentData: number[] = [];
}
