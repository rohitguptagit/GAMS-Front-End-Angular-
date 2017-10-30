// Imports
import { Routes } from '@angular/router';

import { StudentListComponent }    from './student-list.component';
import { StudentDetailComponent }    from './student-detail.component';

// Route Configuration
export const studentRoutes: Routes = [
  { path: 'students', component: StudentListComponent },
  { path: 'students/:id', component: StudentDetailComponent }
];