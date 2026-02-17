#!/usr/bin/env python3
"""
Houdy Platform - Start Script
Runs both backend and frontend servers simultaneously
"""

import subprocess
import sys
import time
import os

def start_backend():
    """Start the Flask backend server"""
    print("Starting Backend Server (Flask)...")
    backend_path = os.path.join(os.path.dirname(__file__), 'back_end')
    
    try:
        # Install requirements
        subprocess.run([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'], 
                      cwd=backend_path, check=True)
        # Start backend
        subprocess.Popen([sys.executable, 'app.py'], cwd=backend_path)
        print("✓ Backend started on http://localhost:5000")
    except Exception as e:
        print(f"✗ Error starting backend: {e}")
        return False
    return True

def start_frontend():
    """Start the HTTP server for frontend"""
    print("Starting Frontend Server (HTTP)...")
    frontend_path = os.path.join(os.path.dirname(__file__), 'front_end')
    
    try:
        subprocess.Popen([sys.executable, '-m', 'http.server', '8000'], 
                        cwd=frontend_path)
        print("✓ Frontend started on http://localhost:8000")
    except Exception as e:
        print(f"✗ Error starting frontend: {e}")
        return False
    return True

if __name__ == '__main__':
    print("=" * 50)
    print("Houdy Platform - Full Stack Startup")
    print("=" * 50)
    print()
    
    # Start both servers
    backend_ok = start_backend()
    time.sleep(2)
    frontend_ok = start_frontend()
    
    print()
    print("=" * 50)
    if backend_ok and frontend_ok:
        print("✓ All servers running!")
        print()
        print("Frontend: http://localhost:8000")
        print("Backend:  http://localhost:5000/api")
        print()
        print("Press Ctrl+C to stop")
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            print("\nShutting down...")
    else:
        print("✗ Error starting servers. Check the output above.")
    print("=" * 50)
