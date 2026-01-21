# PlanBoard - Task Management Application

A full-stack task management application built with **TypeScript**, **Express.js**, **React**, **PostgreSQL**, and **Prisma ORM**.

## Features

- **User Authentication** - Secure login and registration with JWT
- **Calendar Integration** - Interactive calendar to select dates and manage tasks
- **Task Management** - Create, read, update, and delete tasks
- **Task Status Tracking** - Mark tasks as Pending, In Progress, or Completed
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Modern UI** - Clean and intuitive user interface with animations
- **Database Persistence** - PostgreSQL with Prisma ORM

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Zod

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **HTTP Client**: Axios
- **Styling**: CSS3

## Project Structure

```
Backend_Developer_Intern/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── env.ts          # Environment variables
│   │   │   └── prisma.ts       # Prisma client setup
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.ts
│   │   │   └── error.middleware.ts
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.routes.ts
│   │   │   │   └── auth.service.ts
│   │   │   └── tasks/
│   │   │       ├── tasks.controller.ts
│   │   │       ├── tasks.routes.ts
│   │   │       └── tasks.service.ts
│   │   ├── utils/
│   │   │   ├── apiResponse.ts
│   │   │   └── jwt.ts
│   │   ├── server.ts           # Server entry point
│   │   └── app.ts              # Express app setup
│   ├── prisma/
│   │   └── schema.prisma       # Database schema
│   ├── .env                    # Environment variables
│   ├── tsconfig.json
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx             # Main component
│   │   ├── App.css             # Styles
│   │   ├── api.ts              # API configuration
│   │   └── main.tsx            # Entry point
│   ├── index.html
│   ├── tsconfig.json
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### 1. Clone Repository

```bash
cd /Users/shalinisaloni/Backend_Developer_Intern
```

### 2. Database Setup

**Create PostgreSQL Database:**

```bash
sudo -u postgres psql
```

Inside psql shell:

```sql
CREATE DATABASE primetrade;
ALTER USER postgres WITH PASSWORD 'postgres';
\q
```

**Database Credentials:**
- User: `postgres`
- Password: `postgres`
- Database: `primetrade`
- Port: `5432`

### 3. Backend Setup

```bash
cd backend
npm install
```

**Create `.env` file:**

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/primetrade"
JWT_SECRET="your-secret-key-here"
JWT_EXPIRES_IN="7d"
PORT=3000
NODE_ENV="development"
```

**Setup Prisma:**

```bash
npx prisma migrate dev --name init
npx prisma generate
```

**Start Backend Server:**

```bash
npm run dev
```

Server runs on `http://localhost:3000`

### 4. Frontend Setup

```bash
cd frontend
npm install
```

**Start Frontend Server:**

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Tasks
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Usage

### 1. Register Account
- Click "Create Account" button
- Fill in name, email, and password
- Click "Create Account"

### 2. Login
- Enter email and password
- Click "Sign In"

### 3. Create Tasks
- Select date from calendar on the left
- Enter task title and description
- Click "Create Task"

### 4. Manage Tasks
- **Mark Complete**: Click "✓ Complete" button to mark task as done
- **Edit Task**: Click "Edit" button to modify task details
- **Delete Task**: Click "Delete" button to remove task


## Authentication

- Passwords are securely hashed using bcrypt
- JWT tokens are used for API authentication
- Tokens expire after 7 days (configurable)

## Database Schema

### User Table
```sql
- id (UUID, Primary Key)
- name (String)
- email (String, Unique)
- password (String, Hashed)
- createdAt (DateTime)
- updatedAt (DateTime)
```

### Task Table
```sql
- id (UUID, Primary Key)
- title (String)
- description (String, Optional)
- status (Enum: TODO, IN_PROGRESS, DONE)
- ownerId (UUID, Foreign Key)
- createdAt (DateTime)
- updatedAt (DateTime)
```

## Configuration

### Environment Variables

**Backend (.env):**
```env
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
PORT=3000
NODE_ENV=development
```

**Frontend (api.ts):**
```typescript
const api = axios.create({
  baseURL: "http://localhost:3000/api"
});
```



## Troubleshooting

### Backend Won't Start
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Check Prisma setup
npx prisma generate
npx prisma migrate dev
```

### Database Connection Error
```bash
# Verify PostgreSQL is running
brew services list

# Restart PostgreSQL
brew services restart postgresql@15

# Check database exists
psql -U postgres -l
```

### Frontend API Errors
- Ensure backend is running on port 3000
- Check API baseURL in `frontend/src/api.ts`
- Clear browser cache and reload

## Dependencies

### Backend
```json
{
  "express": "^4.18.0",
  "@prisma/client": "latest",
  "jsonwebtoken": "^9.0.0",
  "bcryptjs": "^2.4.3",
  "zod": "^3.0.0",
  "dotenv": "^16.0.0",
  "typescript": "^5.0.0"
}
```

### Frontend
```json
{
  "react": "^18.0.0",
  "axios": "^1.0.0",
  "typescript": "^5.0.0"
}
```

## Styling

- CSS3 with CSS Variables for theming
- Responsive grid layouts
- Smooth animations and transitions
- Mobile-first design approach

