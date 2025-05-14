# Firebase Setup for Build with AI Referral System

This document outlines the steps to set up Firebase for the referral system in the Build with AI application.

## Prerequisites

1. A Google account
2. Node.js and npm installed

## Steps to Set Up Firebase

### 1. Install Firebase CLI and Dependencies

```bash
npm install firebase firebase-tools
```

### 2. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "build-with-ai")
4. Follow the setup steps (enable Google Analytics if needed)
5. Click "Create project"

### 3. Register Your Web App

1. In your Firebase project dashboard, click the web icon (`</>`)
2. Register your app with a nickname (e.g., "build-with-ai-web")
3. Optionally set up Firebase Hosting
4. Click "Register app"
5. Copy the Firebase configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

6. Update the configuration in `src/lib/firebase.ts` with your Firebase project details

### 4. Set Up Firestore Database

1. In the Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode" or "Start in test mode" (for development)
4. Select a location for your database
5. Click "Enable"

### 5. Create Firestore Collections

Create the following collections for the referral system:

#### Referrals Collection

Create a collection called `referrals` with the following schema:

```
referrals/
  ├── [referral_id]/
  │     ├── code: string         // The referral code
  │     ├── createdAt: timestamp // When the referral was created
  │     ├── name: string         // Referrer name
  │     ├── email: string        // Referrer email
  │     ├── phone: string        // Referrer phone
  │     ├── isUnder18: boolean   // Whether the referrer is under 18
  │     ├── parentName: string   // Parent/guardian name (if under 18)
  │     ├── parentEmail: string  // Parent/guardian email (if under 18)
  │     ├── parentPhone: string  // Parent/guardian phone (if under 18)
  │     ├── signups: number      // Number of successful referrals
  │     ├── reward: string       // Chosen reward (cash or free course)
  │     └── rewardClaimed: boolean // Whether the reward has been claimed
```

#### Registrations Collection

Create a collection called `registrations` for tracking registrations with referrals:

```
registrations/
  ├── [registration_id]/
  │     ├── name: string         // Registrant name
  │     ├── email: string        // Registrant email
  │     ├── phone: string        // Registrant phone
  │     ├── createdAt: timestamp // When the registration occurred
  │     └── referralCode: string // The referral code used (if any)
```

### 6. Set Up Firebase Authentication (Optional)

If you want to add user authentication:

1. Go to "Authentication" in the Firebase Console
2. Click "Get started"
3. Enable the authentication methods you want to use (Email/Password, Google, etc.)
4. Configure the settings for each method

### 7. Set Up Firebase Security Rules

Create appropriate security rules for your Firestore database:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /referrals/{referralId} {
      allow read, write: if true; // For development, restrict in production
    }
    match /registrations/{registrationId} {
      allow read, write: if true; // For development, restrict in production
    }
  }
}
```

For production, you should restrict access appropriately.

## Implementing the Referral System Logic

Once Firebase is set up, implement the following functionality:

1. When a user generates a referral code:
   - Create a document in the `referrals` collection with their information
   - Generate a unique code and store it

2. When someone registers using a referral code:
   - Create a document in the `registrations` collection
   - Include the referral code used
   - Increment the `signups` counter for the corresponding referral

3. When a referral reaches 2 signups:
   - Implement a function to notify the referrer about their reward
   - Allow them to claim their reward

## Testing the Referral System

1. Generate a referral code using the Partners page
2. Use the code to register as a new user
3. Verify that the registration is properly recorded with the referral code
4. Check that the referrer's signup count is incremented

## Deployment

1. Deploy your app using Firebase Hosting or your preferred hosting service
2. Ensure all Firebase services are properly configured for production

For additional help, consult the [Firebase documentation](https://firebase.google.com/docs). 