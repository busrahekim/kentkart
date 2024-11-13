# Kentkart System

## Overview
The Kentkart System is a web application designed to manage employees and companies. It provides functionalities for adding, editing, and deleting records, as well as managing employee-company relationships.

## Project Structure
The project is organized into several key directories:

- **src/**: Contains the main application code.
  - **app/**: The core application components, including core, pages and shared components.
  - **shared/**: Reusable components, services, and utilities.
  - **assets/**: Static assets such as styles and images.
  - **environments/**: Configuration files for different environments (development, production).

## Features
- User authentication with Google login.
- CRUD operations for employees and companies.
- Responsive design with a modern UI.
- Dynamic slide panels for editing and adding records.
- Search functionality for easy data retrieval.
- Utilizes IndexedDB for efficient local data storage.

## Technologies Used
- Angular: The primary framework for building the application.
- Angular Material: For UI components and styling.
- Firebase: For authentication services.
- Tailwind CSS: For utility-first styling.
- IndexedDB: For local data storage and management

## Getting Started
To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd kentkart
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Set up your Firebase configuration in `src/environments/environment.ts`.

5. Start the development server:
   ```bash
   ng serve
   ```

6. Open your browser and navigate to `http://localhost:4200`.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.