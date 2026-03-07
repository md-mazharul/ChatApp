# Connect Backend + Frontend

This project is a real-time chat system with:
- Python Flask + Socket.IO backend
- React frontend clients (`Alex` and `Bob`)
- MySQL message storage

## Project Structure

- `server/server.py` - Backend Socket.IO server (port `5000`)
- `dataStore/dataStore.py` - MySQL setup + message save logic
- `Alex/` - React client app
- `Bob/` - React client app

## Prerequisites

- Python 3.10+
- Node.js + npm
- MySQL running locally

## 1) Run Backend

From the project root:

```powershell
cd "\"
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m server.server
```

Backend URL: `http://localhost:5000`

## 2) Run Frontend (Choose One)

### Option A: Alex

```powershell
cd "\Alex"
npm install
npm start
```

### Option B: Bob

```powershell
cd "\Bob"
npm install
npm start
```

Frontend URLs: `http://localhost:3001` (Alex), `http://localhost:3002` (Bob)

## Database Configuration

Current MySQL config in `dataStore/dataStore.py`:

- `host`: `localhost`
- `user`: `chatuser`
- `password`: `1234`
- `database`: `chat`

Make sure this MySQL user exists and MySQL server is running.

## Troubleshooting

### `ModuleNotFoundError: No module named 'dataStore'`

Use module mode to start backend:

```powershell
python -m server.server
```

### `npm ERR! enoent ... package.json`

Run npm in the frontend folder that contains `package.json` (`Alex` or `Bob`), not in project root.

## Quick Start Checklist

1. Start MySQL.
2. Start backend: `python -m server.server`
3. Start one frontend: `npm start` in `Alex` or `Bob`
4. Open `http://localhost:3001` for Alex or `http://localhost:3002` for Bob

