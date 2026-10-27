# PROJECT REBOOT
### *Your Personal Operating System for JEE, Discipline, Fitness, Music & Self-Improvement*
### **Built by rohitt**

---

## 🚀 Key Highlights & PWA Features

1. **100% User-Customizable, Zero Prefilled Data**:
   - The OS opens with a pristine, futuristic cyber dashboard. Zero fake scores, zero artificial chapter check-ins. You build your own syllabus and records from day one.
2. **Production-Ready Windows Desktop App (PWA)**:
   - Standalone window mode with custom title bar and zero browser clutter.
   - PWA Web App Manifest (`manifest.webmanifest`) with 192x192, 512x512, and maskable icons.
   - Pre-mount futuristic loading screen: `PROJECT REBOOT • INITIALIZING TELEMETRY • BUILT BY ROHITT`.
3. **Offline App-Shell Caching**:
   - Service Worker (`sw.js`) precaches the app shell and fonts.
   - Zero-server requirement: Operates fully offline after the first visit.
4. **Dual Local Persistence (IndexedDB + LocalStorage Vault)**:
   - Synchronous LocalStorage writes + indestructible asynchronous IndexedDB transactions.
   - Closing, refreshing, or restarting Windows does not erase your logs.
   - JSON Backup Export and Import for complete data portability.
5. **Zero Private Data Caching**:
   - The Service Worker caches *only* public shell assets (HTML, CSS, JS, icons). Personal tracking logs remain strictly private inside local device storage.
6. **Synthesized Web Audio Focus Studio**:
   - 4 built-in ambient generators (Binaural Theta 6Hz, Gentle Rain, Deep Brown Noise, White Noise) synthesized directly in the browser via Web Audio API.

---

## 🖥️ How to Install on Windows Desktop

### Method 1: Google Chrome / Microsoft Edge PWA (Recommended)
1. Open the application in Google Chrome or Microsoft Edge (`http://localhost:5173` or your deployed URL).
2. Look at the right side of the URL address bar:
   - In **Chrome**: Click the **"Install PROJECT REBOOT"** monitor icon.
   - In **Edge**: Click the **"App available. Install PROJECT REBOOT"** icon.
   - Or click the glowing **"Install App"** button inside the app header / sidebar.
3. In the confirmation dialog, check:
   - ✅ *Pin to taskbar*
   - ✅ *Create desktop shortcut*
4. Click **Install**. PROJECT REBOOT will now launch as a dedicated native-like desktop window with its own taskbar icon and offline capability!

---

## 🌐 100% Free Cloud Deployment Guide

### Option A: Cloudflare Pages (Recommended - Fastest & Unlimited)
1. Push your repository to GitHub or GitLab.
2. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Select your repository and configure build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Click **Save and Deploy**. Your PWA is live with free HTTPS and automatic worldwide CDN distribution.

### Option B: Vercel (1-Click Free Deploy)
1. Install Vercel CLI (`npm i -g vercel`) or visit [vercel.com](https://vercel.com).
2. Connect your repository.
3. Vercel automatically detects the Vite framework:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**. Your custom comeback OS is deployed.

---

## 📦 Optional: Packaging as a Windows Native `.EXE` with Tauri

If you wish to create a standalone Windows `.exe` / `.msi` installer:

1. **Install Prerequisites**:
   - Install [Rust & Cargo](https://rustup.rs/) (default toolchain).
   - Install the Microsoft C++ Build Tools (via Visual Studio Installer).

2. **Add Tauri to the project**:
   ```bash
   npm install -D @tauri-apps/cli
   npx tauri init
   ```
   When prompted:
   - App name: `PROJECT REBOOT`
   - Window title: `PROJECT REBOOT — Comeback OS`
   - Web assets location: `../dist`
   - Dev server URL: `http://localhost:5173`

3. **Build the Native Windows Installer**:
   ```bash
   npm run build
   npx tauri build
   ```
   This generates an optimized native Windows installer `.msi` and executable in `src-tauri/target/release/bundle/msi/`.

---

## 💻 Local Development Commands

```powershell
# Install dependencies
npm install

# Run local development server
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---
*PROJECT REBOOT — Built by **rohitt***
