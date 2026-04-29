# Full Stack Application

## Structure
- `database/` - MySQL schema and seed data
- `server/` - Node.js + Express backend
- `client/` - React frontend

## Setup

### Database
```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

### Server
```bash
cd server
npm install
# Configure .env file
npm start
```

### Client
```bash
cd client
npm install
npm run dev
```

## Technologies
- Backend: Node.js, Express, MySQL
- Frontend: React, React Router, Vite
- Authentication: JWT
