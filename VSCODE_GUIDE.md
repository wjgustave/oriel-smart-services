# ================================================
# ORIEL SMART SERVICES - VS CODE DEPLOYMENT GUIDE
# ================================================

## STEP 1: SETUP IN VS CODE
## =========================

### 1.1 Extract and Open Project

1. Download and extract `oriel-deploy.zip` to a folder (e.g., Desktop or Documents)
2. Open VS Code
3. Go to: File → Open Folder → Select the `oriel-deploy` folder
4. Click "Select Folder"

You should see the project files in the left sidebar (Explorer panel).


### 1.2 Open the Terminal

In VS Code:
- Press: Ctrl + ` (backtick key, below Escape)
- Or go to: View → Terminal

The terminal opens at the bottom of VS Code.


### 1.3 Install Dependencies

In the VS Code terminal, type:

    npm install

Wait for it to finish (takes 30-60 seconds).


### 1.4 Test Locally

In the terminal, type:

    npm run dev

- VS Code will show a link like: http://localhost:3000
- Ctrl+Click the link to open in your browser
- You should see the Oriel infographic!
- Press Ctrl+C in terminal to stop the server when done testing


## STEP 2: PUSH TO GITHUB
## =======================

### Option A: Using VS Code's Built-in Git (Easiest)

#### 2A.1 First, create a GitHub repository:

1. Go to https://github.com/new in your browser
2. Repository name: oriel-smart-services
3. Keep it Public or Private (your choice)
4. Do NOT check "Add a README file"
5. Click "Create repository"
6. Keep this page open - you'll need the URL


#### 2A.2 Initialize Git in VS Code:

1. Click the Source Control icon in the left sidebar (branch icon, or press Ctrl+Shift+G)
2. Click "Initialize Repository" button
3. You'll see all files listed as changes


#### 2A.3 Commit your code:

1. In the Source Control panel, you'll see a text box at the top
2. Type a message: Initial commit - Oriel Smart Services
3. Click the checkmark (✓) above the text box, or press Ctrl+Enter
4. If prompted, click "Yes" to stage all changes


#### 2A.4 Connect to GitHub:

1. Click the "..." menu in Source Control panel
2. Select "Remote" → "Add Remote..."
3. Paste your GitHub repository URL:
   https://github.com/YOUR_USERNAME/oriel-smart-services.git
4. When prompted for a name, type: origin


#### 2A.5 Push to GitHub:

1. Click the "..." menu in Source Control panel
2. Select "Push"
3. If prompted, select "origin" and "main"
4. If asked to sign in to GitHub, follow the prompts

Your code is now on GitHub!


### Option B: Using Terminal Commands

In the VS Code terminal, run these commands one by one:

    git init
    git add .
    git commit -m "Initial commit - Oriel Smart Services"
    git remote add origin https://github.com/YOUR_USERNAME/oriel-smart-services.git
    git branch -M main
    git push -u origin main

If prompted, sign in to GitHub.


## STEP 3: DEPLOY TO HEROKU
## =========================

### 3.1 Install Heroku CLI

Download and install from: https://devcenter.heroku.com/articles/heroku-cli

- Windows: Download the installer and run it
- Mac: Download the installer or run: brew install heroku/brew/heroku

After installing, RESTART VS Code to refresh the terminal.


### 3.2 Login to Heroku

In VS Code terminal:

    heroku login

- Press any key when prompted
- A browser window opens - log in to your Heroku account
- Return to VS Code when done


### 3.3 Create Heroku App

In VS Code terminal:

    heroku create oriel-smart-services

Note: If that name is taken, try:
    heroku create oriel-infographic-2024
    
Or let Heroku generate a name:
    heroku create


### 3.4 Deploy to Heroku

In VS Code terminal:

    git push heroku main

Wait 1-2 minutes for deployment.


### 3.5 Open Your Live Site

In VS Code terminal:

    heroku open

Your browser will open with your live infographic! 🎉


## STEP 4: ALTERNATIVE - DEPLOY TO VERCEL (Easier)
## =================================================

If Heroku feels complex, Vercel is simpler:

### 4.1 Install Vercel

In VS Code terminal:

    npm install -g vercel


### 4.2 Deploy

In VS Code terminal:

    vercel

Follow the prompts:
- "Set up and deploy?" → Y
- "Which scope?" → Select your account
- "Link to existing project?" → N
- "Project name?" → oriel-smart-services (or press Enter)
- "Directory?" → ./ (press Enter)
- "Override settings?" → N

Wait 30-60 seconds. Vercel gives you a live URL!


### 4.3 Deploy to Production

    vercel --prod

Done! Your site is live.


## RECOMMENDED VS CODE EXTENSIONS
## ===============================

Click the Extensions icon (4 squares) in the left sidebar, then search and install:

1. **GitHub Pull Requests and Issues** - Easier GitHub integration
2. **Heroku** - Deploy from VS Code sidebar
3. **ES7+ React/Redux/React-Native snippets** - Code helpers
4. **Tailwind CSS IntelliSense** - CSS autocomplete
5. **Prettier** - Code formatting


## TROUBLESHOOTING
## ================

### "npm not found"
- Install Node.js from https://nodejs.org (LTS version)
- Restart VS Code after installing

### "git not found"
- Install Git from https://git-scm.com
- Restart VS Code after installing

### "heroku not found" after installing
- Restart VS Code
- On Windows, you may need to restart your computer

### GitHub authentication issues
- Go to: View → Command Palette (Ctrl+Shift+P)
- Type: "GitHub: Sign In"
- Follow the prompts

### Heroku push fails
- Make sure all files are committed:
    git add .
    git commit -m "Update"
- Then try pushing again:
    git push heroku main


## UPDATING YOUR SITE LATER
## =========================

After making changes to the code:

### Save to GitHub:
1. Make your changes in VS Code
2. Go to Source Control (Ctrl+Shift+G)
3. Type a commit message
4. Click the checkmark (✓)
5. Click "..." → "Push"

### Update Heroku:
In terminal:
    git push heroku main

### Update Vercel:
In terminal:
    vercel --prod


## QUICK REFERENCE COMMANDS
## =========================

    npm install          # Install dependencies
    npm run dev          # Run locally
    npm run build        # Build for production
    
    git add .            # Stage all changes
    git commit -m "msg"  # Commit changes
    git push             # Push to GitHub
    git push heroku main # Push to Heroku
    
    heroku logs --tail   # View Heroku logs
    heroku open          # Open Heroku app
    
    vercel               # Deploy to Vercel
    vercel --prod        # Deploy to production


## SUMMARY: FASTEST PATH
## =====================

1. Open folder in VS Code
2. Terminal: npm install
3. Terminal: npm run dev (test locally)
4. Terminal: npx vercel (deploy instantly)

That's it - your site is live in under 5 minutes!
