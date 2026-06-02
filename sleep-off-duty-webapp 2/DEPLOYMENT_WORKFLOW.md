name: Build & Deploy App

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install pnpm
        run: npm install -g pnpm@10.4.1
      
      - name: Install Dependencies
        working-directory: sleep-off-duty-webapp\ 2
        run: pnpm install --frozen-lockfile
      
      - name: Type Check
        working-directory: sleep-off-duty-webapp\ 2
        run: pnpm run check
      
      - name: Build App
        working-directory: sleep-off-duty-webapp\ 2
        run: pnpm run build
      
      - name: Verify Audio Files
        working-directory: sleep-off-duty-webapp\ 2
        run: |
          echo "Checking for audio assets..."
          if [ -d "dist/audio" ]; then
            echo "✓ Audio directory exists"
            find dist/audio -name "*.mp3" -type f | wc -l | xargs echo "Audio files:"
          else
            echo "⚠ No audio directory in dist"
          fi
      
      - name: Upload Build Artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-dist
          path: sleep-off-duty-webapp\ 2/dist/
          retention-days: 30
      
      - name: Deploy to GitHub Pages (Optional)
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./sleep-off-duty-webapp\ 2/dist
