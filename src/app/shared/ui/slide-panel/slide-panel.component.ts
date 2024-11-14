import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { SlidePanelAction } from '../../../core/constants/enums';
import { MatIconModule } from '@angular/material/icon';
import { EditFormComponent } from '../../components/edit-form/edit-form.component';
import { Employee } from '../../../core/models/dbSchema.model';
import { Company } from '../../../core/models/dbSchema.model';
import { DatabaseService } from '../../../core/services/database.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-slide-panel',
  standalone: true,
  imports: [CommonModule, MatIconModule, EditFormComponent, MatSelectModule],
  templateUrl: './slide-panel.component.html',
  styleUrl: './slide-panel.component.scss',
  animations: [
    trigger('fadeSlideInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0, transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class SlidePanelComponent {
  @Input() isOpen = false;
  @Input() headerText = 'Slide Panel Header';
  @Input() currentAction: SlidePanelAction | null = null;
  @Input() employees: any[] = [];
  @Input() companies: any[] = [];
  @Input() entityType: 'Employee' | 'Company' = 'Employee';
  @Input() entity: any; //selectedEntity

  @Output() onClose = new EventEmitter<boolean>();
  @Output() onRefresh = new EventEmitter<void>();
  @Output() onDeleteEmployee = new EventEmitter<number>();

  constructor(private databaseService: DatabaseService) {}

  onClosePanel() {
    this.onClose.emit(false);
  }

  get newHeaderText(): string {
    switch (this.currentAction) {
      case SlidePanelAction.ShowEmployees:
        return 'Company Employee  List';
      case SlidePanelAction.EditEmployee:
      case SlidePanelAction.EditCompany:
        return `Edit ${this.entityType}`;
      case SlidePanelAction.AddEmployee:
      case SlidePanelAction.AddCompany:
        return `Add ${this.entityType}`;
      default:
        return 'Details';
    }
  }

  isEditAction(): boolean {
    return (
      this.currentAction === SlidePanelAction.EditEmployee ||
      this.currentAction === SlidePanelAction.EditCompany
    );
  }

  isAddAction(): boolean {
    return (
      this.currentAction === SlidePanelAction.AddEmployee ||
      this.currentAction === SlidePanelAction.AddCompany
    );
  }

  isShowEmployeesAction(): boolean {
    return this.currentAction === SlidePanelAction.ShowEmployees;
  }

  async onFormSubmit(updatedEntity: Employee | Company): Promise<void> {
    if (!updatedEntity) return;

    if (this.isEditAction()) {
      if (this.entityType === 'Employee') {
        const employee = updatedEntity as Employee;
        const prevEmp = this.entity as Employee;
        const previousCompanyId = prevEmp.companyId;

        if (
          employee.companyId &&
          employee.companyId !== -1 &&
          previousCompanyId !== employee.companyId
        ) {
          await this.databaseService.updateEmployee(employee);
          if (previousCompanyId && previousCompanyId !== employee.companyId) {
            await this.databaseService.removeEmployeeFromCompany(
              employee.id!,
              previousCompanyId
            );
          }
          await this.databaseService.addEmployeeToCompany(
            employee.id!,
            employee.companyId!
          );
        } else if (employee.companyId === -1) {
          await this.databaseService.updateEmployee(employee);
        } else {
          console.log('Nothing updated');
        }
      } else if (this.entityType === 'Company') {
        await this.databaseService.updateCompany(updatedEntity as Company);
      }
    } else if (this.isAddAction()) {
      if (this.entityType === 'Employee') {
        const employee = updatedEntity as Employee;

        const employeeId = await this.databaseService.addEmployee(employee);

        if (employee.companyId && employee.companyId !== -1) {
          await this.databaseService.addEmployeeToCompany(
            employeeId,
            employee.companyId
          );
        }
      } else if (this.entityType === 'Company') {
        await this.databaseService.addCompany(updatedEntity as Company);
      }
    }

    this.onRefresh.emit();
    this.onClosePanel();
  }

  deleteEmployee(employeeId: number): void {
    this.onDeleteEmployee.emit(employeeId);
  }
}
