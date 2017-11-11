import { Component, Input, OnInit } from '@angular/core';
import { PerfDist } from '../perfs/perfdist';

@Component({
  selector: 'indicator-detail',
  template: `
    <div *ngIf="indicator">
    <button ng-click="exportPDF()">Export PDF</button>
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

  public exportPDF(){
    var docDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    //pdfMake.createPdf(docDefinition).open();
  }

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

   ngOnInit(){
    this.drawIndicatorPerformanceChart(this.indicator);
  }

  ngOnChanges(){
    this.drawIndicatorPerformanceChart(this.indicator);
  }
}

