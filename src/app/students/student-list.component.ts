// Imports
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service'
import { Student } from '../student';

@Component({
  template: `
     <div class="col-md-3">
        <ul class="students">
          <li *ngFor="let student of students"
            [class.selected]="student === selectedStudent"
            (click)="onSelect(student)">
            <span class="badge">{{student.sId}}</span> {{student.firstName}}
          </li>
        </ul>
        </div>
        <div class="col-md-9">
        <student-detail [student]="selectedStudent"></student-detail>
          <br>
            <div>
              <div style="display: block">
                <canvas baseChart
                [datasets]="barChartData"
                [labels]="barChartLabels"
                [options]="barChartOptions"
                [legend]="barChartLegend"
                [chartType]="barChartType"
                (chartHover)="chartHovered($event)"
                (chartClick)="chartClicked($event)"></canvas>
              </div>
          </div>
        </div>

    `,
  styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .students {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .students li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .students li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .students li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .students .text {
      position: relative;
      top: -3px;
    }
    .students .badge {
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
    // Providers
    providers: [StudentService]
})
// Component class implementing OnInit
export class StudentListComponent implements OnInit {
  // Private property for binding
  students: Student[];
  selectedStudent: Student;

  constructor(private studentService: StudentService) {

  }

  getStudents(): void {
    this.studentService.getStudents().then(students => this.students = students);
  }

 onSelect(student: Student): void {
    this.selectedStudent = student;
    this.refreshChart(this.selectedStudent);
  }

   public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          max: 100,
          min: 0,
          beginsAtZero: true
        }
      }]
    }
  };

  public barChartLabels:string[] = [''];

  public barChartType:string = 'bar';
  public barChartLegend:boolean = false;

  public barChartData:any[] = [
    {data: [0, 0, 0, 0, 0, 0, 0] }
  ];

  public refreshChart(student: Student):void {
    var results: number[] = []
    this.barChartLabels.length = 0;
    for(var i = 0; i< student.attributeList.length; i++){
      for(var j = 0; j < student.attributeList[i].indicatorScores.length; j++){
        var rounder = Math.round(student.attributeList[i].indicatorScores[j].result); //TODO: Round to 2 decimal places (right now at none)
        results.push(rounder);
        this.barChartLabels.push(student.attributeList[i].indicatorScores[j].name);
      }
     
    }
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = results;
    this.barChartData = clone;
  }

  // Load data ones componet is ready
  ngOnInit() {
    this.getStudents();
  }
}
