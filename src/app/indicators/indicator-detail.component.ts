import { Component, Input, OnInit } from '@angular/core';
import { PerfDist } from '../perfs/perfdist';

@Component({
  selector: 'indicator-detail',
  template: `
    <div *ngIf="indicator">
      <h2>Indicator details:</h2>
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
export class IndicatorDetailComponent implements OnInit {
  @Input() indicator: PerfDist;

   public barChartLabelsPerf:string[] = ['BELOW EXPECTATIONS', 'MARGINAL EXPECTATIONS', 'MEETS EXPECTATIONS', "EXCEEDS EXPECTATIONS"];

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
          max: 15,
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

    public drawIndicatorPerformanceChart(ind: PerfDist):void {
    var results: number[] = [];
    console.log(ind.perfs)
    results.push(ind.perfs.BELOW_EXPECTATIONS);
    results.push(ind.perfs.MARGINAL);
    results.push(ind.perfs.MEETS_EXPECTATIONS);
    results.push(ind.perfs.EXCEEDS_EXPECTATIONS);
    let clone = JSON.parse(JSON.stringify(this.barChartDataPerf));
    clone[0].data = results;
    this.barChartDataPerf = clone;
  }

   ngOnInit(){
    this.drawIndicatorPerformanceChart(this.indicator);
  }
}

