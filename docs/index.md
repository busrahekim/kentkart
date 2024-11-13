# Documentation Index

## Components Documentation

- [Components Documentation](docs/components.md): Overview of the various components in the application, including their descriptions, inputs, outputs, and templates.

## Layouts

### Default Layout

- **File:** [default.component.ts](src/app/shared/layouts/default/default.component.ts)
  - Description: The main layout component that includes the header, side navbar, and a router outlet for displaying different views.
- **Template:** [default.component.html](src/app/shared/layouts/default/default.component.html)
  - Description: The HTML structure for the default layout, incorporating the header, side navbar, and modal for login.

### Header Component

- **File:** [header.component.ts](src/app/shared/layouts/header/header.component.ts)

  - Description: The header component that provides navigation options, including login and logout buttons.

- **Template:** [header.component.html](src/app/shared/layouts/header/header.component.html)
  - Description: The HTML structure for the header, including the title and action buttons.

### Side Navbar Component

- **File:** [side-navbar.component.ts](src/app/shared/layouts/side-navbar/side-navbar.component.ts)

  - Description: The side navbar component that contains navigation links for different sections of the application.

- **Template:** [side-navbar.component.html](src/app/shared/layouts/side-navbar/side-navbar.component.html)
  - Description: The HTML structure for the side navbar, displaying categories and links.

## Testing Files

### Header Component Tests

- **File:** [header.component.spec.ts](src/app/shared/layouts/header/header.component.spec.ts)
  - Description: Unit tests for the HeaderComponent to ensure it is created successfully.

### Default Component Tests

- **File:** [default.component.spec.ts](src/app/shared/layouts/default/default.component.spec.ts)
  - Description: Unit tests for the DefaultComponent to ensure it is created successfully.

### Side Navbar Component Tests

- **File:** [side-navbar.component.spec.ts](src/app/shared/layouts/side-navbar/side-navbar.component.spec.ts)
  - Description: Unit tests for the SideNavbarComponent to ensure it is created successfully.

## Styles

### Global Styles

- **File:** [styles.scss](src/styles.scss)
  - Description: The main stylesheet for the application, which includes global styles, font imports, and Tailwind CSS utilities.
  - Key Features:
    - Imports Google Fonts for the application.
    - Applies Tailwind CSS base, components, and utilities.
    - Sets the default font family and background color for the body.
    - Defines button styles and form control styles using Tailwind CSS utilities.

### Common Styles

- **File:** [\_common.scss](src/assets/scss/_common.scss)
  - Description: A common SCSS file that imports variables and layout styles for use throughout the application.

### Layout Styles

- **File:** [\_layout.scss](src/assets/scss/_layout.scss)
  - Description: Contains styles specific to the layout components, including the header, wrapper, and content areas.
  - Key Features:
    - Styles for the header, including fixed positioning and shadow effects.
    - Layout styles for the main application wrapper and content areas.

### Variable Definitions

- **File:** [\_variables.scss](src/assets/scss/_variables.scss)
  - Description: Defines global SCSS variables used throughout the application, such as header height and sidebar width.

### Side Navbar Styles

- **File:** [side-navbar.component.scss](src/app/shared/layouts/side-navbar/side-navbar.component.scss)
  - Description: Styles specific to the side navbar component.
