# Styles Documentation

## Overview
This document provides an overview of the styles used in the Angular application, including global styles, layout styles, and component-specific styles. The styles are primarily written in SCSS and utilize Tailwind CSS for utility classes.

### 1. Global Styles

#### File: [styles.scss](src/styles.scss)
- **Description**: The main stylesheet for the application, which includes global styles, font imports, and Tailwind CSS utilities.
- **Key Features**:
  - Imports Google Fonts for the application.
  - Applies Tailwind CSS base, components, and utilities.
  - Sets the default font family and background color for the body.
  - Defines button styles and form control styles using Tailwind CSS utilities.

### 2. Common Styles

#### File: [_common.scss](src/assets/scss/_common.scss)
- **Description**: A common SCSS file that imports variables and layout styles for use throughout the application.

### 3. Layout Styles

#### File: [_layout.scss](src/assets/scss/_layout.scss)
- **Description**: Contains styles specific to the layout components, including the header, wrapper, and content areas.
- **Key Features**:
  - Styles for the header, including fixed positioning and shadow effects.
  - Layout styles for the main application wrapper and content areas.

### 4. Variable Definitions

#### File: [_variables.scss](src/assets/scss/_variables.scss)
- **Description**: Defines global SCSS variables used throughout the application, such as header height and sidebar width.


### 5. Side Navbar Styles

#### File: [side-navbar.component.scss](src/app/shared/layouts/side-navbar/side-navbar.component.scss)
- **Description**: Styles specific to the side navbar component.
- **Key Features**:
  - Defines the width and background color of the side navbar.
  - Applies padding and margin for layout consistency.

## Conclusion
These styles enhance the visual presentation and user experience of the application. They are designed to be reusable and customizable, allowing for easy integration into various components and layouts.