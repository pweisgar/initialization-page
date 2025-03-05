# Data Collection Initialization Page

A React application for configuring and initializing data collection sessions for Geo-KBA and Gen-KBA systems.

## Features

- Session configuration interface
- Data collection initialization
- Modern UI with shadcn-ui components
- TypeScript for type safety
- Vite for fast development and building

## Tech Stack

- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn-ui
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/pweisgar/initialization-page.git

# Navigate to the project directory
cd initialization-page

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`.

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## Deployment

This project is deployed using GitHub Pages. The deployment process is automated through the following steps:

1. Build the application: `npm run build`
2. Deploy to GitHub Pages: `npm run deploy`

The deployed site is available at: https://pweisgar.github.io/initialization-page/

## Development

### Project Structure

```
src/
├── components/     # React components
├── lib/           # Utility functions and shared logic
├── App.tsx        # Main application component
└── main.tsx       # Application entry point
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to GitHub Pages

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
