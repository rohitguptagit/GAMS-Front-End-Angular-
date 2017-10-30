import { Injectable } from '@angular/core';

import { Performance } from './performance';
import { PERFORMANCES } from './mock-performances';

@Injectable()
export class PerformanceService {
  getPerformances(): Promise<Performance[]> {
    return Promise.resolve(PERFORMANCES);
  }

  // See the "Take it slow" appendix
  getPerformancesSlowly(): Promise<Performance[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getPerformances()), 2000);
    });
  }
}
