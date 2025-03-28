# React Auth UI

A modern authentication user interface built with React, TypeScript, Vite, and shadcn/ui.

## Features

-   Clean, modern UI using Tailwind CSS and shadcn/ui components
-   Responsive design that works on mobile and desktop
-   Login and registration forms with validation
-   Form validation using Zod and React Hook Form
-   Dark mode support
-   Accessible UI components

## Getting Started

### Prerequisites

-   Node.js 18+ and npm

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/react-auth-ui.git
cd react-auth-ui
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
react-auth-ui/
├── src/
│   ├── components/
│   │   ├── auth/           # Authentication components
│   │   │   ├── auth-tabs.tsx
│   │   │   ├── login-form.tsx
│   │   │   └── register-form.tsx
│   │   └── ui/             # UI components (from shadcn/ui)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       └── tabs.tsx
│   ├── lib/
│   │   └── utils.ts        # Utility functions
│   ├── App.tsx
│   ├── index.css           # Global styles
│   └── main.tsx            # Entry point
├── public/
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── package.json
```

## Customization

### Styling

This project uses Tailwind CSS for styling. You can customize the colors, fonts, and other design elements by modifying the `tailwind.config.js` file.

### Authentication Logic

The current implementation includes placeholder functions for login and registration. In a real application, you would need to:

1. Replace the `onSubmit` functions in the form components with actual API calls to your authentication endpoints
2. Implement state management for user authentication status
3. Add protected routes and navigation

## License

This project is licensed under the MIT License.

## Acknowledgments

-   [shadcn/ui](https://ui.shadcn.com/) for the beautiful, accessible UI components
-   [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
-   [Vite](https://vitejs.dev/) for the fast development environment
