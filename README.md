# MediMitra CareLoop — Healthcare Web Platform

> **Tagline:** Better medicine routines. Stronger care connections.  
> **Hackathon:** Google Cloud Healthcare & AI Hackathon Demonstration  
> **Brand Identity:** Deep Navy (`#102A43`), Emerald Teal (`#0D9488`), Mint (`#F0FDFA`), Clean Healthcare Surface (`#F5F8FB`)

---

## 🌟 Overview

**MediMitra CareLoop** is an accessible healthcare web platform built specifically for elderly patients managing multiple chronic prescriptions and family caregivers who support them. It simplifies daily adherence, delivers timely visual reminders, prevents accidental double-doses, tracks medicine inventory with predictive refill warnings, and establishes a secure, consent-based communication loop between patients and designated caregivers.

---

## 🎨 Design System & Visual Hierarchy

- **Primary Navy:** `#102A43` — High-contrast authority and desktop navigation sidebar.
- **Teal Primary:** `#0D9488` — Action buttons, active indicators, and brand highlights.
- **Light Mint:** `#F0FDFA` — Clean healthcare cards, subtle pill badges, and hover states.
- **Page Background:** `#F5F8FB` — Soft off-white backdrop reducing eye strain for elderly users.
- **Surface Cards:** Pure white (`#FFFFFF`) with subtle 1px border (`#E2E8F0`), 14px–18px rounded corners, and gentle elevation shadows.
- **Healthcare Status Colors:**
  - **Taken / Adherent:** Green (`#16A34A` / `#DCFCE7`)
  - **Pending / Snooze:** Orange (`#EA580C` / `#FFEDD5`)
  - **Need Help / Critical Stock:** Red (`#DC2626` / `#FEE2E2`)
- **Typography:** Google Fonts *Plus Jakarta Sans* and *Inter* for maximum legibility at large font sizes.

---

## 🖥️ Implemented Pages & Architecture

All interfaces are implemented as real, modular React components with active state management, input validation, and bidirectional data synchronization:

### 1. Landing Page (`/` or `landing`)
- Split hero with brand headline: *"Better medicine routines. Stronger care connections."*
- Custom illustration of a caring adult daughter and senior grandfather.
- 3-Step Adherence Flow: **Reminder** $\rightarrow$ **Confirmation** $\rightarrow$ **Caregiver Alert**.
- 3 Interactive Feature Highlights: *Smart Reminders*, *CareLoop Alerts*, and *Refill Tracking*.
- Navigation anchors (`#features`, `#how-it-works`, `#safety`, `#contact`).
- Professional footer with interactive *Privacy Policy*, *Terms of Use*, and *Contact Support* modal dialogs.

### 2. Login / Sign In (`login`)
- Dedicated authentication card with show/hide password visibility toggle.
- Email and password validation.
- "Remember me" control and "Forgot Password?" feedback.
- One-click Persona Quick-Switchers (**Ramesh Kumar — Patient** and **Anitha Sharma — Caregiver**) for seamless hackathon evaluations.
- Honest disclaimer distinguishing offline demo access from configured cloud providers.

### 3. Sign Up / Registration (`signup`)
- Full registration form: Full Name, Email, Password, and Confirm Password with policy matching.
- **Account Type Selector:** Toggle between *Patient / Senior* and *Caregiver / Family Member*.
- Patient consent and terms acceptance checkbox.
- Role-based routing directly to the appropriate dashboard.

### 4. Patient Dashboard (`dashboard`)
- Full desktop Navy sidebar with teal active pill highlights.
- Header bar with hamburger menu, unread notification badge, language selector, and profile dropdown.
- Welcome banner: *"Good Morning, Ramesh 👋"*.
- 4 Live Stat Cards: *Next Reminder*, *Medicines Today*, *Low Stock Warnings*, and *Active Caregivers*.
- Visual Timeline for *Today's Schedule*, *Medicine Stock Overview*, and *Recent Activity*.
- Real-time updates when doses are taken or stock is adjusted.

