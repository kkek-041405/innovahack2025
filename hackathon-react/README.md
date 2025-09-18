# Hackathon React Project

This project is a React application designed for the Hackathon event. It utilizes modern web technologies including TypeScript, Vite, and Tailwind CSS for styling. The application is structured to facilitate easy development and scalability.

## Project Structure

```
hackathon-react
├── web
│   ├── index.html          # Main HTML entry point
│   ├── src
│   │   ├── main.tsx        # Entry point for the React application
│   │   ├── App.tsx         # Main App component
│   │   ├── components       # Directory for reusable components
│   │   │   ├── ui          # UI components
│   │   │   │   └── index.ts # Exports for UI components
│   │   │   └── index.ts     # Exports for various components
│   │   ├── pages           # Directory for page components
│   │   │   └── Home.tsx    # Home page component
│   │   ├── lib             # Library functions
│   │   │   ├── firebase.ts  # Firebase initialization
│   │   │   ├── useAuth.ts   # Custom hook for authentication
│   │   │   └── functions.ts  # Functions for interacting with Firebase
│   │   ├── types           # TypeScript types and interfaces
│   │   │   └── index.ts    # Exports for types
│   │   └── styles          # Global styles
│   │       └── globals.css  # Global CSS styles
│   ├── public              # Static assets
│   ├── package.json        # npm configuration
│   ├── tsconfig.json       # TypeScript configuration
│   ├── vite.config.ts      # Vite configuration
│   ├── tailwind.config.ts   # Tailwind CSS configuration
│   └── postcss.config.cjs  # PostCSS configuration
├── functions               # Firebase functions
│   ├── src
│   │   └── index.ts        # Server logic for Firebase functions
│   ├── package.json        # Firebase functions configuration
│   └── tsconfig.json       # TypeScript configuration for functions
├── firebase.json           # Firebase project configuration
├── .firebaserc             # Firebase project aliases
├── .env.example             # Example environment variables
└── README.md               # Project documentation
```

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd hackathon-react
   ```

2. **Install dependencies**:
   ```
   cd web
   npm install
   ```

3. **Run the development server**:
   ```
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000` to view the application.

## Features

- **Responsive Design**: The application is styled using Tailwind CSS, ensuring a responsive and modern UI.
- **Firebase Integration**: The app integrates with Firebase for authentication and data management.
- **TypeScript Support**: The project is built with TypeScript for type safety and better development experience.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.