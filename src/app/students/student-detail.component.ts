import { Component, Input } from '@angular/core';
import { Student } from '../student';

@Component({
  selector: 'student-detail',
  template: `
    <div *ngIf="student">
      <h2>Student details:</h2>
      <div>
        <label>Student ID: &nbsp;</label>{{student.sId}}
      </div>
      <div>
        <label>Last Name: &nbsp;</label>{{student.lastName}}
      </div>
      <div>
        <label>First Name: &nbsp;</label>{{student.firstName}}
      </div>
      <div>
        <label>Major/Concentration: &nbsp;</label>{{student.major}}
      </div>
    </div>
  `
})
export class StudentDetailComponent {
  @Input() student: Student;
}