### 5. Today's Reminder Interface (`reminder`)
- High-visibility reminder screen designed for elderly users.
- Displays dose time, medicine name (*Metformin 500mg*), prescription timing (*After Breakfast*), and 3D photo of the scored tablet.
- 3 Large Tactile Action Buttons:
  - **Taken (Green):** Confirms dose, updates status, decrements tablet count, records timeline history, and prevents duplicate submissions.
  - **Remind Me Later (Orange):** Snooze selection (15 minutes, 30 minutes, 1 hour) with live time recalculation.
  - **Need Help (Red):** Launches immediate caregiver emergency request with custom reason selector.

### 6. My Medicines Management (`medicines`)
- Comprehensive prescription list with realistic 3D pill thumbnails (*Metformin 500mg*, *Telmisartan 40mg*, *Atorvastatin 10mg*, *Vitamin D3 60K*).
- Interactive **Add Medicine Modal** with dosage instructions, schedule period, daily tablet count, and dietary notes.
- **Edit Medicine Modal** to modify existing prescriptions.
- **Delete Medicine** with confirmation modal to prevent accidental data loss.

### 7. Stock & Refill Tracker (`stock`)
- Tablet inventory with predictive "Days Left" estimates based on prescribed daily frequency.
- Color-coded progress bars with *Low Stock* ($\le 10$ tablets) and *Critically Low* ($\le 5$ tablets) warnings.
- **Update Stock Modal** with quick refill increments (+10, +20, +30 tablets) and immediate state synchronization across all views.
- Explicit disclosure that stock is an estimate and medicines are never ordered automatically.

### 8. Caregiver Dashboard (`caregiver`)
- Dedicated family portal for **Anitha Sharma**.
- 2x2 Metric Grid: *Linked Patients (2)*, *Unconfirmed Reminders (3)*, *Help Requests (1)*, *Low Stock Alerts (2)*.
- Patient overview cards with status indicators (e.g. Ramesh Kumar vs. Lakshmi Devi).
- Quick access to the patient's chronological timeline.
- Role-switcher to toggle between caregiver and patient viewpoints.

### 9. Patient Timeline (`timeline`)
- Patient profile header with avatar and detailed health summary modal (physician, emergency contacts, medical notes).
- 4 Category Tabs: **Timeline**, **Medicines**, **Stock**, and **Alerts**.
- Chronological event stream grouped by date (*Today*, *Yesterday*, *Past History*).

### 10. Global Modals & Support Components
- **Alerts Drawer:** Real-time sliding notification center displaying pending caregiver alerts and stock warnings with an "Acknowledge" action.
- **Settings Modal:** Notification preferences, caregiver emergency phone configuration, and one-click data reset to restore default demonstration state.
- **Toast Notifications:** Non-intrusive feedback for every user interaction.

---

## 🚀 Running the Project Locally

### Prerequisites
- Node.js 18+ or 20+
- npm 9+

### Frontend Quickstart
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open in your browser
http://localhost:5173/
```

### Production Build & Validation
```bash
# Type-check and produce optimized production bundle
npm run build
```

---

## ☁️ Google Cloud & Firebase Verified Architecture

This application is built for demonstration at the **Google Cloud Hackathon** with authentic, verified cloud integration files, security rules, and container specifications:

### Verified Services & Data Flow
```
┌─────────────────────────────────┐
│     MediMitra CareLoop UI       │  (Vite + React 19 + TypeScript)
│  (Firebase Hosting / Cloud Run) │  Multi-tenant, isolated patient/caregiver views
└────────────────┬────────────────┘
                 │
                 ├── 1. Firebase Auth (Google OAuth & SHA-256 password hash credentials)
                 ├── 2. Cloud Firestore (firestore.rules: patient ownership & caregiverConsents validation)
                 ├── 3. Web Notification & Web Audio API (Scheduled client-side adherence alarms)
                 │
