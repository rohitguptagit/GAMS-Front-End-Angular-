// Imports
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';


import { studentRoutes }    from './students/student.routes';
import { indicatorRoutes }  from './indicators/indicator.routes';
import { attributeRoutes }  from './attributes/attribute.routes';

// Route Configuration
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/students',
    pathMatch: 'full'
  },
    // Add dog routes form a different file
  ...studentRoutes,
  ...indicatorRoutes,
  ...attributeRoutes
];

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
