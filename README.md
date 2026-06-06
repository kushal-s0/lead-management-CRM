# Lead Management CRM

A production-style Lead Management CRM built for a Full Stack Developer Internship assessment. The project includes a typed Express API, MongoDB persistence, server-side pagination, filtering, sorting, search, and a modern responsive Next.js dashboard with charts.

## Features

- Create, view, edit, delete, search, filter, sort, and paginate leads
- Update lead status inline from the leads table
- Dashboard cards for total, new, contacted, qualified, converted, and lost leads
- Pie and bar charts for status distribution using Recharts
- React Hook Form and Zod validation
- Toast notifications, loading states, empty states, and error states
- Controller-service backend architecture with validation and error middleware
- Sample seed script for demo data

## Tech Stack

- Frontend: Next.js 15 App Router, React, TypeScript, Tailwind CSS, shadcn-style UI components, Axios, React Hook Form, Zod, Recharts, Sonner
- Backend: Node.js, Express, TypeScript, Zod
- Database: MongoDB with Mongoose
- Deployment: Vercel frontend, Render or Railway backend, MongoDB Atlas database

## Folder Structure

```txt
.
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── scripts
│   │   ├── services
│   │   ├── utils
│   │   ├── validators
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env.example
│   ├── package.json
│   └── README.md
├── frontend
│   ├── src
│   │   ├── app
│   │   ├── components
│   │   ├── lib
│   │   └── types
│   ├── .env.example
│   └── package.json
└── package.json
```

## Installation

1. Install backend dependencies:

```bash
cd backend
npm install
```

2. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

3. Create environment files:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

4. Update `backend/.env` with your MongoDB Atlas URI or local MongoDB URI.

5. Seed sample leads:

```bash
npm --prefix backend run seed
```

6. Start the backend:

```bash
npm --prefix backend run dev
```

7. Start the frontend in another terminal:

```bash
npm --prefix frontend run dev
```

Frontend: `http://localhost:3000`  
Backend: `http://localhost:5000`

## Environment Variables

Backend:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lead-crm
FRONTEND_URL=http://localhost:3000
```

Frontend:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## MongoDB Schema

```ts
{
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "New" | "Contacted" | "Qualified" | "Converted" | "Lost";
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## API Documentation

Base URL: `http://localhost:5000/api`

### Create Lead

`POST /leads`

Request body:

```json
{
  "name": "Jane Cooper",
  "email": "jane@acme.com",
  "phone": "+1 555 012 4570",
  "company": "Acme Inc.",
  "status": "New",
  "notes": "Interested in a demo."
}
```

Response:

```json
{
  "data": {
    "_id": "665f1b8a934a9d5d12c22a10",
    "name": "Jane Cooper",
    "email": "jane@acme.com",
    "phone": "+1 555 012 4570",
    "company": "Acme Inc.",
    "status": "New",
    "notes": "Interested in a demo.",
    "createdAt": "2026-06-06T08:30:00.000Z",
    "updatedAt": "2026-06-06T08:30:00.000Z"
  }
}
```

### Get Leads

`GET /leads?page=1&limit=10&status=Converted&sortBy=createdAt&order=desc`

Response:

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

### Search Leads

`GET /leads/search?q=acme&page=1&limit=10`

Searches by name, email, and company using MongoDB regex.

### Get Lead

`GET /leads/:id`

Returns one lead for the edit page.

### Update Lead

`PUT /leads/:id`

Request body can contain any editable lead fields:

```json
{
  "status": "Qualified",
  "notes": "Decision maker confirmed budget."
}
```

### Delete Lead

`DELETE /leads/:id`

Response:

```json
{
  "message": "Lead deleted successfully"
}
```

### Dashboard Stats

`GET /leads/stats`

Response:

```json
{
  "data": {
    "total": 42,
    "byStatus": {
      "New": 8,
      "Contacted": 11,
      "Qualified": 9,
      "Converted": 10,
      "Lost": 4
    }
  }
}
```

## Deployment

### MongoDB Atlas

1. Create a MongoDB Atlas cluster.
2. Add a database user.
3. Allow access from your backend host IP or use Render/Railway recommended network settings.
4. Copy the connection string into `MONGODB_URI`.

### Backend on Render or Railway

- Root directory: `backend`
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Environment variables: `PORT`, `NODE_ENV=production`, `MONGODB_URI`, `FRONTEND_URL`

### Frontend on Vercel

- Root directory: `frontend`
- Framework preset: Next.js
- Environment variable: `NEXT_PUBLIC_API_URL=https://your-backend-url.com/api`

## Screenshots

Add screenshots here after deployment:

- Dashboard
- Leads list
- Create lead
- Edit lead

