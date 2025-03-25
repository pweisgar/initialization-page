# Data Collection Initialization Page - Design Reference

This repository contains a simplified mockup of the Data Collection Initialization interface for Geo-KBA and Gen-KBA systems. The primary purpose is to provide a visual reference for software engineers who will build the production version.

## Purpose

This mockup demonstrates:

- The UI/UX design and interactions
- Required data collection parameters
- Form validation and submission flow
- Default values and options for each parameter

## Important Notes for Developers

- This is a design reference only, not intended for production use
- The core functionality is in the `src/components` folder
- The form doesn't connect to any real backend services

## Key Components

- **Session Form**: The main form component with all parameters
- **Checkbox Group**: Custom multi-select component for categories
- **System Mode Selection**: Visual toggle between Geo-KBA and Gen-KBA modes

## Quick Start

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The mockup will be available at `http://localhost:8080`.

## Deployment

The live mockup is available at: https://pweisgar.github.io/initialization-page/

## Technology Stack

- React with TypeScript
- Shadcn UI components
- Tailwind CSS for styling
- Vite for development and building
