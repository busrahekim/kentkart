import { Routes } from '@angular/router';
import { DefaultComponent } from './shared/layouts/default/default.component';
import { AuthGuard } from './core/guard/auth/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'dashboard/edit',  
        component: DashboardComponent, 
        canActivate: [AuthGuard],  
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
];
