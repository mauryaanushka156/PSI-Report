#!/bin/bash

echo "================================================"
echo "  QC Inspection Report PWA - Quick Start"
echo "================================================"
echo ""
echo "Starting local web server..."
echo ""
echo "The app will open in your browser at:"
echo "http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo "================================================"
echo ""

python3 -m http.server 8000