┌────────────────▼────────────────┐
│   Google Cloud Run Microservice │  (Node.js 20 / Express Container — server/server.js)
│   (Port 8080, Dockerfile)       │  Endpoints: /api/reminders/taken, /api/caregiver/alert, /api/stock/update
└────────────────┬────────────────┘
                 │
                 ├── 4. Google Cloud Build (cloudbuild.yaml: automated container build & deployment)
                 ├── 5. Google Artifact Registry (gcr.io/$PROJECT_ID/medimitra-careloop)
                 └── 6. Vertex AI & Telephony (Prototype Preview: Conversational adherence voice call)
```

### Data Flow & Security Model:
1. **Patient Adherence Recording:** When an elderly patient confirms a dose, the UI updates local state and transmits a signed confirmation payload to the Google Cloud Run microservice (`/api/reminders/taken`).
2. **Caregiver Authorization & Privacy:** Access between patients and family caregivers is governed by `firestore.rules`. Caregivers can only read a patient's timeline and stock when an active consent token (`caregiverConsents`) exists.
3. **Automated CareLoop Follow-Up:** If a scheduled dose remains unconfirmed past the adherence window, the Caregiver Dashboard flags the event (`unconfirmedReminders > 0`) and offers three follow-up pathways: an in-app reminder nudge, an interactive AI voice-call prototype, or direct phone contact with safety confirmation.
4. **Vertex AI Telephone Assistant (Prototype Preview):** Demonstrates automated telephone follow-up in English and Kannada. Transparently disclosed as a hackathon prototype running on browser Web Speech API / Vertex AI specification without placing unauthorized cellular calls.

### Step 1: Firebase Project Setup
1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project (e.g. `medimitra-careloop`).
2. Enable **Authentication** and activate the **Email/Password** provider (and optionally Google Sign-In).
3. Create a **Cloud Firestore** database in production mode.
4. Deploy the security rules from [`firestore.rules`](file:///c:/Users/Stabin%20thomas/Desktop/MediMitra%20CareLoop/firestore.rules):
   ```bash
   firebase deploy --only firestore:rules
   ```

### Step 2: Configure Environment Variables
Copy the template file to `.env`:
```bash
cp .env.example .env
```
Fill in the values from your Firebase Project Settings:
```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=medimitra-careloop.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=medimitra-careloop
VITE_FIREBASE_STORAGE_BUCKET=medimitra-careloop.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
VITE_API_BASE_URL=https://medimitra-api-xyz-uc.a.run.app/api
```

> **Note on Demo Mode:** When running without valid `.env` credentials, the application automatically runs in **Offline Demonstration Mode**. All features (adding medicines, taking doses, snoozing, dispatching caregiver help requests, stock updates) function reliably using localized persistent storage.

### Step 3: Google Cloud Run Backend Deployment
The backend API in [`server/`](file:///c:/Users/Stabin%20thomas/Desktop/MediMitra%20CareLoop/server/) provides validated REST endpoints for emergency notifications, stock calculations, and adherence records.

To test the backend locally:
```bash
cd server
npm install
node server.js
# Backend listening on http://localhost:8080 (Health check: http://localhost:8080/health)
```

To build and deploy directly to Google Cloud Run:
```bash
# Using Google Cloud Build
gcloud builds submit --config=cloudbuild.yaml

# Or direct Cloud Run container deploy
gcloud run deploy medimitra-careloop-service \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 8080
```

---

## 🔒 Healthcare Safety & Data Integrity

- **Sample Prescriptions:** Demonstration medicines (*Metformin*, *Telmisartan*, *Atorvastatin*, *Vitamin D3*) are realistic illustrative examples. MediMitra CareLoop never generates or invents medical dosages.
- **No Automated Ordering:** Inventory tracking provides estimated remaining supply only; the platform never executes automated pharmaceutical purchases or drug dispensing.
- **Caregiver Consent:** Caregivers can only access a patient's adherence timeline and stock levels after explicit patient authorization.
- **Security Isolation:** Sensitive patient information and caregiver help requests are governed by [`firestore.rules`](file:///c:/Users/Stabin%20thomas/Desktop/MediMitra%20CareLoop/firestore.rules) requiring verified authentication.
