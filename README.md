
# News App

A simple Angular application that fetches and displays news articles from the [NewsAPI](https://newsapi.org/). The app includes features like pagination, article filtering, and offline mode support.

## Features

- Fetch news articles from various sources
- Apply filters (start date, end date, source, search query)
- Pagination to navigate through articles
- Save articles for offline reading
- Display news articles with images, title, description, and publication date
- Handle network errors with user-friendly alerts
- Display a loading spinner while articles are being fetched
- Responsive design for mobile and desktop views

## Demo

You can try out the app by visiting [Demo Link](#).

## Installation

Follow these steps to get the project running locally on your machine.

### Prerequisites

- Node.js (v20.0.0 or higher)
- Angular CLI (v18.0.0 or higher)
- An API Key from [NewsAPI](https://newsapi.org/)

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/Haithemkoriche/NewsApp.git
   ```

2. **Navigate into the project folder**

   ```bash
   cd news-app
   ```

3. **Install dependencies**

   Run the following command to install all necessary dependencies:

   ```bash
   npm install
   ```

4. **Set up environment variables**

   - Navigate to the `src/environments/environment.ts` file.
   - Replace `apiKey` with your [NewsAPI](https://newsapi.org/) API key.

   Example:

   ```ts
   export const environment = {
     production: false,
     apiKey: 'YOUR_API_KEY_HERE',
     apiUrl: 'https://newsapi.org/v2/',
   };
   ```

5. **Run the application**

   After setting up the environment variables, run the app with:

   ```bash
   ng serve
   ```

   The app will be accessible at `http://localhost:4200`.

## Folder Structure

```plaintext
src/
├── app/
│   ├── slider/
│   │   ├── slider.component.ts        # Slider component for displaying images or content
│   │   ├── slider.component.html      # HTML template for the slider component
│   │   └── slider.component.css       # Styles for the slider component
│   ├── services/
│   │   └── news.service.ts            # Service to fetch news data from NewsAPI
│   ├── app.component.ts               # Main component that fetches and displays articles
│   ├── app.component.html             # HTML template for app.component.ts
│   ├── app.component.css              # Styles for the main app component
│   └── app.component.spec.ts          # Unit tests for the app component
├── environments/
│   └── environment.ts                 # Environment variables (API key, base URL, etc.)
└── index.html                         # Main HTML file for the app
```

### Important Files

- **app.component.ts**: Main component that handles the fetching of articles, applying filters, pagination, and error handling.
- **news.service.ts**: Service for interacting with the NewsAPI to fetch articles.
- **environment.ts**: Contains environment configuration, including the NewsAPI key and URL.

## Usage

1. **Filtering Articles**: You can filter articles by start date, end date, source, and search query. After applying the filters, the articles will be updated accordingly.
2. **Pagination**: Navigate between pages of articles using the pagination controls. The "Next" and "Previous" buttons will adjust the page based on the current state.
3. **Offline Mode**: Save articles for offline reading and display them even when the app is offline.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

<!-- ## License -->

<!-- This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. -->
