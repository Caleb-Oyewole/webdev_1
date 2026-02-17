@echo off
echo Starting Houdy Backend and Frontend servers...
echo.

REM Start Backend
echo Starting Backend (Flask) on port 5000...
start cmd /k "cd back_end && pip install -r requirements.txt && python app.py"

REM Wait a bit for backend to start
timeout /t 3 /nobreak

REM Start Frontend
echo Starting Frontend (HTTP Server) on port 8000...
start cmd /k "cd front_end && python -m http.server 8000"

echo.
echo Both servers should be running now!
echo Frontend: http://localhost:8000
echo Backend API: http://localhost:5000/api
echo.
pause
