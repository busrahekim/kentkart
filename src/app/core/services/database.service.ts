import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import { Company, Employee, MyDatabase } from '../models/dbSchema.model';
import { DUMMY_COMPANIES, DUMMY_EMPLOYEES } from '../constants/dummyData';

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
    const employees = await db.getAll('employees');

    // If no employees in the DB, insert dummy data
    if (employees.length === 0) {
      await this.addDummyEmployees(DUMMY_EMPLOYEES);
    }

    return db.getAll('employees');
  }

  // Add employee(s)
  async addEmployee(employee: Employee): Promise<number> {
    const db = await this.dbPromise;
    return db.add('employees', employee);
  }

  private async addDummyEmployees(employees: Employee[]): Promise<void> {
    const db = await this.dbPromise;
    // const tx = db.transaction('employees', 'readwrite');
    // const store = tx.objectStore('employees');

    // // Use a loop to add all employees
    // employees.forEach((employee) => {
    //   store.add(employee);

    // });

    // await tx.done; //

    for (const employee of employees) {
      await db.add('employees', employee);
    }
  }

  async deleteEmployee(id: number) {
    const db = await this.dbPromise;
    return db.delete('employees', id);
  }

  async getCompanies() {
    const db = await this.dbPromise;
    const companies = await db.getAll('companies');

    // If no companies in the DB, insert dummy data
    if (companies.length === 0) {
      await this.addDummyCompanies(DUMMY_COMPANIES);
    }

    return db.getAll('companies');
  }

  // Add company
  async addCompany(company: Company): Promise<number> {
    const db = await this.dbPromise;
    return db.add('companies', company);
  }

  // Add dummy companies if needed
  private async addDummyCompanies(companies: Company[]): Promise<void> {
    const db = await this.dbPromise;
    for (const company of companies) {
      await db.add('companies', company);
    }
  }

  async deleteCompany(id: number) {
    const db = await this.dbPromise;
    return db.delete('companies', id);
  }

  //TODO: indexeddb.service.ts (updated)
  // addEmployeeToCompany(employeeId: number, companyId: number): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const transaction = this.db.transaction('employees', 'readwrite');
  //     const employeeStore = transaction.objectStore('employees');
  //     const companyStore = transaction.objectStore('companies');

  //     const employeeRequest = employeeStore.get(employeeId);
  //     const companyRequest = companyStore.get(companyId);

  //     employeeRequest.onsuccess = () => {
  //       const employee = employeeRequest.result;
  //       const company = companyRequest.result;

  //       if (employee && company) {
  //         // Add employee to company's employee list
  //         if (!company.employees) {
  //           company.employees = [];
  //         }
  //         company.employees.push(employeeId);

  //         // Update the company and employee data
  //         const updateCompanyRequest = companyStore.put(company);
  //         const updateEmployeeRequest = employeeStore.put(employee);

  //         updateCompanyRequest.onsuccess = () => resolve(company);
  //         updateEmployeeRequest.onsuccess = () => resolve(employee);
  //       } else {
  //         reject('Employee or Company not found');
  //       }
  //     };

  //     employeeRequest.onerror = (e) => reject(e);
  //     companyRequest.onerror = (e) => reject(e);
  //   });
  // }
}
