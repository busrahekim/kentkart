import { DBSchema } from 'idb';

export interface Employee {
  id?: number; // auto-incremented by IndexedDB
  name: string;
  companyId: number;
}

export interface Company {
  id?: number; // auto-incremented by IndexedDB
  name: string;
}

export interface MyDatabase extends DBSchema {
  employees: {
    key: number;
    value: Employee;
    indexes: { 'by-company': number };
  };
  companies: {
    key: number;
    value: Company;
  };
}
