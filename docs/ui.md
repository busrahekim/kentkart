# UI Components Documentation

## Overview

This document provides an overview of the UI components used in the Angular application, including slide panels and confirmation dialogs.

### 1. Slide Panel Component

#### Description

The `SlidePanelComponent` is a reusable component that provides a sliding panel interface for displaying content. It can be used for editing or adding entities such as employees or companies.

#### Features

- Supports animations for entering and leaving the view.
- Displays a header that changes based on the current action (e.g., adding or editing).
- Contains a form for editing or adding entities.
- Emits events for closing the panel and refreshing data.

### 2. Confirm Dialog Component

#### Description

The `ConfirmDialogComponent` is a modal dialog that prompts the user for confirmation before performing an action. It is useful for actions that require user validation, such as deletions.

#### Features

- Displays a customizable message to the user.
- Provides "Confirm" and "Cancel" buttons for user interaction.
- Emits events based on the user's choice, allowing the parent component to handle the confirmation logic.

## Conclusion

These UI components enhance the user experience by providing interactive and responsive interfaces for various actions within the application. They are designed to be reusable and customizable to fit different contexts.
