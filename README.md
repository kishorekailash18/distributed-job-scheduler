# Distributed Job Scheduler

A secure backend application built using Node.js, Express.js, PostgreSQL, and JWT Authentication. Users can register, log in, and manage scheduled jobs. A background worker automatically processes pending jobs.

## Features

- User Registration
- User Login (JWT Authentication)
- Protected Routes
- Create Job
- View All Jobs
- View Single Job
- Update Job
- Delete Job
- Background Worker
- PostgreSQL Database

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT
- bcrypt
- dotenv
- Morgan
- Helmet

## Project Structure

```
server/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   └── index.js
│
├── worker/
│   └── jobWorker.js
│
├── package.json
└── .env
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Install Dependencies

```bash
npm install
```

### Create .env

```
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=job_scheduler

JWT_SECRET=your_secret_key
```

### Start Server

```bash
npm run dev
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |
| GET | /api/auth/me | Get Logged-in User |

### Jobs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/jobs | Create Job |
| GET | /api/jobs | Get All Jobs |
| GET | /api/jobs/:id | Get Single Job |
| PUT | /api/jobs/:id | Update Job |
| DELETE | /api/jobs/:id | Delete Job |

## Authentication

All Job APIs require:

```
Authorization: Bearer <JWT_TOKEN>
```

## Background Worker

The worker continuously checks pending jobs and automatically updates their status to **completed**.

## Author

Kishore