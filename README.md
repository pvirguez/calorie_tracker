# Calorie Tracker PWA

An AI-powered Progressive Web App for tracking calories and macros using GPT-4 Vision to analyze food images.

## Features

- 📸 **AI Food Analysis**: Upload food images and get instant calorie and macro estimates using GPT-4 Vision
- 📊 **Daily Summary Dashboard**: Track target calories, calories consumed, daily burn, exercise, and net deficit
- 🎯 **Macro Targets**: Set and monitor protein, carbs, and fat goals with visual progress bars
- 📅 **Date Navigation**: View and track meals across different days
- 💪 **Exercise Tracking**: Log daily exercise calories
- 📱 **PWA Support**: Install on mobile or desktop, works offline for viewing history
- 🔄 **Real-time Sync**: Instant updates across devices via Firebase

## Tech Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Firebase (Firestore, Storage, Cloud Functions)
- **AI**: OpenAI GPT-4 Vision API
- **PWA**: vite-plugin-pwa with Workbox

## Prerequisites

- Node.js 20+
- Firebase account
- OpenAI API key with GPT-4 Vision access

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
cd calorie_tracker
npm install
cd functions
npm install
cd ..
```

### 2. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project called "calorie-tracker"
3. Enable **Firestore Database** (production mode)
4. Enable **Firebase Storage** (default settings)
5. Enable **Firebase Hosting**
6. Go to Project Settings > General > Your apps
7. Add a web app and copy the Firebase config

### 3. Configure Environment Variables

Create `.env.local` in the project root:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Firebase config:

```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Set Up Firebase CLI

```bash
npm install -g firebase-tools
firebase login
firebase init
```

When prompted:
- Select: **Firestore**, **Functions**, **Hosting**, **Storage**
- Choose your Firebase project
- For Functions:
  - Language: **TypeScript**
  - ESLint: **No**
  - Install dependencies: **Yes**
- For Hosting:
  - Public directory: **dist**
  - Configure as single-page app: **Yes**
  - Set up GitHub deploys: **No**

### 5. Configure OpenAI API Key

Set your OpenAI API key for Cloud Functions:

```bash
firebase functions:config:set openai.api_key="sk-your-openai-api-key"
```

### 6. Deploy Firebase Services

Deploy security rules and indexes:

```bash
firebase deploy --only firestore:rules,firestore:indexes,storage:rules
```

Deploy Cloud Functions:

```bash
cd functions
npm run build
cd ..
firebase deploy --only functions
```

### 7. Create PWA Icons

You need to create two icon files in `public/icons/`:
- `icon-192x192.png` (192x192 pixels)
- `icon-512x512.png` (512x512 pixels)

You can use [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator) to create these from a source image.

### 8. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see your app!

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Firebase Hosting

```bash
firebase deploy --only hosting
```

Your app will be live at `https://your-project-id.web.app`

## Usage

1. **Add a Meal**:
   - Tap "Take Photo or Upload" to select/capture a food image
   - Optionally add notes (e.g., "extra cheese", "large portion")
   - Wait for AI analysis (~3-5 seconds)
   - Meal appears in your daily log with calories and macros

2. **Track Exercise**:
   - Click "Edit" next to Exercise Today
   - Enter calories burned
   - Click "Save"

3. **View Summary**:
   - See your daily calorie budget and consumption
   - Monitor macro targets with progress bars
   - Check net calorie deficit/surplus

4. **Navigate Dates**:
   - Use Previous/Next buttons to view other days
   - Click "Go to Today" to return to current date

5. **Configure Settings**:
   - Click gear icon in header
   - Adjust target calories, daily burn (BMR)
   - Set protein, carbs, and fat targets
   - Click "Save Changes"

## Database Schema

### Firestore Collections

**meals**
```typescript
{
  id: string
  date: string (YYYY-MM-DD)
  timestamp: number
  imageUrl: string
  userNotes?: string
  calories: number
  protein: number
  carbs: number
  fat: number
}
```

**settings/user** (single document)
```typescript
{
  targetCalories: 1800
  dailyBurn: 2200
  proteinTarget: 135
  carbsTarget: 180
  fatTarget: 60
}
```

**exercise/{date}**
```typescript
{
  date: string (YYYY-MM-DD)
  calories: number
}
```

## Cost Estimation

- **Firebase**: Free tier covers ~50K reads/writes per day
- **OpenAI GPT-4 Vision**: ~$0.01-0.03 per image
- **Monthly estimate** (3 meals/day): $2-3/month

## PWA Installation

### iOS (Safari)
1. Open the app in Safari
2. Tap the Share button
3. Scroll and tap "Add to Home Screen"
4. Tap "Add"

### Android (Chrome)
1. Open the app in Chrome
2. Tap the three-dot menu
3. Tap "Add to Home Screen"
4. Tap "Add"

### Desktop (Chrome/Edge)
1. Open the app
2. Look for install icon in address bar
3. Click "Install"

## Troubleshooting

### Firebase connection issues
- Check `.env.local` has correct values
- Verify Firebase project is set up correctly
- Check browser console for specific errors

### Cloud Function errors
- Ensure OpenAI API key is set: `firebase functions:config:get openai`
- Check function logs: `firebase functions:log`
- Verify billing is enabled on Firebase (required for external API calls)

### PWA not installing
- Ensure icons exist in `public/icons/`
- Check browser console for manifest errors
- Try clearing cache and reloading

## Development Notes

### Running Locally with Firebase Emulators

```bash
firebase emulators:start
```

Update `.env.local` to point to emulators:
```
VITE_FIREBASE_AUTH_DOMAIN=localhost
VITE_FIRESTORE_EMULATOR_HOST=localhost:8080
VITE_STORAGE_EMULATOR_HOST=localhost:9199
```

### Testing Cloud Functions Locally

```bash
cd functions
npm run serve
```

## License

MIT

## Support

For issues and questions, please open a GitHub issue.
