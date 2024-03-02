# MERN Authentication App

This is a full-stack authentication application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The application allows users to register, login, and authenticate using JWT (JSON Web Tokens).

## Features

- User registration with validation
- User login with authentication
- JWT token-based authentication
- Password hashing for security
- MongoDB database storage

## Directory Structure

- **client/**: Frontend React application
  - **public/**: Public assets and HTML template
    - `index.html`: HTML template
  - **src/**: Source code directory
    - **components/**: React components
      - `Login.js`: Component for user login
      - `Register.js`: Component for user registration
      - `Home.js`: Component for the home page
      - `App.js`: Main application component
      - `App.css`: Styles for the main application component
      - `index.js`: Entry point for React application
      - `index.css`: Global styles
      - ... Other components
        
- **api/**: Backend Node.js and Express server
  - **models/**: MongoDB models
    - `User.js`: Model for user data
  - `server.js`: Express server setup
  - `package.json`: Project dependencies and scripts

## Installation

### Client Installation:
  - cd client   
  - npm install   
  
### Server Installation:
  - cd server   
  - npm install   

### Running the Application
-From the root directory:

**Client:**   
  - cd client  
  - npm start  
  - This will start the React frontend on http://localhost:3000.  

**Api:**  
  - cd api  
  - npm start  
  - This will start the Node.js backend on http://localhost:4000.  


## Usage

1. **Register**: Users can register by providing their email and password.
2. **Login**: Registered users can log in using their credentials.
3. **Authentication**: Authenticated routes are protected and require a valid JWT token.


## MERN Technology Usage

### MongoDB
  - MongoDB is used as the database for storing user information, including credentials and other relevant data.

### Express.js
  - Express.js is utilized to create the backend server for handling HTTP requests, defining routes, and interacting with the MongoDB database.

### React.js
  - React.js is employed to develop the frontend user interface of the authentication application. It enables the creation of reusable UI components and manages the application's state efficiently.

### Node.js
  - Node.js serves as the server-side JavaScript runtime environment. It executes the backend logic, including user authentication, token generation, and database interactions.

These technologies work together seamlessly in the MERN stack to create a robust, scalable, and efficient authentication application.


