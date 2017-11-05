import { Component, Input, OnInit } from '@angular/core';
import { PerfDist } from '../perfs/perfdist';

@Component({
  selector: 'attribute-detail',
  template: `
    <div *ngIf="attribute">
      <h2>Graduate Attribute details:</h2>
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
export class AttributeDetailComponent implements OnInit {
  @Input() attribute: PerfDist;

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

    public drawAttributePerformanceChart(attr: PerfDist):void {
    var results: number[] = [];
    console.log(attr.perfs)
    var below = attr.perfs.BELOW_EXPECTATIONS;
    var marginal = attr.perfs.MARGINAL;
    var meets = attr.perfs.MEETS_EXPECTATIONS;
    var exceeds = attr.perfs.EXCEEDS_EXPECTATIONS;
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
    this.drawAttributePerformanceChart(this.attribute);
  }

  ngOnChanges(){
    this.drawAttributePerformanceChart(this.attribute);
  }
}

