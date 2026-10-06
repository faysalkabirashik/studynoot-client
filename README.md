<div align="center">

# 📚 StudyNook

### A full-stack study room booking platform for libraries and academic institutions

[![Live Demo](https://img.shields.io/badge/Live%20Demo-studynook--client--two.vercel.app-blue?style=for-the-badge&logo=vercel)](https://studynook-client-two.vercel.app)
[![Server](https://img.shields.io/badge/API%20Server-Render-46E3B7?style=for-the-badge&logo=render)](https://studynoot-server.onrender.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://mongodb.com)

</div>

---

## 🌐 Live Links

| Resource | URL |
|---|---|
| 🖥️ Frontend (Vercel) | https://studynook-client-two.vercel.app |
| ⚙️ Backend API (Render) | https://studynoot-server.onrender.com |
| 💻 Client Repository | https://github.com/faysalkabirashik/studynoot-client |
| 🗄️ Server Repository | https://github.com/faysalkabirashik/studynoot-server |

---

## 📌 About the Project

**StudyNook** is a full-stack web application that lets students discover, list, and book quiet study rooms in libraries or academic buildings. It features real-time conflict checking, secure JWT authentication, Google OAuth, and a live room board that shows today's schedule — all without page reloads.

> Built as an advanced full-stack assignment demonstrating end-to-end application development with modern technologies.

---

## ✨ Key Features

### 🏠 Home & Live Room Board
- Live study room schedule board showing **Open / Booked** slots for today
- Displays the 6 latest rooms with real-time availability
- Animated hero section with statistics, feature highlights, and testimonials

### 🔍 Room Browsing & Search
- Browse all listed study rooms with a rich card UI
- **Multi-filter search** — by room name, floor, hourly rate range, and amenities
- Amenity filters: Whiteboard, Projector, Wi-Fi, Power Outlets, Quiet Zone, Air Conditioning

### 📄 Room Details
- Full detail page with image, floor, capacity, hourly rate, and booking count
- Amenity badges and full description
- Owner controls (Edit / Delete) visible only to the room creator

### 📅 Booking System
- **Date + time slot picker** (08:00 – 20:00 in hourly slots)
- **Live cost calculator** — auto-computes total (hours × hourly rate)
- **Conflict detection** — server-side check prevents double-booking the same slot
- Optional special note to the room owner
- Booking cancellation (today or future only)

### 🔐 Authentication & Security
- **Email/Password** registration with bcrypt hashing
- **Google OAuth** via Firebase popup
- **JWT tokens** in HTTP-only cookies (never exposed to JavaScript)
- Google users can **set a password** from the Security tab to also enable email login
- Protected routes — unauthenticated users are redirected to login

### 👤 Profile Dashboard
Three-tab profile page:
- **Profile Info** — update display name and photo URL
- **Security** — change password; Google-only users see a "Set Password" first-time flow
- **Settings** — light/dark theme preference saved in localStorage

### 🌗 Dark / Light Mode
- System-aware theming with manual toggle in the navbar
- Persisted across sessions via localStorage

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI library with hooks |
| **React Router v7** | Client-side routing & protected routes |
| **Tailwind CSS v4** | Utility-first styling |
| **Vite 8** | Build tool & dev server |
| **Axios** | HTTP client with cookie credentials |
| **Firebase 12** | Google OAuth via popup |
| **Lucide React** | Icon library |
| **React Hot Toast** | Toast notifications |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express 5** | REST API server |
| **MongoDB Native Driver** | Database queries (no ORM/ODM) |
| **bcryptjs** | Password hashing (salt rounds: 10) |
| **jsonwebtoken** | JWT creation and verification |
| **cookie-parser** | HTTP-only cookie handling |
| **cors** | Cross-origin request control |
| **dotenv** | Environment variable management |

### Infrastructure
| Service | Role |
|---|---|
| **Vercel** | Frontend hosting + CDN (deployed via CLI, no git required) |
| **Render** | Backend Node.js hosting |
| **MongoDB Atlas** | Cloud-hosted database |
| **Firebase** | Google OAuth provider |

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────┐
│          Vercel (Frontend)               │
│   React SPA · Vite · Tailwind CSS        │
│   studynook-client-two.vercel.app        │
└────────────────┬────────────────────────┘
                 │  HTTPS + HTTP-only Cookie (JWT)
                 ▼
┌─────────────────────────────────────────┐
│          Render (Backend API)            │
│   Node.js · Express REST API             │
│   studynoot-server.onrender.com          │
│                                          │
│  /api/auth/*   Authentication routes     │
│  /api/rooms/*  Room CRUD routes          │
│  /api/bookings/* Booking routes          │
└────────────────┬────────────────────────┘
                 │  mongodb+srv://
                 ▼
┌─────────────────────────────────────────┐
│        MongoDB Atlas (Database)          │
│  Collections: users · rooms · bookings  │
└─────────────────────────────────────────┘
```

---

## 📁 Project Structure

### Client (`studynoot-client`)
```
src/
├── components/
│   ├── BookingModal.jsx    # Date/time/cost booking form
│   ├── HeroRoomBoard.jsx   # Live today's schedule board
│   ├── RoomCard.jsx        # Room listing card
│   ├── RoomForm.jsx        # Add/Edit room form
│   ├── Modal.jsx
│   ├── RoomGrid.jsx
│   └── Spinner.jsx
├── context/
│   ├── AuthContext.jsx     # JWT auth + localStorage session cache
│   ├── ScheduleContext.jsx # Room schedule with stale-while-revalidate cache
│   └── ThemeContext.jsx
├── pages/
│   ├── Home.jsx            # Hero + live board + room grid
│   ├── Rooms.jsx           # Browse + filter all rooms
│   ├── RoomDetails.jsx     # Single room + booking flow
│   ├── AddRoom.jsx
│   ├── MyListings.jsx
│   ├── MyBookings.jsx
│   ├── Profile.jsx         # 3-tab dashboard
│   ├── Login.jsx
│   ├── Register.jsx
│   └── NotFound.jsx
├── utils/
│   ├── api.js              # Axios instance (credentials + timeout)
│   ├── constants.js        # Amenities list, time slots
│   └── scheduleHelpers.js
└── App.jsx                 # Routes with React.lazy code splitting
```

### Server (`studynoot-server`)
```
index.js      # All routes, middleware, and MongoDB logic in one file
seeds/
└── seedRooms.js    # Database seed script
```

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js 18+
- A [MongoDB Atlas](https://cloud.mongodb.com) free account (M0 cluster)
- A [Firebase](https://console.firebase.google.com) project with Google Auth enabled

### 1. Clone repositories

```bash
git clone https://github.com/faysalkabirashik/studynoot-server.git
git clone https://github.com/faysalkabirashik/studynoot-client.git
```

### 2. Server setup

```bash
cd studynoot-server
npm install
```

Create `.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/
DB_NAME=studynook
JWT_SECRET=your_secret_key_min_32_chars
CLIENT_URL=http://localhost:5173
NODE_ENV=development
COOKIE_SAMESITE=lax
```

```bash
npm run dev      # nodemon watch mode
```

### 3. Client setup

```bash
cd studynoot-client
npm install
```

Create `.env.local`:
```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_app_id
```

```bash
npm run dev      # http://localhost:5173
```

---

## 🔑 Environment Variables Reference

### Client (Vercel)
| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |
| `VITE_FIREBASE_API_KEY` | Firebase project API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |

### Server (Render)
| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas SRV connection string |
| `DB_NAME` | Database name |
| `JWT_SECRET` | Long random secret for signing tokens |
| `CLIENT_URL` | Comma-separated allowed CORS origins |
| `NODE_ENV` | Set to `production` on Render |
| `COOKIE_SAMESITE` | Set to `none` for cross-domain cookies |

---

## 📡 REST API Reference

### Auth Routes
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | ❌ | Register with name, email, photo, password |
| `POST` | `/api/auth/login` | ❌ | Login — sets JWT cookie |
| `POST` | `/api/auth/google` | ❌ | Google OAuth upsert — sets JWT cookie |
| `POST` | `/api/auth/logout` | ✅ | Clears JWT cookie |
| `GET` | `/api/auth/me` | ✅ | Get current user (reads JWT cookie) |
| `PATCH` | `/api/auth/profile` | ✅ | Update name and photo |
| `PATCH` | `/api/auth/password` | ✅ | Change password (or first-time set for Google users) |

### Room Routes
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/rooms` | ❌ | List rooms (search, floor, rate, amenity filters) |
| `GET` | `/api/rooms/latest` | ❌ | Latest 6 rooms + today's board schedule |
| `GET` | `/api/rooms/:id` | ❌ | Single room detail |
| `POST` | `/api/rooms` | ✅ | Create a new room listing |
| `PATCH` | `/api/rooms/:id` | ✅ (owner only) | Update room |
| `DELETE` | `/api/rooms/:id` | ✅ (owner only) | Delete room + cancel associated bookings |
| `GET` | `/api/my-listings` | ✅ | Current user's rooms |

### Booking Routes
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/bookings` | ✅ | Create booking with conflict check |
| `GET` | `/api/bookings/my-bookings` | ✅ | User's booking history with room data |
| `PATCH` | `/api/bookings/:id/cancel` | ✅ (booker only) | Cancel a confirmed booking |

---

## 🔒 Security Highlights

| Feature | Implementation |
|---|---|
| Password hashing | bcrypt with 10 salt rounds |
| Auth tokens | JWT in HTTP-only cookies (XSS-proof) |
| Cross-origin cookies | `SameSite=None; Secure` on production |
| CORS | Whitelist of allowed origins only |
| Owner verification | Server checks `ownerId === req.user.id` before edit/delete |
| Booking conflict | MongoDB query checks overlapping confirmed bookings |
| Route protection | `authMiddleware` validates JWT on every protected route |

---

## ⚡ Performance Notes

- **Code splitting** — all pages except Home are lazy-loaded (`React.lazy`)
- **Chunk splitting** — Firebase (~112 KB) and React vendor (~231 KB) in separate bundles
- **Session cache** — user restored from `localStorage` instantly on reload
- **Schedule cache** — home board shows stale data while refreshing in background
- **DNS prefetch** — `index.html` prefetches the Render API domain on page load
- **15s API timeout** — handles Render free-tier cold starts gracefully

---

## 🗄️ Database Schema

### `users`
```js
{
  name, email,          // email has unique index
  photo, password,      // password absent until set for Google users
  provider,             // "email" | "google"
  bookings: [String],   // booking ID references
  createdAt
}
```

### `rooms`
```js
{
  roomName,             // text index for search
  description, image, floor,
  capacity, hourlyRate,
  amenities: [String],
  ownerId, ownerEmail, ownerName,
  bookingCount,
  createdAt, updatedAt
}
```

### `bookings`
```js
{
  roomId, userId, userEmail,
  date,                 // "YYYY-MM-DD"
  startTime, endTime,   // "HH:MM"
  totalCost, specialNote,
  status,               // "confirmed" | "cancelled"
  createdAt, cancelledAt
}
```

---

## 👤 Author

**Faysal Kabir Ashik**

- 🔗 GitHub: [@faysalkabirashik](https://github.com/faysalkabirashik)
- 🌐 Live Project: [studynook-client-two.vercel.app](https://studynook-client-two.vercel.app)

---

*Built with ❤️ using React, Node.js, Express, and MongoDB*
