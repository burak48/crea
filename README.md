# CREA

This project is a web application that includes a backend API and a frontend user interface.
It provides an authentication mechanism where user can log in with a predefined username and password and access product-related functionalities.

## Demo

For the backend demo, try [heroku](https://nameless-hollows-26350.herokuapp.com/)

For the frontend demo, try [vercel](https://crea-eight.vercel.app/)

## Table of Contents

- [Technologies Used](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

### Backend

- Node.js
- Express
- JSON Server for storing products
- JWT authentication mechanism

### Frontend

- HTML, CSS, JavaScript
- React, React Router, Axios for HTTP requests, Tailwind for styling

## Installation

Clone the repository:

```
git clone https://github.com/burak48/crea.git
```

### Backend Setup:

Navigate to the backend directory.

```
cd backend
```

Install dependencies:

```
npm install
```

Configure environment variables:

Create a .env file in the root of the backend directory.
Define the necessary environment variables in the .env file, such as user password for connection details and authentication secret.

```
USER_PASSWORD={your_hashed_password}
USER_SECRET_KEY={your_secret_key}
```

Frontend Setup:

Navigate to the frontend directory.

```
cd frontend
```

Install dependencies:

```
npm install
```

Configure environment variables:

Create a .env file in the root of the frontend directory.
Define the necessary environment variables in the .env file, such as API base URL.

```
REACT_APP_API_URL={your_url_address}
```

## Usage

Start the backend server:

Navigate to the backend directory.

```
cd backend
```

Run the following command:

```
npm start
```

The backend server should now be running on the specified port (default is 3001).

Start the frontend development server:

Navigate to the frontend directory.

```
cd frontend
```

Run the following command:

```
npm start
```

The frontend development server should now be running, and the application can be accessed in a web browser at the specified URL (default is http://localhost:3000).

## API Endpoints

POST /login: Endpoint for user authentication.
GET /products: Returns a list of all products.
GET /product/:id: Returns the product with the given ID.
POST /product/:id: Creates a new comment with the given data.

# Contributing

If you would like to contribute to this project, please follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix.
Make your changes and commit them.
Push your changes to your fork.
Submit a pull request to the main repository.

# License

This project is licensed under the MIT License.
