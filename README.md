# Assignment README

This README provides an overview of the assignment, which includes a project management system with three core components: Project List, Active Projects, and Task Details.

## Overview
The assignment implements a project management system with the following key functionalities:

1. **Project List**: Users can view all available projects and accept any project to work on.
2. **Active Projects**: Users can track active projects, view progress, and see associated tasks.
3. **Task Details**: Clicking on a project displays the tasks the user needs to complete, along with the score earned by completing each task.

---

## Technologies Used

### Frontend:
- React.js with functional components and hooks
- Axios for API calls
- Tailwind CSS for responsive styling

### Backend:
- Node.js with Express.js
- MongoDB for database management
- Mongoose for schema modeling

---

## Features

### 1. Project List
- Displays a list of available projects fetched from the backend API.
- Users can accept a project to start working on it.

### 2. Active Projects
- Shows all the projects the user is actively working on.
- Displays progress bars for each project.
- Provides an overview of tasks associated with each project.

### 3. Task Details
- Clicking on a project reveals detailed tasks the user needs to complete.
- Tasks include descriptions, completion status, and points awarded upon completion.

#### Example Task Details:
```json
{
    "taskName": "Setup database schema",
    "description": "Define schema for users, products, and orders.",
    "isCompleted": false,
    "points": 5
}
```

---

## Setup Instructions

1. Clone the repository.
   ```bash
   git clone https://github.com/Jatin917/ionotsassignment.git
   ```
2. Install dependencies for both frontend and backend.
   ```bash
   cd frontend
   npm install

   cd ../backend
   npm install
   ```
3. Configure environment variables for the backend.
   ```env
   MONGO_URI=<your-mongo-db-uri>
   PORT=5000
   ```
4. Start the backend server.
   ```bash
   cd backend
   npm run dev
   ```
5. Start the frontend.
   ```bash
   cd frontend
   npm start
   ```
6. Open the application in your browser at `http://localhost:3000`.

