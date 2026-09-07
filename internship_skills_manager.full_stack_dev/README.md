# Student Internship & Skill Tracker

A simple full-stack internship project for tracking internships, projects, skills, and certificates.

## Tech Stack
- Frontend: HTML, CSS, JavaScript, Bootstrap CDN
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT + bcrypt

## Features
- User registration and login
- JWT protected dashboard
- Internship CRUD
- Project CRUD
- Skill CRUD
- Certificate CRUD
- Profile management
- Dashboard statistics
- Responsive UI

## Setup

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Configure environment
Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/internship_tracker
JWT_SECRET=change_this_to_a_long_random_secret
```

For MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

### 3. Start backend
```bash
npm start
```

The API runs on `http://localhost:5000`.

### 4. Open frontend
Open `frontend/index.html` in a browser, or use VS Code Live Server.

## Demo Flow
1. Register a new account.
2. Login.
3. Add internships, projects, skills and certificates.
4. Return to the dashboard to see updated statistics.
5. Edit/delete records to demonstrate CRUD operations.

## API
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/profile`
- PUT `/api/profile`
- GET/POST `/api/internships`
- PUT/DELETE `/api/internships/:id`
- GET/POST `/api/projects`
- PUT/DELETE `/api/projects/:id`
- GET/POST `/api/skills`
- PUT/DELETE `/api/skills/:id`
- GET/POST `/api/certificates`
- PUT/DELETE `/api/certificates/:id`
