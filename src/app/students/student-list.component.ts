// Imports
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service'
import { Student } from '../student';

@Component({
  template: `
     <div class="col-md-3">
        <ul class="students">
          <li [class.selected]="compiled"
             (click)="onSelectCompiled()">Compiled Student Data Table
          </li>
          <li *ngFor="let student of students"
            [class.selected]="student === selectedStudent"
            (click)="onSelect(student)">
            <span class="badge">{{student.sId}}</span> {{student.firstName}}
          </li>
        </ul>
        </div>
        <div class="col-md-9">
        <div *ngIf="selectedStudent && !compiled">
        <student-detail [student]="selectedStudent"></student-detail>
        </div>
          <br>
          <div *ngIf="compiled">
            <div>
      <table>
        <tr>
          <th>Student ID #</th>
          <th>Student Name</th>
          <th>Indicator Name</th>
          <th>Percentage Score</th>
        </tr>
        <tr *ngFor="let element of tableLoader">
          <td>{{element.sID}}</td>
          <td>{{element.name}}</td>
          <td class="noPadding">
            <tr *ngFor="let ind of indicatorNames" class="inner">
              <td class="wider">{{ind}}</td>
            </tr>
          </td>
          <td class="noPadding">
            <tr *ngFor="let percentage of element.percentData" class="inner">
              <td class="thicc">{{percentage}}</td>
            </tr>
          </td>
        </tr>
      </table>
    </div>
    </div>
            <h2>Student details:</h2>
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
    .thicc {
      width: 140px;
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
  `],
    // Providers
    providers: [StudentService]
})
// Component class implementing OnInit
export class StudentListComponent implements OnInit {
  // Private property for binding
  students: Student[];
  selectedStudent: Student;
  compiled: boolean = false;

  constructor(private studentService: StudentService) {

  }

  getStudents(): void {
    this.studentService.getStudents().then(students => this.students = students);
  }

 onSelect(student: Student): void {
    this.selectedStudent = student;
    this.refreshChart(this.selectedStudent);    
    this.compiled = false;
  }

  onSelectCompiled(): void {
    this.selectedStudent = null;
    this.drawTable(this.students);
    this.compiled = true;
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
        },
        scaleLabel: {
          display: true,
          labelString: 'Percentage Score'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Indicator Name'
        }
      }]
    }
  };

  public barChartLabels:string[] = [''];
  public studentNames:string[] = [''];
  public indicatorNames:string[] = [];
  public tableLoader: TableLoader[] = [];
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

  public drawTable(students: Student[]): void {
    this.tableLoader = [];

    var stud = students[0];
    this.indicatorNames = [];
    for(let attr of stud.attributeList){
      if(attr.indicatorScores.length != 0){
        for(let ind of attr.indicatorScores){
          this.indicatorNames.push(ind.name);
        }
      }
    }
    for(let stud of students){
      var load: TableLoader = new TableLoader();
      for(var i = 0; i< stud.attributeList.length; i++){
        for(var j = 0; j < stud.attributeList[i].indicatorScores.length; j++){
          var rounder = Math.round(stud.attributeList[i].indicatorScores[j].result); //TODO: Round to 2 decimal places (right now at none)
          load.percentData.push(rounder);
        }
      }
      load.sID = stud.sId;
      load.name = stud.lastName + ", " + stud.firstName;

      //load.label = this.indicatorNames;

      this.tableLoader.push(load);
    }
  }

  // Load data ones componet is ready
  ngOnInit() {
    this.getStudents();
  }
}
export class TableLoader {
  label: string;
  sID: number;
  name: string;
  percentData: number[] = [];
}
