import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import { Company, Employee, MyDatabase } from '../models/dbSchema.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private dbPromise = openDB<MyDatabase>('employee-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('employees')) {
        db.createObjectStore('employees', {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
      if (!db.objectStoreNames.contains('companies')) {
        db.createObjectStore('companies', {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    },
  });

  async getEmployees() {
    const db = await this.dbPromise;
    return db.getAll('employees');
  }

  async addEmployee(employee: Employee): Promise<number> {
    const db = await this.dbPromise;
    return db.add('employees', employee);
  }

  async updateEmployee(employee: Employee): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction('employees', 'readwrite');
    const store = tx.objectStore('employees');
    await store.put(employee);
    await tx.done;
  }

  async deleteEmployee(id: number) {
    const db = await this.dbPromise;
    return db.delete('employees', id);
  }

  async getCompanies() {
    const db = await this.dbPromise;
    return db.getAll('companies');
  }

  async addCompany(company: Company): Promise<number> {
    const db = await this.dbPromise;
    return db.add('companies', company);
  }

  async updateCompany(company: Company): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction('companies', 'readwrite');
    const store = tx.objectStore('companies');
    await store.put(company);
    await tx.done;
  }

  async deleteCompany(id: number) {
    const db = await this.dbPromise;
    return db.delete('companies', id);
  }

  async removeEmployeeFromCompany(
    employeeId: number,
    companyId: number
  ): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction(['employees', 'companies'], 'readwrite');
    const companyStore = tx.objectStore('companies');

    try {
      const company = await companyStore.get(companyId);

      if (!company || !company.employees) {
        console.log('Company not found or has no employees:', companyId);
        return;
      }

      company.employees = company.employees.filter(
        (emp) => emp.id !== employeeId
      );

      await companyStore.put(company);
      await tx.done;
    } catch (error) {
      console.error('Error in removeEmployeeFromCompany:', error);
    }
  }

  async addEmployeeToCompany(
    employeeId: number,
    companyId: number
  ): Promise<void> {
    if (companyId == -1 || !companyId) {
      console.log('No company assigned to the employee.');
      return;
    }

    const db = await this.dbPromise;
    const tx = db.transaction(['employees', 'companies'], 'readwrite');
    const employeeStore = tx.objectStore('employees');
    const companyStore = tx.objectStore('companies');

    try {
      const employee = await employeeStore.get(employeeId);
      const newCompany = await companyStore.get(companyId);

      if (!newCompany) {
        console.error('Company not found for ID:', companyId);
        return;
      }

      if (!employee) {
        console.error('Employee not found for ID:', employeeId);
        return;
      }

      if (newCompany.employees) {
        newCompany.employees.push(employee);
      } else {
        newCompany.employees = [employee];
      }

      await companyStore.put(newCompany);

      await tx.done;
    } catch (error) {
      console.error('Error in addEmployeeToCompany:', error);
    }
  }
}
