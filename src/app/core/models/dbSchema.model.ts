import { DBSchema } from 'idb';

export interface Employee {
  id?: number; 
  name: string;
  companyId?: number;
}

export interface Company {
  id?: number;
  name: string;
  employees?: Employee[]; 
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
