# Services Documentation

## Overview

This documentation provides an overview of the services used in the Angular application, including authentication and database services.

### 1. AuthService

#### Description

The `AuthService` is responsible for handling user authentication within the application. It provides methods for logging in with Google, logging out, and checking the authentication status of the user.

#### Key Features

- **Login with Google**: Allows users to authenticate using their Google account.
- **Logout**: Provides functionality to log out the current user.
- **Authentication Status**: Observes the authentication state and notifies components of changes.

### 2. DatabaseService

#### Description

The `DatabaseService` manages interactions with the IndexedDB database for storing and retrieving employee and company data.

#### Key Features

- **CRUD Operations**: Provides methods to create, read, update, and delete employees and companies.
- **Transaction Management**: Handles transactions for operations involving multiple object stores.
- **Employee-Company Relationships**: Manages the relationships between employees and companies, allowing for adding and removing employees from companies.

## Conclusion

These services are essential for managing user authentication and data persistence in the application, ensuring a smooth user experience and efficient data handling.
