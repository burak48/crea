# Frontend

This is the frontend of the project, responsible for the user interface and interaction.

## Technologies Used

-   HTML, CSS, JavaScript
-   React, React Router, Axios for HTTP requests, Tailwind for styling

## Setup and Run

1. Clone the repository:

```
git clone https://github.com/burak48/crea.git
```

2. Install dependencies:

```
cd frontend
npm install
```

3. Configure environment variables:

-   Create a `.env` file in the root of the `frontend` directory.
-   Define the necessary environment variables in the `.env` file, such as API base URL.

```
REACT_APP_API_URL={your_url_address}
```

4. Start the frontend development server:

```
npm start
```

The frontend development server should now be running and the application can be accessed in a web browser at the specified URL (default is http://localhost:3000).

## Components

The frontend of this application is composed of the following components:

-   **App**: The main component that renders the entire application. This component contains the state of the application.
-   **ProductDetail**: This component displays the details of a single product.
-   **ProductList**: This component displays a list of all products available in the database.
-   **Header**: This component allows users to click on the logo to easily navigate back to the home page within the app, and the logged-in user can logout with the logout button in the header.
-   **Home**: This component is the landing page of the application. It displays all products.
-   **Login**: This component provides a login form for users to access the application's features. Users must be authenticated in order to see products.
-   **Star**: This component is a reusable component that represents a star icon, commonly used for rating system.

## Linting and Formatting

This project includes linting and formatting scripts to ensure code quality and consistency. The following commands can be used to run the linter and formatter:

-   `npm run lint`: Runs the linter to check for code style and potential errors.
-   `npm run lint:fix`: Runs the linter and automatically fixes fixable issues.
-   `npm run format`: Formats the codebase according to the specified code style rules.

It is recommended to run these commands regularly to maintain a clean and consistent codebase.
