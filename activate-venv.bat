@echo off
REM Activate Virtual Environment for Houdy Backend
echo Activating Python Virtual Environment...
cd back_end
call venv\Scripts\activate.bat
echo.
echo Virtual Environment activated!
echo Python: %python%
python --version
echo.
echo To deactivate, type: deactivate
cmd /k
