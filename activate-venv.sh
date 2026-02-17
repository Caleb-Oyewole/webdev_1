#!/bin/bash
# Activate Virtual Environment for Houdy Backend
echo "Activating Python Virtual Environment..."
cd back_end
source venv/Scripts/activate
echo ""
echo "Virtual Environment activated!"
python --version
echo ""
echo "To deactivate, type: deactivate"
bash
