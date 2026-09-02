# Frontend README

This folder contains a Vite + React + Tailwind frontend scaffold for a banking app.

Key notes:
- API base is configured via VITE_API_BASE_URL (see .env.example)
- axios instance at src/api/axios.js automatically attaches Authorization: Bearer <token> from localStorage
- Use the TokenSwitcher in the navbar to paste/switch tokens quickly
- Debug Panel (right side) shows the last API response; pages also display raw JSON
- No route guards — all routes reachable for API testing
