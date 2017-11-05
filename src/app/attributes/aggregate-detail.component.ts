import { Component, Input, OnInit } from '@angular/core';
import { PerfDist } from '../perfs/perfdist';

@Component({
  selector: 'aggregate-detail',
  template: `
    <div *ngIf="aggregate">
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
  `
})
export class AggregateDetailComponent implements OnInit {
  @Input() aggregate: PerfDist[];

   public barChartLabelsPerf:string[] = ['BELOW EXPECTATIONS', 'MARGINAL EXPECTATIONS', 'MEETS EXPECTATIONS', "EXCEEDS EXPECTATIONS"];

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
          labelString: 'Number of Students'
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
    var loader: DataLoader[] = [];

    for(let attr of aggregate){
      var load: DataLoader = new DataLoader();
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

   ngOnInit(){
    this.drawAggregatePerformanceChart(this.aggregate);
  }

  ngOnChanges(){
    this.drawAggregatePerformanceChart(this.aggregate);
  }
}
export class DataLoader {
  label: string;
  data: number[] = [];
}
