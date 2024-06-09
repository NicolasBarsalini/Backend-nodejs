
# Backend Node.js Task Management API

This is a task management API built with Node.js, Express, and MongoDB. The API allows authenticated users to create, edit, delete, and list their tasks, as well as assign tasks to other users. You must have an account on Atlas MongoDB to continue...

## Requirements

- Node.js (version 14 or higher)
- MongoDB (local or cloud)
- NPM or Yarn

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/NicolasBarsalini/Backend-nodejs.git
   cd Backend-nodejs
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables:

   Create a `.env` file in the root of the project and add the following variables:

   ```env
    PORT=8080
    DATABASE_NAME="exemple"
    DATABASE_USER="xxxx"
    DATABASE_PASSWORD="xxxx"
    JWT_SECRET="choose_your_secret"
   ```

## Running the Project

To start the server in development mode:

```bash
npm run dev
# or
yarn dev
```

To start the server in production mode:

```bash
npm start
# or
yarn start
```

## API Endpoints

### Authentication

- `POST /login`: Authenticates a user and returns a JWT token.

### Tasks

- `GET /tasks/`: Lists all tasks of the logged-in user.
- `POST /tasks/new`: Creates a new task for the logged-in user.
- `PUT /tasks/edit/:id`: Edits a specific task of the logged-in user.
- `DELETE /tasks/delete/:id`: Deletes a specific task of the logged-in user.
- `GET /tasks/unassigned`: Lists all tasks that do not have an owner.
- `PUT /tasks/assign/:id`: Assigns an owner to a specific task.

## Request Example

### Creating a Task

```bash
POST /tasks/new
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
    "title": "New Task",
    "description": "Description of the new task",
    "status": false
}
```

### Response

```json
{
    "_id": "60b8d295f1d4f61b8c8a3a56",
    "title": "New Task",
    "description": "Description of the new task",
    "status": false,
    "owner": "60b8d295f1d4f61b8c8a3a55",
    "__v": 0
}
```

### Users

- `GET /users`: Lists all users.
- `PUT /users/update/:email`: Edits a specific user by email.
- `DELETE /users/delete/:email`: Deletes a specific user by email.
- `GET /users/searchBy/:role`: Counts the number of users by role.
- `GET /users/:email`: Gets a specific user by email.
- `POST /users/new`: Registers a new user.

### Clients

- `POST /register`: Registers a new client.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.