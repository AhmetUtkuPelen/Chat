#!/usr/bin/env bash
# Exit on error
set -e

# Navigate to the frontend directory and build
cd frontend
npm install
npm run build

# Navigate back to root and install backend dependencies
cd ..
cd backend
npm install

# Copy frontend build to backend public folder (if needed)
mkdir -p public
cp -r ../frontend/dist/* public/