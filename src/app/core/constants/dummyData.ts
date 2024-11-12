import { Employee } from '../models/dbSchema.model';
import { Company } from '../models/dbSchema.model';

export const DUMMY_COMPANIES: Company[] = [
  { id: 1, name: 'Company A', employees: [{ name: 'John Doe', companyId: 1 }] },
  {
    id: 2,
    name: 'Company B',
    employees: [{ name: 'Jane Smith', companyId: 2 }],
  },
  {
    id: 3,
    name: 'Company C',
    employees: [{ name: 'Michael Johnson', companyId: 3 }],
  },
];

export const DUMMY_EMPLOYEES: Employee[] = [
  { name: 'John Doe', companyId: 1 },
  { name: 'Jane Smith', companyId: 2 },
  { name: 'Michael Johnson', companyId: 3 },
];
