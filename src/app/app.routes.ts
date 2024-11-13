import { Routes } from '@angular/router';
import { DefaultComponent } from './shared/layouts/default/default.component';
import { AuthGuard } from './core/guard/auth/auth.guard';
import { EmployeesComponent } from './pages/employees/employees.component';
import { CompaniesComponent } from './pages/companies/companies.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: 'employees', component: EmployeesComponent },
      { path: 'companies', component: CompaniesComponent },
      {
        path: 'employees/edit',
        component: EmployeesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '**',
        redirectTo: 'employees',
      },
    ],
  },
];
