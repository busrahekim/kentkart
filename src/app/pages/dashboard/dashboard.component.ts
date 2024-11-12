import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../../core/services/database.service';
import { TableComponent } from '../../shared/components/table/table.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SlidePanelComponent } from '../../shared/ui/slide-panel/slide-panel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SlidePanelAction } from '../../core/constants/enums';
import { Employee } from '../../core/models/dbSchema.model';
import { Company } from '../../core/models/dbSchema.model';
import { EditFormComponent } from '../../shared/components/edit-form/edit-form.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    SlidePanelComponent,
    ReactiveFormsModule,
    EditFormComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  SlidePanelAction = SlidePanelAction;

  isSlidePanelOpen: boolean = false;
  isAuthenticated: boolean = false;
  employeeDataSource = new MatTableDataSource<any>();
  companyDataSource = new MatTableDataSource<any>();

  selectedEntity: Employee | Company | null = null;

  displayedColumns: string[] = ['id', 'name', 'actions'];
  companyEmployees: any[] = [];
  company: any = null; // Stores the selected company for editing
  currentAction: SlidePanelAction | null = null;

  constructor(
    private authService: AuthService,
    private databaseService: DatabaseService,
    private dialog: MatDialog
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
    this.isSlidePanelOpen = true;
    this.currentAction = SlidePanelAction.AddEmployee;
  }

  addCompany() {
    if (!this.isAuthenticated) return;
    this.isSlidePanelOpen = true;
    this.currentAction = SlidePanelAction.AddCompany;
  }

  editEmployee(employeeId: number): void {
    // const employee = this.employeeDataSource.data.find(
    //   (e) => e.id === employeeId
    // );
    this.selectedEntity =
      this.employeeDataSource.data.find((e) => e.id === employeeId) || null;
    if (this.selectedEntity) {
      this.isSlidePanelOpen = true;
      this.currentAction = SlidePanelAction.EditEmployee;
    }
  }

  editCompany(companyId: number): void {
    // const company = this.companyDataSource.data.find((c) => c.id === companyId);
    this.selectedEntity =
      this.companyDataSource.data.find((c) => c.id === companyId) || null;
    if (this.selectedEntity) {
      this.isSlidePanelOpen = true;
      this.currentAction = SlidePanelAction.EditCompany;
    }
  }

  deleteEmployee(employeeId: number): void {
    this.databaseService.deleteEmployee(employeeId).then(() => {
      this.loadEmployees();
    });

    if (this.companyEmployees) {
      this.companyEmployees = this.companyEmployees.filter(
        (employee) => employee.id !== employeeId
      );
    }
  }

  deleteCompany(companyId: number): void {
    this.databaseService.deleteCompany(companyId).then(() => {
      this.loadCompanies();
    });
  }

  assignEmployeeToCompany(employeeId: number, companyId: number): void {}

  showEmployees(companyId: number): void {
    const company = this.companyDataSource.data.find((c) => c.id === companyId);

    if (company && company.employees) {
      // this.dialog.open(EmployeeListComponent, {
      //   data: { employees: company.employees },
      // });
      this.isSlidePanelOpen = true;
      this.companyEmployees = company.employees;
      this.currentAction = SlidePanelAction.ShowEmployees;
    }
  }

  openSlidePanel() {
    this.isSlidePanelOpen = true;
  }
  onCloseSlidePanel() {
    this.isSlidePanelOpen = false;
    this.companyEmployees = [];
    // this.company = null;
    this.selectedEntity = null;
    this.currentAction = null;
  }

  getHeaderText() {
    switch (this.currentAction) {
      case SlidePanelAction.ShowEmployees:
        return 'Employees';
      case SlidePanelAction.EditEmployee:
        return 'Edit Employee';
      case SlidePanelAction.AddEmployee:
        return 'Add Employee';
      case SlidePanelAction.EditCompany:
        return 'Edit Company';
      case SlidePanelAction.AddCompany:
        return 'Add Company';
      default:
        return 'Slide Panel Header';
    }
  }

  onFormSubmit(updatedEntity: Employee | Company): void {
    if (this.currentAction === SlidePanelAction.EditEmployee) {
      // TODO: employee logic
    } else if (this.currentAction === SlidePanelAction.EditCompany) {
      // TODO: company logic
    }
    this.isSlidePanelOpen = false;
  }
}
