# Houdy Backend - API Server

This is the backend server for the Houdy student accommodation platform.

## Features

- **Authentication**: User login and signup
- **Listings Management**: View, search, and filter apartment listings
- **Bookings**: Create and manage apartment bookings
- **Statistics**: Platform statistics (listings count, students count, etc.)

## Installation

### Prerequisites
- Python 3.7+
- pip (Python package manager)

### Setup Steps

1. Navigate to the backend folder:
```bash
cd back_end
```

2. Install required packages:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
python app.py
```

The server will start at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - Create new account

### Listings
- `GET /api/listings/all` - Get all listings
- `GET /api/listings/search?location=<location>&type=<type>` - Search listings
- `GET /api/listings/<id>` - Get listing details
- `POST /api/listings` - Create new listing

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/<user_id>` - Get user bookings

### Statistics
- `GET /api/stats` - Get platform stats
- `GET /api/health` - Health check

## Running Frontend & Backend

**Terminal 1 (Backend):**
```bash
cd back_end
pip install -r requirements.txt
python app.py
```

**Terminal 2 (Frontend):**
```bash
cd front_end
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Database

Currently uses in-memory storage. For production, replace with:
- SQLite
- PostgreSQL
- MongoDB

## Notes

- CORS is enabled for frontend communication
- All endpoints return JSON responses
- Default testing credentials: email: john@example.com, password: 123456
