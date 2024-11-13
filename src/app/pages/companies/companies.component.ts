import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Company, Employee } from '../../core/models/dbSchema.model';
import { DatabaseService } from '../../core/services/database.service';
import { AuthService } from '../../core/services/auth.service';
import { SlidePanelAction } from '../../core/constants/enums';
import { TableComponent } from '../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { SlidePanelComponent } from '../../shared/ui/slide-panel/slide-panel.component';
import { ConfirmDialogComponent } from '../../shared/ui/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [CommonModule, TableComponent, SlidePanelComponent],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss',
})
export class CompaniesComponent implements OnInit {
  companyDataSource = new MatTableDataSource<Company>();
  isAuthenticated: boolean = false;
  currentAction: SlidePanelAction | null = null;
  isSlidePanelOpen: boolean = false;
  selectedEntity: Employee | Company | null = null;
  companyEmployees: any[] = [];

  constructor(
    private databaseService: DatabaseService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((authStatus) => {
      this.isAuthenticated = authStatus;
    });
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.databaseService.getCompanies().then((data) => {
      this.companyDataSource.data = data;
    });
  }

  addCompany() {
    if (!this.isAuthenticated) return;
    this.isSlidePanelOpen = true;
    this.currentAction = SlidePanelAction.AddCompany;
  }

  editCompany(companyId: number): void {
    this.selectedEntity =
      this.companyDataSource.data.find((c) => c.id === companyId) || null;
    if (this.selectedEntity) {
      this.isSlidePanelOpen = true;
      this.currentAction = SlidePanelAction.EditCompany;
    }
  }

  async deleteCompany(companyId: number): Promise<void> {
    if (!this.isAuthenticated) return;
   
  const company = this.companyDataSource.data.find(c => c.id === companyId);
  if (company) {
    // Check if the company has employees
    if (company.employees && company.employees.length > 0) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { message: `The company has employees. Are you sure you want to delete this company?` }
      });

      const confirmed = await dialogRef.afterClosed().toPromise();
      if (!confirmed) {
        return; 
      }

     
      for (const employee of company.employees) {
        employee.companyId = -1; 
        await this.databaseService.updateEmployee(employee);
      }
    }
  }

  await this.databaseService.deleteCompany(companyId);
  this.loadCompanies(); 
  }

  showEmployees(companyId: number): void {
    const company = this.companyDataSource.data.find((c) => c.id === companyId);
    console.log(company);

    if (company && company.employees) {
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
    this.selectedEntity = null;
    this.currentAction = null;
  }

  onRefreshData() {
    this.loadCompanies();
  }
}
