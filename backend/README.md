# Backend API

Express, TypeScript, MongoDB, and Mongoose backend for the Lead Management CRM.

## Run Locally

```bash
npm install
cp .env.example .env
npm run dev
```

Seed sample data:

```bash
npm run seed
```

Build and run production output:

```bash
npm run build
npm start
```

## Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lead-crm
FRONTEND_URL=http://localhost:3000
```

## API

Base path: `/api/leads`

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/` | Create a lead |
| GET | `/` | List leads with pagination, sorting, status filter, and search |
| GET | `/search` | Search leads by name, email, or company |
| GET | `/stats` | Dashboard status counts |
| GET | `/:id` | Get one lead |
| PUT | `/:id` | Update a lead |
| DELETE | `/:id` | Delete a lead |

### Query Parameters

- `page`: page number, default `1`
- `limit`: items per page, default `10`, max `100`
- `status`: `New`, `Contacted`, `Qualified`, `Converted`, or `Lost`
- `q` or `search`: regex search for name, email, and company
- `sortBy`: `name`, `createdAt`, or `status`
- `order`: `asc` or `desc`

### Create Lead Body

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

### Paginated Response

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
