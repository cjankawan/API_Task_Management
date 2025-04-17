# Task Management API Setup and Usage Instructions

This document provides instructions on how to set up and use your Task Management API built with Express, Mongoose, and Joi.

## Folder Structure

The project structure is organized as follows:

**Brief Description:**

- **`config`**: Contains configuration files, such as the database connection setup in `db.js`.
- **`controllers`**: Holds the logic for handling API requests, like creating, reading, updating, and deleting tasks in `taskController.js`.
- **`middleware`**: Includes custom middleware functions, such as `errorMiddleware.js` for handling errors and `validate.js` for request body validation.
- **`models`**: Defines the data structure for your application using Mongoose schemas, with `Task.js` representing the task model.
- **`routes`**: Specifies the API endpoints and their corresponding controller functions in `taskRoutes.js`.
- **`utils`**: Contains utility classes and functions for consistent API responses (`ApiResponse.js`), custom error handling (`ApiError.js`), and asynchronous request handling (`asyncHandler.js`).
- **`validation`**: Houses the Joi validation schemas used to ensure the integrity of incoming data, with `taskValidation.js` defining the validation rules for task-related requests.
- **`.env.example`**: Provides a template for environment variables.
- **`.env`**: Stores your actual environment-specific configuration (e.g., database URI, port). **Remember to add this file to your `.gitignore` to prevent accidental commits.**
- **`index.js`**: The main entry point of your Express application.
- **`package.json`**: Contains project metadata and scripts.

## Setup Instructions

Follow these steps to set up your Task Management API:

1.  **Navigate to the Project Directory:**
    Open your terminal or command prompt and navigate to the root directory of your API project.

    ```bash
    cd your-project-directory
    ```

2.  **Install Dependencies:**
    Use npm (Node Package Manager) to install all the necessary dependencies listed in your `package.json` file. This includes Express, Mongoose, Joi, dotenv (for environment variables), and nodemon (for development).

    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**

    - **Copy from Example:** Locate the `.env.example` file in the root directory. This file provides a template for the environment variables your application needs.
    - **Create `.env` File:** Create a new file named `.env` in the root directory of your project.
    - **Populate `.env`:** Open the `.env` file and copy the contents from `.env.example`. Modify the values in `.env` according to your specific configuration. This typically includes:
      - `PORT`: The port your API will run on (e.g., `3000`).
      - `MONGODB_URI`: The connection string for your MongoDB database.

    **Example `.env` file:**

    ```
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/task-management
    ```

    **Important:** Ensure your `.env` file is in the root directory and is **not** committed to your version control system (e.g., Git). Add `.env` to your `.gitignore` file.

## Usage Instructions

Once the setup is complete, you can run your API in development mode:

1.  **Run in Development Mode:**
    Your `package.json` file should have a `dev` script defined to run your application using nodemon. This will automatically restart the server whenever you make changes to your code.

    ```bash
    npm run dev
    ```

    You should see output in your terminal indicating that your server has started, usually with the specified port number.

2.  **Accessing the API:**
    Your API endpoints will be available at the base URL of your server (e.g., `http://localhost:5000` ). You can use tools like `curl`, Postman, Insomnia, or a frontend application to interact with your API endpoints.

    Refer to your `routes/taskRoutes.js` file for the specific API endpoints and the HTTP methods they support (e.g., GET, POST, PUT, DELETE) for managing tasks.

    **Example API Endpoints (based on common RESTful practices):**

    - **GET /api/tasks**: Retrieve a list of all tasks.
    - **GET /api/tasks/:id**: Retrieve a specific task by its ID.
    - **POST /api/tasks**: Create a new task (request body should be validated against your Joi schema in `taskValidation.js`).
    - **PUT /api/tasks/:id**: Update an existing task by its ID (request body should be validated).
    - **DELETE /api/tasks/:id**: Delete a task by its ID.

    **Request and Response Formats:**

    - Typically, requests with data (e.g., POST, PUT) will send data in JSON format in the request body.
    - The API will likely respond with JSON data, including the requested resources or status messages. Your `utils/ApiResponse.js` likely defines a consistent structure for successful responses. Errors will be handled by your `middleware/errorMiddleware.js` and may follow a specific JSON format as well (potentially using `utils/ApiError.js`).

By following these instructions, you should have your Task Management API up and running and be able to interact with its endpoints. Remember to consult your code in `controllers/taskController.js` and `routes/taskRoutes.js` for the exact API endpoint definitions and expected request/response formats.
