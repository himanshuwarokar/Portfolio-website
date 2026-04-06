# MERN Portfolio Website

A complete MERN stack portfolio project with:

- Profile section (hero, about, skills)
- Projects section with add and delete support
- Contact form that stores messages in MongoDB
- Separate backend and frontend apps

## Project Structure

- `backend` - Node.js + Express + MongoDB APIs
- `frontend` - React + Vite UI

## Backend Setup

1. Open terminal in `backend`
2. Install dependencies:
   - `npm install`
3. Create `.env` from `.env.example` and set values:
   - `PORT=5000`
   - `MONGODB_URI=mongodb://127.0.0.1:27017/portfolio_db`
   - `CLIENT_URL=http://localhost:5173`
4. Run backend:
   - `npm run dev`

Backend runs at `http://localhost:5000`.

## Frontend Setup

1. Open terminal in `frontend`
2. Install dependencies:
   - `npm install`
3. Create `.env` from `.env.example` and set values:
   - `VITE_API_URL=http://localhost:5000/api`
4. Run frontend:
   - `npm run dev`

Frontend runs at `http://localhost:5173`.

## API Endpoints

- `GET /api/health` - health check
- `GET /api/profile` - fetch profile
- `PUT /api/profile` - update profile
- `GET /api/projects` - list projects
- `POST /api/projects` - create project
- `PUT /api/projects/:id` - update project
- `DELETE /api/projects/:id` - delete project
- `POST /api/messages` - submit contact message
- `GET /api/messages` - list messages

## Notes

- If backend is unavailable, frontend shows fallback demo project data.
- Make sure MongoDB is running before starting backend.

## Render + Vercel Deployment

Set these environment variables before deploying:

- Render (backend):
  - `MONGODB_URI=<your mongo uri>`
  - `CLIENT_URL=https://<your-vercel-domain>.vercel.app`
  - You can set multiple allowed frontend origins with commas:
  - `CLIENT_URL=https://<prod>.vercel.app,https://<preview>.vercel.app`
- Vercel (frontend):
  - `VITE_API_URL=https://<your-render-service>.onrender.com/api`

Important:

- Vite reads env variables at build time, so after changing `VITE_API_URL` you must redeploy frontend.
- If `CLIENT_URL` is wrong or missing, browser requests will fail with CORS errors.
