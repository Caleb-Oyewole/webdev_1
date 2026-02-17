# 🏠 Houdy - Student Accommodation Platform

A modern, full-stack web application for discovering and booking student accommodations. Built with Flask backend and vanilla JavaScript frontend.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-brightgreen)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## ✨ Features

### Frontend
- 🎨 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🔐 **User Authentication** - Login & signup with modals
- 🔍 **Advanced Search** - Filter apartments by location and type
- 📱 **Modern UI** - Smooth animations and transitions

### Backend
- ⚡ **REST API** - Fast Flask server with CORS support
- 🔐 **Authentication** - User login and signup
- 🏢 **Listings Management** - Full CRUD operations
- 🔎 **Search & Filter** - Advanced filtering capabilities
- 📅 **Booking System** - Create and manage bookings
- 📈 **Statistics** - Real-time platform metrics

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3 (Tailwind), JavaScript (ES6+)
- Fetch API for HTTP requests

### Backend
- Python 3.8+, Flask 2.3.0, Flask-CORS 4.0.0

## 📁 Project Structure

```
houdy/
├── front_end/
│   ├── index.html              # Main HTML page
│   ├── style.css               # Styling & animations
│   ├── script.js               # Frontend logic
│   └── README.md               # Frontend docs
├── back_end/
│   ├── app.py                  # Flask application
│   ├── requirements.txt         # Python dependencies
│   ├── venv/                   # Virtual environment
│   └── README.md               # Backend docs
├── README.md                   # This file
├── VENV_SETUP.md              # Virtual environment guide
├── activate-venv.bat          # Windows venv activation
├── activate-venv.sh           # Bash venv activation
├── run_all.py                 # Python startup script
└── start-servers.bat          # Windows startup script
```

## Quick Start

### Prerequisites
- Python 3.7+
- Any modern web browser

### Installation & Running

#### Option 1: Two Terminal Windows (Recommended)

**Terminal 1 - Backend Server:**
```bash
cd back_end
pip install -r requirements.txt
python app.py
```

**Terminal 2 - Frontend Server:**
```bash
cd front_end
python -m http.server 8000
```

Then visit: `http://localhost:8000`

#### Option 2: Using the start script (Windows)

```bash
start-servers.bat
```

#### Option 3: Automatic (if available)

```bash
python run_all.py
```

## 📡 API Documentation

### Base URL: `http://localhost:5000/api`

### Auth Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - Create account

### Listings Endpoints
- `GET /api/listings/all` - Get all listings
- `GET /api/listings/search?location=X&type=Y` - Search listings
- `GET /api/listings/<id>` - Get listing details
- `POST /api/listings` - Create listing

### Bookings Endpoints
- `POST /api/bookings` - Create booking
- `GET /api/bookings/<user_id>` - Get user bookings

### Other
- `GET /api/stats` - Platform statistics
- `GET /api/health` - Health check

### Test Credentials
- **Email:** john@example.com
- **Password:** 123456

## 👨‍💻 Development

### Adding Features
1. Create UI in `front_end/index.html`
2. Add styles in `front_end/style.css`
3. Add handlers in `front_end/script.js`
4. Create API endpoint in `back_end/app.py`
5. Test end-to-end

### Code Standards
- **HTML**: Semantic tags, proper indentation
- **CSS**: Tailwind classes, organized sections
- **JS**: ES6+, meaningful names, comments
- **Python**: PEP 8, type hints

## 🔧 Troubleshooting

### Backend won't start
```bash
python --version  # Check Python 3.8+
pip list | grep Flask  # Verify installation
```

### Frontend won't load
- Verify backend runs on port 5000
- Check console (F12) for errors
- Verify API_URL in script.js

### CORS errors
- Backend has CORS enabled by default
- Check frontend API_URL matches backend

### Port already in use
```bash
# Change backend port in back_end/app.py
app.run(port=5001)

# Change frontend port
python -m http.server 8001 -d front_end
```

### Virtual environment issues
```bash
python -m venv back_end/venv
source back_end/venv/Scripts/activate
pip install -r back_end/requirements.txt
```

## 📚 Documentation

- [Frontend Details](front_end/README.md)
- [Backend Details](back_end/README.md)
- [Virtual Environment Setup](VENV_SETUP.md)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push branch (`git push origin feature/amazing`)
5. Open Pull Request

## 📝 License

MIT License - See LICENSE file for details

## 📞 Support

- 📧 Email: support@houdy.com
- 💬 GitHub Discussions
- 🐛 Report issues on GitHub

## 🗺️ Roadmap

- [ ] Database integration (PostgreSQL)
- [ ] Image uploads
- [ ] Advanced search filters
- [ ] Review system
- [ ] Payment integration
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Mobile app
- [ ] Real-time messaging
- [ ] Analytics

---

**Made with ❤️ for students everywhere**

*Last Updated: February 17, 2025*
