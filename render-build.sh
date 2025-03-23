#!/usr/bin/env bash
# Exit on error
set -e

# Navigate to the frontend directory and build
cd frontend
npm install
npm install --save-dev terser
npm run build

# Navigate back to root and install backend dependencies
cd ..
cd backend
npm install
npm run build

# Create public directory if needed
mkdir -p public
cp -r ../frontend/dist/* public/
