#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../server"
echo "Installing dependencies..."
npm install
echo "Initializing database..."
node -e "import('./db.js').then(m => m.init())"
echo "Setup complete. Run './scripts/start.sh' to launch."
