import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../../core/services/database.service';
import { TableComponent } from '../../shared/components/table/table.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  isAuthenticated: boolean = false;
  employeeDataSource = new MatTableDataSource<any>();
  companyDataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(
    private authService: AuthService,
    private databaseService: DatabaseService
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((authStatus) => {
      this.isAuthenticated = authStatus;
    });

    this.loadEmployees();
    this.loadCompanies();
  }
  loadEmployees(): void {
    this.databaseService.getEmployees().then((data) => {
      this.employeeDataSource.data = data;
    });
  }

  loadCompanies(): void {
    this.databaseService.getCompanies().then((data) => {
      this.companyDataSource.data = data;
    });
  }

  addEmployee() {
    if (!this.isAuthenticated) return;
    //TODO: Show add employee modal/form
  }

  addCompany() {
    if (!this.isAuthenticated) return;
    //TODO: Show add company modal/form
  }

  editEmployee(employeeId: number): void {
    // Show edit employee modal/form
  }

  editCompany(companyId: number): void {
    // Show edit company modal/form
  }

  deleteEmployee(employeeId: number): void {
    this.databaseService.deleteEmployee(employeeId).then(() => {
      this.loadEmployees();
    });
  }

  deleteCompany(companyId: number): void {
    this.databaseService.deleteCompany(companyId).then(() => {
      this.loadCompanies();
    });
  }

  // assignEmployeeToCompany(employeeId: number, companyId: number): void {
  //   this.databaseService
  //     .addEmployeeToCompany(employeeId, companyId)
  //     .then(() => {
  //       this.loadEmployees();
  //       this.loadCompanies();
  //     });
  // }
}
