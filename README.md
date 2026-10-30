# StudioSpace — Peer-to-Peer Creative Workspace & Production Studio Sharing Platform 📽️🎬

[![Live Website](https://img.shields.io/badge/Live%20Demo-StudioSpace%20Platform-orange.svg)](https://studiospace-platform.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Stack-Next.js%2016%20%7C%20Express%20%7C%20MongoDB-blue.svg)](#tech-stack)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**StudioSpace** is a high-performance peer-to-peer creative workspace marketplace engineered for filmmakers, commercial photographers, podcast hosts, and recording artists. Studio owners and production facilities can list cyclorama lofts, sound stages, acoustic suites, and artisan workshops with custom hourly rates, security deposits, and capacity limits. Fellow creators can discover, inspect specifications, check live slot availability, and reserve time windows with instant collision detection and transparent pricing.

---

## 🌐 Live Website & Repositories

- **Live Application URL**: [https://studiospace-platform.vercel.app](https://studiospace-platform.vercel.app)
- **Client-Side Repository**: [StudioSpace Client Repository](https://github.com/razzak-dev007/studiospace-client)
- **Server-Side Repository**: [StudioSpace Server Repository](https://github.com/razzak-dev007/studiospace-server)

---

## 🔑 Examiner Test Credentials

Examiners can immediately test authenticated host and creator workflows using the pre-seeded account or by clicking the **"Auto Fill"** button directly on the Login page:

| Role | Email Address | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Verified Host / Creator** | `alex.creator@studiospace.io` | `Studio@2026` | Full listing management, add studio, update, delete, booking, and invoice access |
| **Social Login** | *One-click "Continue with Google"* | *Instant OAuth* | Immediate creator onboarding with zero setup |

> **Note**: As specified in the assignment requirements, email verification and password reset flows are intentionally disabled during evaluation so examiners can access test accounts seamlessly without email friction.

---

## ✨ Key Platform Features

* **Interactive Hero Banner Slider**: High-resolution showcase slider with 3 production environments (Photo Cyc Walls, Cinema Sound Stages, Dolby Atmos Suites), custom autoplay timers, pause-on-hover, and direct action CTAs.
* **Dynamic MongoDB Studio Directory & Featured Showcase**: Dynamic MongoDB querying using `.limit(6)` for the home page, with full directory filtering on `/studios` supporting keyword search, category pills, live price range sliders, and multi-field sorting.
* **Challenge 1 — JWT Security with HTTPOnly Cookies**: Fully secured backend mutations (`POST /api/studios`, `PUT /api/studios/:id`, `DELETE /api/studios/:id`, `POST /api/bookings`) with JSON Web Tokens stored in HTTPOnly cookies, strictly preventing XSS exposure and rejecting unauthorized requests with 401 Unauthorized.
* **Challenge 2 — Real-Time Double-Booking Collision Prevention**: Mathematical interval overlap verification `(startA < endB && endA > startB)` in MongoDB against existing Confirmed and Pending slots, preventing double-booking and returning clear error messages.
* **Challenge 3 — Full System Dark & Light Theme Customization**: Smooth theme toggling button in the navbar that alters the entire platform theme using CSS variables and `.dark` styling, persisting across sessions in `localStorage`.
* **Optional Feature 1 — PDF Booking Invoice Generator**: Downloadable, beautifully formatted PDF production receipts generated directly in the browser using `jsPDF` for accounting and records.
* **Optional Feature 2 — MongoDB Saved Studios Wishlist**: Logged-in creators can save favorite creative spaces with persistent MongoDB toggling and reactive heart badges.
* **Zero Browser `alert()` Usage**: Standardized user feedback across all actions via modern Sonner toast notifications and custom modal dialogs.
* **Zero-Flicker Session Persistence**: Private routes and user state remain fully preserved on page reload without unexpected redirects to login.

---

## 🛠️ Tech Stack

### Client-Side (Frontend)
- **Framework**: Next.js 16 (App Router with TypeScript)
- **Styling**: Tailwind CSS v4, Lucide React Icons
- **Notifications**: Sonner Toast Components
- **PDF Generation**: jsPDF
- **Confetti Effects**: canvas-confetti
- **State & Theme**: React Context API (`AuthContext`, `ThemeContext`)

### Server-Side (Backend)
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB (Official Native Driver v6)
- **Resilient Fallback**: Automated `mongodb-memory-server` fallback for zero-configuration local evaluation if no live MongoDB daemon is running
- **Authentication**: JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, `cookie-parser`
- **Security & CORS**: Secure cookie handling with CORS credentials support

---

## 🚀 Local Development Setup Instructions

### 1. Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- Git

### 2. Server Setup & Startup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Start server in development mode (auto-seeds 8 studios & examiner test user!)
npm run dev
```
> The server will start on `http://localhost:5000`. If local MongoDB is not running, it automatically spins up an in-memory MongoDB instance with pre-seeded data!

### 3. Client Setup & Startup
In a separate terminal:
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start Next.js development server
npm run dev
```
> Open your browser at `http://localhost:3000`.

---

## 📜 Submission Details

- **Client Commits**: 24 notable commits in client git history.
- **Server Commits**: 9 notable commits in server git history.
- **No Lorem Ipsum**: Realistic, professional photography and cinema studio descriptions.
- **Responsive**: Fully responsive across mobile, tablet, laptop, and ultra-wide displays.
