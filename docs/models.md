# Models Documentation

## Overview

This documentation outlines the data models used in the application, specifically for managing employees and companies within a database schema.

### 1. Employee Model

#### Description

The `Employee` interface represents an employee entity within the application. It includes the following properties:

- **id**: (optional) A unique identifier for the employee.
- **name**: The name of the employee.
- **companyId**: (optional) The identifier of the company to which the employee belongs.

### 2. Company Model

#### Description

The `Company` interface represents a company entity within the application. It includes the following properties:

- **id**: (optional) A unique identifier for the company.
- **name**: The name of the company.
- **employees**: (optional) An array of `Employee` objects representing the employees associated with the company.

### 3. Database Schema

#### Description

The `MyDatabase` interface extends the `DBSchema` from the IndexedDB library. It defines the structure of the database, including the following stores:

- **employees**:

  - **key**: A number representing the unique identifier for each employee.
  - **value**: An object of type `Employee`.
  - **indexes**: An index named `by-company` that allows querying employees by their associated company ID.

- **companies**:
  - **key**: A number representing the unique identifier for each company.
  - **value**: An object of type `Company`.

## Conclusion

These models provide a structured way to manage employee and company data within the application, facilitating interactions with the database.
