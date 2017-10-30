import { Component, Input } from '@angular/core';
import { Performance } from './performance';

@Component({
  selector: 'performance-detail',
  template: `
    <div *ngIf="performance">
      <h2>Performance details:</h2>
      <div>
        <label>Major: &nbsp;</label>{{performance.name}}
      </div>
    </div>
  `
})
export class PerformanceDetailComponent {
  @Input() performance: Performance;
}