# 👁️ Oriel Smart Services Infographic

An interactive infographic demonstrating how patients and clinicians will interact with the new Oriel Eye Care Centre at St Pancras and its digital systems.

![Oriel Smart Services](https://img.shields.io/badge/Oriel-Smart%20Services-06b6d4?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2-61dafb?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff?style=flat-square&logo=vite)

## 🏥 About

This interactive infographic serves as a communication and engagement tool for the Oriel programme, illustrating:

- **Patient Journeys**: Outpatient, surgical, and emergency pathways
- **Clinician Workflows**: Daily operations and digital touchpoints
- **Student Experience**: UCL education and clinical placement flows
- **Smart Systems**: Six core digital capabilities that power the building
- **Building Overview**: 11 levels of integrated care, research, and education

## ✨ Features

- 🗺️ **Interactive Journey Maps** - Step-by-step navigation through user journeys
- 🏢 **Building Explorer** - Click any floor to see detailed information
- ⚙️ **Smart Systems Deep-Dive** - Expandable cards showing features and integrations
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Modern UI** - Glass morphism, smooth animations, and accessible design

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Git

### Local Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/oriel-smart-services.git
cd oriel-smart-services

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview  # Preview the production build locally
```

---

## 📤 Deployment Guide

### Option 1: Deploy to Heroku

#### Step 1: Install Heroku CLI

```bash
# macOS
brew tap heroku/brew && brew install heroku

# Windows (use installer)
# Download from: https://devcenter.heroku.com/articles/heroku-cli

# Ubuntu/Debian
curl https://cli-assets.heroku.com/install.sh | sh
```

#### Step 2: Login to Heroku

```bash
heroku login
```

#### Step 3: Create Heroku App

```bash
# Create a new Heroku app (choose a unique name)
heroku create oriel-smart-services

# Or let Heroku generate a name
heroku create
```

#### Step 4: Deploy

```bash
# Make sure you're in the project directory with all files committed to git
git init  # If not already a git repo
git add .
git commit -m "Initial commit - Oriel Smart Services Infographic"

# Push to Heroku
git push heroku main

# Open the deployed app
heroku open
```

#### Heroku Environment (Optional)

```bash
# View logs
heroku logs --tail

# Check app status
heroku ps

# Restart the app
heroku restart
```

---

### Option 2: Deploy to GitHub Pages (Free Static Hosting)

#### Step 1: Update vite.config.js

Add your repository name as the base path:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/oriel-smart-services/', // Your repo name
  build: {
    outDir: 'dist',
  },
})
```

#### Step 2: Install gh-pages

```bash
npm install --save-dev gh-pages
```

#### Step 3: Add Deploy Script to package.json

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

#### Step 4: Deploy

```bash
npm run deploy
```

Your site will be available at: `https://YOUR_USERNAME.github.io/oriel-smart-services/`

---

### Option 3: Deploy to Vercel (Recommended for Simplicity)

#### Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

#### Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub repository
4. Vercel auto-detects Vite and deploys

---

### Option 4: Deploy to Netlify

#### Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

#### Using Netlify Dashboard

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `dist` folder after running `npm run build`
3. Or connect your GitHub repo for automatic deploys

---

## 🔧 GitHub Repository Setup

### Step 1: Create Repository on GitHub

1. Go to [github.com/new](https://github.com/new)
2. Name it `oriel-smart-services`
3. Keep it public or private as needed
4. Don't initialize with README (we have one)

### Step 2: Push Your Code

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Oriel Smart Services Infographic"

# Add remote origin
git remote add origin https://github.com/YOUR_USERNAME/oriel-smart-services.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Actions (Optional - for CI/CD)

Create `.github/workflows/deploy.yml` for automatic deployments.

---

## 📁 Project Structure

```
oriel-smart-services/
├── public/
│   └── favicon.svg          # App favicon
├── src/
│   ├── App.jsx               # Main infographic component
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles & Tailwind
├── .gitignore
├── index.html                # HTML template
├── package.json              # Dependencies & scripts
├── Procfile                  # Heroku process file
├── postcss.config.js         # PostCSS config
├── server.js                 # Express server for Heroku
├── tailwind.config.js        # Tailwind configuration
├── vite.config.js            # Vite build configuration
└── README.md                 # This file
```

---

## 🎨 Customisation

### Changing Colours

Edit `tailwind.config.js` or modify the colour values in `src/App.jsx`:

```javascript
// Primary colours used
cyan: '#0891B2'    // Outpatient, Clinical
violet: '#7C3AED'  // Clinician, Private
rose: '#DC2626'    // Surgical, Emergency
emerald: '#059669' // Student, Research
```

### Adding New Journeys

In `src/App.jsx`, add to the `journeys` object:

```javascript
const journeys = {
  // ... existing journeys
  newJourney: {
    title: 'New Journey Name',
    icon: '🆕',
    color: '#hexcolor',
    gradient: 'from-color-500 to-color-600',
    persona: 'Persona Name',
    description: 'Journey description',
    steps: [
      {
        id: 'step1',
        title: 'Step Title',
        location: 'Location',
        time: '09:00',
        physical: 'Physical description',
        digital: ['Digital feature 1', 'Digital feature 2'],
        background: ['Background system 1'],
        icon: '📍'
      }
    ]
  }
};
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## 📄 Licence

This project is proprietary to Moorfields Eye Hospital NHS Foundation Trust, UCL Institute of Ophthalmology, and Moorfields Eye Charity.

---

## 🏛️ Partners

- **Moorfields Eye Hospital NHS Foundation Trust**
- **UCL Institute of Ophthalmology**
- **Moorfields Eye Charity**

---

<p align="center">
  <strong>Oriel Smart Services</strong><br>
  <em>Where Eye Care Meets Innovation</em><br>
  Opening 2027
</p>
