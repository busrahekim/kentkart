import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DatabaseService } from '../../core/services/database.service';
import { Company, Employee } from '../../core/models/dbSchema.model';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../shared/components/table/table.component';
import { SlidePanelAction } from '../../core/constants/enums';
import { AuthService } from '../../core/services/auth.service';
import { SlidePanelComponent } from '../../shared/ui/slide-panel/slide-panel.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/ui/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, TableComponent, SlidePanelComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EmployeesComponent implements OnInit {
  employeeDataSource = new MatTableDataSource<Employee>();
  isAuthenticated: boolean = false;
  currentAction: SlidePanelAction | null = null;
  isSlidePanelOpen: boolean = false;
  selectedEntity: Employee | Company | null = null;

  companies: Company[] = [];

  constructor(
    private databaseService: DatabaseService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((authStatus) => {
      this.isAuthenticated = authStatus;
    });

    this.loadData();
  }

  async loadData() {
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
      this.companies = data;
    });
  }

  addEmployee() {
    if (!this.isAuthenticated) return;
    this.isSlidePanelOpen = true;
    this.currentAction = SlidePanelAction.AddEmployee;
    this.selectedEntity = { name: '', companyId: undefined };
  }

  editEmployee(employeeId: number): void {
    this.selectedEntity =
      this.employeeDataSource.data.find((e) => e.id === employeeId) || null;

    if (this.selectedEntity) {
      this.isSlidePanelOpen = true;
      this.currentAction = SlidePanelAction.EditEmployee;
    }
  }

  async deleteEmployee(employeeId: number): Promise<void> {
    if (!this.isAuthenticated) return;
    const employee = this.employeeDataSource.data.find(
      (e) => e.id === employeeId
    );
    if (employee) {
      const companyId = employee.companyId;

      let message: string;
      if (companyId && companyId != -1) {
        message = `The employee is associated with a company. Are you sure you want to delete this employee?`;
      } else {
        message = `Are you sure you want to delete this employee?`;
      }

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          message: message,
        },
      });

      const confirmed = await dialogRef.afterClosed().toPromise();
      if (!confirmed) {
        return;
      }

      if (companyId && companyId !== -1) {
        await this.databaseService.removeEmployeeFromCompany(
          employeeId,
          companyId
        );
      }
    }

    await this.databaseService.deleteEmployee(employeeId);
    this.loadEmployees();
  }

  openSlidePanel() {
    this.isSlidePanelOpen = true;
  }

  onCloseSlidePanel() {
    this.isSlidePanelOpen = false;
    this.selectedEntity = null;
    this.currentAction = null;
  }

  onRefreshData() {
    this.loadData();
  }
}
