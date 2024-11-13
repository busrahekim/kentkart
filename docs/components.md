# Components Documentation

## TableComponent

### Description
The `TableComponent` is a reusable component that displays data in a table format with sorting, pagination, and filtering capabilities.

### Inputs
- `title: string`: The title of the table.
- `dataSource: MatTableDataSource<any>`: The data source for the table.
- `displayedColumns: string[]`: The columns to be displayed in the table.
- `isAuthenticated: boolean`: Indicates if the user is authenticated.

### Outputs
- `add`: Emits an event when the add button is clicked.
- `edit`: Emits an event with the ID of the item to be edited.
- `delete`: Emits an event with the ID of the item to be deleted.
- `showEmployees`: Emits an event with the ID of the item to show employees.

### Template
The template includes a search bar, a title, action buttons, and a table structure with dynamic columns.

---

## EditFormComponent

### Description
The `EditFormComponent` is a form component used for editing employee or company details.

### Inputs
- `entity: Employee | Company | null`: The selected entity.
- `isEmployee: boolean`: Indicates if the form is for an employee.
- `companies: Company[]`: List of companies to select from (if applicable).

### Outputs
- `formSubmit`: Emits the updated entity when the form is submitted.

### Template
The template includes input fields for the entity's name and, if applicable, a dropdown for selecting a company.

---

## SearchBarComponent

### Description
The `SearchBarComponent` provides a search input for filtering data in a parent component.

### Outputs
- `search`: Emits the search term as the user types.

### Template
The template consists of an input field with a search icon.

---

## LoginModalComponent

### Description
The `LoginModalComponent` is a modal for user authentication, specifically for Google login.

### Outputs
- `close`: Emits an event to close the modal.

### Template
The template includes a header, a close button, and a button for Google login.

---

## Additional Notes
- Ensure to import the necessary Angular Material modules in the respective components for proper functionality.
- Each component is designed to be standalone, allowing for easy integration into various parts of the application.