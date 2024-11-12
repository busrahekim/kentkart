import { Employee } from '../models/dbSchema.model';
import { Company } from '../models/dbSchema.model';

export const DUMMY_COMPANIES: Company[] = [
  { name: 'Company A' },
  { name: 'Company B' },
  { name: 'Company C' },
];

export const DUMMY_EMPLOYEES: Employee[] = [
  { name: 'John Doe', companyId: 1 },
  { name: 'Jane Smith', companyId: 2 },
  { name: 'Michael Johnson', companyId: 3 },
];
