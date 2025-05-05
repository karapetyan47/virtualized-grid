# Virtualized Grid

A single-page application built with React and TypeScript that integrates with the Pexels API.

## 📋 Prerequisites

- Node.js version 18 or higher
- Yarn package manager
- Pexels API key (you can get one by signing up at [Pexels](https://www.pexels.com/api/))

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/karapetyan47/virtualized-grid.git
   cd virtualized-grid
   ```

2. Install dependencies:
   ```bash
   yarn
   ```

3. Create a `.env` file in the root directory and add your Pexels API key:
   ```
   VITE_APP_PEXELS_API_KEY=<Your_Pexels_API_Key>
   ```

### Development

Start the development server:
```bash
yarn dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is already in use).

### Production Build

Build the application for production:
```bash
yarn build
```

Preview the production build:
```bash
yarn preview
```

## 🧪 Testing

Run tests to ensure everything is working correctly:
```bash
yarn test
```

## 🔍 Type Checking

Verify TypeScript types:
```bash
yarn typecheck
```

## 🛠️ Technology Stack

- **Framework**: React
- **Language**: TypeScript
- **Styling**: styled-components
- **Testing**: Jest, @testing-library/react
- **Code Quality**: ESLint, Prettier
- **Build Tool**: Vite

## 📝 Code Quality

The project maintains high code quality through:

- ESLint and Prettier for code formatting and linting
- Pre-commit hooks that run linting automatically
- GitHub Actions that check tests and types on Pull Requests to the master branch

## 🏗️ Architecture

This project is built using the **Atomic Design Methodology**, which organizes components into five distinct levels:

1. **Atoms**: Basic building blocks like buttons, inputs, and labels
2. **Molecules**: Simple groups of UI elements functioning together (form fields, search bars)
3. **Organisms**: Complex UI components composed of molecules and atoms
4. **Templates**: Page-level layouts that arrange organisms
5. **Pages**: Specific instances of templates with real content

This architecture promotes reusability, maintainability, and a consistent design system throughout the application.

## 📄 License

[MIT](LICENSE)