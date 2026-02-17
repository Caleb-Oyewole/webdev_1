# Virtual Environment Setup - Complete Guide

## Virtual Environment Status ✅

A Python virtual environment has been created in `back_end/venv/` with all dependencies installed.

### Installed Packages:
- Flask 2.3.0
- Flask-CORS 4.0.0
- Werkzeug 2.3.0
- Jinja2 3.1.6
- click 8.3.1
- itsdangerous 2.2.0
- blinker 1.9.0
- MarkupSafe 3.0.3
- colorama 0.4.6

---

## How to Activate Virtual Environment

### Option 1: Windows (Command Prompt/PowerShell)

**Method A - Using batch script (Easiest):**
```bash
activate-venv.bat
```

**Method B - Manual activation:**
```bash
cd back_end
venv\Scripts\activate.bat
```

**Method C - PowerShell:**
```powershell
cd back_end
venv\Scripts\Activate.ps1
```

### Option 2: Linux/Mac/Git Bash

**Using bash script:**
```bash
source activate-venv.sh
```

**Manual activation:**
```bash
cd back_end
source venv/Scripts/activate
```

---

## Running the Project with Virtual Environment

### Full Startup (Both Frontend & Backend)

**Terminal 1 - Backend with venv:**
```bash
# Windows
activate-venv.bat
python app.py

# Linux/Mac
source activate-venv.sh
python app.py
```

**Terminal 2 - Frontend:**
```bash
cd front_end
python -m http.server 8000
```

### Quick Start Script

You can also use the existing startup script which now uses the venv:

**Windows:**
```bash
start-servers.bat
```

**Python (Cross-platform):**
```bash
python run_all.py
```

---

## Virtual Environment Commands

### Activate
```bash
# Windows Command Prompt
back_end\venv\Scripts\activate.bat

# Windows PowerShell
back_end\venv\Scripts\Activate.ps1

# Linux/Mac/Git Bash
source back_end/venv/Scripts/activate
```

### Deactivate
```bash
deactivate
```

### Install New Packages
```bash
# First activate the venv
source back_end/venv/Scripts/activate  # or appropriate activation command

# Then install
pip install package-name
```

### Update Requirements
```bash
# After installing new packages
pip freeze > back_end/requirements.txt
```

### View Installed Packages
```bash
pip list
```

---

## Project Structure with Virtual Environment

```
webdev_1/
├── back_end/
│   ├── venv/                    # Virtual environment (new)
│   │   ├── Scripts/             # Executable files
│   │   ├── Lib/                 # Installed packages
│   │   └── Include/             # Python headers
│   ├── app.py
│   ├── requirements.txt
│   └── README.md
├── front_end/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── activate-venv.bat            # Windows activation script (new)
├── activate-venv.sh             # Bash activation script (new)
├── README.md
├── run_all.py
└── start-servers.bat
```

---

## Benefits of Virtual Environment

✅ **Isolation** - Project dependencies don't affect system Python
✅ **Reproducibility** - Same environment across different machines
✅ **Version Control** - Easy to manage package versions
✅ **No Permission Issues** - Install packages without sudo
✅ **Clean System** - Keep your system Python clean

---

## Troubleshooting

### Virtual environment not activating?
- Check you're in the project root directory
- Verify the `venv` folder exists in `back_end/`
- Try using the full path: `back_end\venv\Scripts\activate.bat`

### Can't find python in venv?
- The venv might not have been created properly
- Try recreating: `python -m venv back_end/venv`
- Reinstall dependencies: `pip install -r back_end/requirements.txt`

### Permission denied error?
- On Linux/Mac: `chmod +x activate-venv.sh`
- Make sure you have read/write permissions to the folder

### Still having issues?
- Check if Python 3.7+ is installed: `python --version`
- Verify Flask installed: `pip list | grep Flask` (when venv is active)

---

## Next Steps

1. Activate the virtual environment using one of the methods above
2. Run the backend: `python back_end/app.py`
3. In a new terminal, run the frontend: `python -m http.server 8000 -d front_end`
4. Open `http://localhost:8000` in your browser

Happy coding! 🚀
