# Backend

This is the backend of the project, responsible for handling authentication, API endpoints, and data management.

## Technologies Used

- Node.js
- Express
- JSON Server for storing products
- JWT authentication mechanism

## Setup and Run

1. Clone the repository:

```
git clone https://github.com/burak48/crea.git
```

2. Install dependencies:

```
cd backend
npm install
```

3. Configure environment variables:

- Create a `.env` file in the root of the `backend` directory.
- Define the necessary environment variables in the `.env` file, such as user password for connection details and authentication secret.

```
USER_PASSWORD={your_hashed_password}
USER_SECRET_KEY={your_secret_key}
```

4. Start the backend server:

```
npm start
```

The backend server should now be running on the specified port (default is 3001).

## API Endpoints

- **POST /login**: Endpoint for user authentication.

- **GET /products**: Returns a list of all products.

- **GET /product/:id**: Returns the product with the given ID.

- **POST /product/:id**: Creates a new comment with the given data.

## Testing

The backend includes a set of tests to ensure that the APIs are working correctly. You can run the tests using
**npm test**.

## Linting and Formatting

This project includes linting and formatting scripts to ensure code quality and consistency. The following commands can be used to run the linter and formatter:

- `npm run lint`: Runs the linter to check for code style and potential errors.
- `npm run lint:fix`: Runs the linter and automatically fixes fixable issues.
- `npm run format`: Formats the codebase according to the specified code style rules.

It is recommended to run these commands regularly to maintain a clean and consistent codebase.
