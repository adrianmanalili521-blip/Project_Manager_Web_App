# Project Manager Web App

A full-stack project management dashboard built with React, TypeScript, Vite, Tailwind CSS, and an Express/MySQL backend.

## Overview

This repository contains:
- A frontend app in the root folder (`src/`, `package.json`, `vite.config.ts`)
- A backend API under `backend/`

The frontend consumes the backend API to display project cards, summary metrics, and filters.

## Application Preview

### Dashboard Overview
<img width="1291" height="729" alt="Dashboard Overview" src="https://github.com/user-attachments/assets/b9eba494-8643-489d-873f-992943fbd4a9" />

### Project Grid & Filters
<img width="1291" height="729" alt="Project Grid and Filters" src="https://github.com/user-attachments/assets/af132454-afc2-411f-974c-1702d49b38b4" />

### Project Creation Modal
<img width="1291" height="729" alt="Project Creation Modal" src="https://github.com/user-attachments/assets/7f84b133-e88c-4c79-a974-43341947e110" />

## Key Features

- Dashboard cards for total projects, in-progress, completed, and overdue counts
- Search projects by title or description
- Filter by project status and difficulty
- Grid/list view toggle
- Create new projects from the frontend
- Responsive modern UI with Tailwind CSS

## Technologies

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, framer-motion, lucide-react
- **Backend:** Node.js, Express, MySQL, mysql2, dotenv, CORS

## Setup

### 1. Backend

```bash
cd /home/adrian/projects/Project_Manager_Web_App/backend
npm install
```

Create a `.env` file in `backend/` with your database credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_database_name
```

To clear your database table and seed it with 10 sample projects:
```bash
npm run seed
```

Start the backend server:
```bash
npm run start
```

For development with auto reload:
```bash
npm run dev
```

The backend runs on `http://localhost:3001`.

### 2. Frontend

```bash
cd /home/adrian/projects/Project_Manager_Web_App
npm install
npm run dev
```

Open the local URL shown by Vite, typically `http://localhost:5173`.

## Available API Endpoints

The backend exposes these routes under `/projects`:

- `GET /projects/all-projects` — get all projects
- `GET /projects/total-count` — get total project count
- `GET /projects/status-counts` — get project counts by status
- `GET /projects/:id` — get a single project
- `POST /projects` — create a new project
- `DELETE /projects/:id` — delete a project
- `PUT /projects/:id` — update a project

## Notes

- Ensure the backend is running before opening the frontend.
- If you change the backend port, update the fetch URLs in `src/App.tsx`.
- The backend expects a MySQL `projects` table matching the project model fields.

## Recommended Improvements

- Add CRUD buttons to project cards
- Add data validation and form feedback
- Add authentication for multi-user support

## License

No license is currently specified.
