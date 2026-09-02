# CyberBank Frontend

This is a Vite + React frontend for the intentionally vulnerable CyberBank lab application.

Requirements:
- Node 18+

Install and run:

1. cd frontend
2. npm install
3. npm run dev

The frontend expects the backend to run at http://localhost:4000/api (per the lab spec).

Important: This frontend is intentionally insecure for testing (uses dangerouslySetInnerHTML for support messages and transaction remarks, displays password hashes, accepts any file uploads, passes raw query params, etc.). Do not deploy to production.
