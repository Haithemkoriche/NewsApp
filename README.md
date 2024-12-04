
# NewsApp Documentation

## Overview
NewsApp is an Angular-based web application that provides an elegant interface for viewing news articles with advanced features like dynamic categories, search functionality, and a slider showcasing the latest news.

---

## Features
1. **Navbar with Categories**: Dynamically loaded categories for filtering news.
2. **Search Functionality**: Search bar integrated into the navbar.
3. **Responsive Slider**: Displays the first five news articles with dynamic images and descriptions.
4. **Dynamic News Display**: Articles are fetched and rendered dynamically.
5. **Bootstrap Integration**: Styled with Bootstrap 5 for a modern and responsive design.

---

## Installation Guide

### 1. Prerequisites
Before installing and running the app, ensure you have the following tools installed on your system:
- **Node.js**: Version 18 or higher (Download from [Node.js Official Site](https://nodejs.org)).
- **Angular CLI**: Install globally via `npm install -g @angular/cli`.
- **NPM**: Version 8 or higher (comes bundled with Node.js).

---

### 2. Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/news-app.git
   cd news-app
   ```

2. **Install Dependencies**:
   Run the following command to install all required dependencies listed in the `package.json` file:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   Launch the application locally with:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:4200`.

4. **Build for Production**:
   To generate production-ready files:
   ```bash
   npm run build
   ```
   The build files will be located in the `dist/` folder.

---

## Compatibility
### Browsers
NewsApp is compatible with the following modern web browsers:
- **Google Chrome**: Version 89 or higher.
- **Mozilla Firefox**: Version 85 or higher.
- **Microsoft Edge**: Version 88 or higher.
- **Safari**: Version 13 or higher.

### Operating Systems
- **Windows**: 10 and 11.
- **macOS**: Big Sur and later.
- **Linux**: Latest stable distributions like Ubuntu 20.04+.

### Devices
- **Desktop**: Fully responsive for resolutions 1024px and above.
- **Mobile & Tablet**: Supports responsive layouts for smaller screens (Bootstrap grid system).

---

## Project Structure
```
news-app/
├── src/
│   ├── app/
│   │   ├── components/           # Feature-specific components
│   │   ├── services/             # Reusable services for API interactions
│   │   ├── models/               # Interfaces and models for data structures
│   │   └── app.component.*       # Main application component
│   ├── assets/                   # Static assets like images
│   ├── environments/             # Environment-specific configuration
│   └── index.html                # Main entry point for the app
├── angular.json                  # Angular CLI configuration
├── package.json                  # Node.js dependencies and scripts
└── README.md                     # Project documentation
```

---

## Dependencies
### Production Dependencies
| Package               | Version    | Description                                      |
|-----------------------|------------|--------------------------------------------------|
| `@angular/core`       | ^19.0.1    | Angular framework core features.                |
| `bootstrap`           | ^5.3.3     | CSS framework for responsive design.            |
| `primeng`             | ^17.18.12  | UI components for rich application interfaces.  |
| `rxjs`                | ~7.8.0     | Reactive programming library for Angular.       |
| `moment`              | ^2.30.1    | Date and time manipulation library.             |

### Development Dependencies
| Package                       | Version    | Description                                      |
|-------------------------------|------------|--------------------------------------------------|
| `@angular/cli`                | ^19.0.2    | Angular CLI for development workflow.           |
| `karma`                       | ~6.4.0     | Test runner for Angular applications.           |
| `typescript`                  | ~5.6.2     | TypeScript compiler.                            |

---

## How to Extend
1. **Add New Features**:
   - Create a new component in the `components/` folder for modular development.
   - Use Angular CLI:
     ```bash
     ng generate component components/<ComponentName>
     ```

2. **Connect APIs**:
   - Use Angular services in the `services/` folder to manage API interactions.
   - Inject services into components to fetch and display data.

3. **Styling**:
   - Customize styles in `styles.css` or use `scss` for modular styling.

4. **Add New Dependencies**:
   - Install new packages using npm:
     ```bash
     npm install <package-name>
     ```

---

## Troubleshooting
### Common Issues:
1. **Port Already in Use**:
   - Stop any process using port `4200` or run:
     ```bash
     ng serve --port=<custom-port>
     ```

2. **Build Errors**:
   - Ensure all dependencies are installed:
     ```bash
     npm install
     ```

3. **Bootstrap Styles Not Loading**:
   - Verify that `bootstrap.min.css` is included in `angular.json`:
     ```json
     "styles": [
       "node_modules/bootstrap/dist/css/bootstrap.min.css",
       "src/styles.css"
     ]
     ```

---

## Future Enhancements
- Integration with a live news API (e.g., NewsAPI.org).
- User authentication for personalized news feeds.
- Offline support using Progressive Web App (PWA) techniques.
- Advanced filtering and sorting options.

---

For further assistance, feel free to contact the development team or refer to the [Angular Documentation](https://angular.io/docs).
