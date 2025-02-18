# Health and Fitness App

A modern, feature-rich mobile application built with React Native and Expo that helps users track their fitness journey, join challenges, and maintain a healthy lifestyle.

## 🌟 Features

### 📱 Core Features
- **Personalized Dashboard**: Track daily stats including steps, calories, active minutes, and distance
- **Workout Programs**: Access various workout categories including strength, cardio, yoga, and HIIT
- **Challenges**: Join public and group challenges with rewards and leaderboards
- **Community**: Connect with other fitness enthusiasts and share progress
- **Progress Tracking**: Monitor achievements and fitness milestones

### 🎯 Key Components
- **Public Challenges**: Compete globally with other users
- **Group Challenges**: Create or join group-specific fitness challenges
- **Live Workouts**: Join live workout sessions with trainers
- **Rewards System**: Earn points and redeem them for rewards
- **Profile Management**: Track personal achievements and statistics

## 🛠 Technology Stack

### Frontend
- React Native
- Expo
- React Navigation
- Reanimated 2 for animations
- Expo Router for navigation
- TypeScript for type safety

### Backend & Services
- Firebase/Firestore for database
- Clerk for authentication
- Expo modules for device features

### UI Components
- Custom animated components
- Blur effects
- Responsive layouts
- Dark theme optimized

## 🏗 Project Structure
```
Health-and-Fitness-App/
│── FirebaseConfig.js
│── app.json
│── expo-env.d.ts
│── package.json
│── package-lock.json
│── tsconfig.json
│── node_modules/
│── assets/
│── app/
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   ├── register.tsx
│   ├── (onboarding)/
│   │   ├── _layout.tsx
│   ├── (pages)/
│   │   ├── active-challenges.tsx
│   │   ├── community.tsx
│   │   ├── friends.tsx
│   │   ├── group-challenge-details.tsx
│   │   ├── hiit.tsx
│   │   ├── meditation.tsx
│   │   ├── page-details.tsx
│   │   ├── popular-groups.tsx
│   │   ├── profile-setup.tsx
│   │   ├── public-challenge-details.tsx
│   │   ├── public-challenges.tsx
│   │   ├── recipes.tsx
│   │   ├── sleep.tsx
│   │   ├── sponsored-challenges.tsx
│   │   ├── strength.tsx
│   │   ├── yoga.tsx
│   ├── (tabs)/
│   ├── +not-found.tsx
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── onboarding.tsx
│── contexts/
│   ├── ClerkProvider.tsx
│── hooks/
│   ├── useRewards.ts
│── lib/
│   ├── clerk.ts
│── types/
│   ├── challenge.ts
│   ├── reward.ts
│── utils/
│   ├── rewards.ts

```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 14
- Expo CLI
- Firebase account
- Clerk account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sriram0620/Health-and-Fitness-App.git
   ```
2. Install dependencies:
   ```bash
   cd Health-and-Fitness-App
   npm install
   ```
3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
4. Add your API keys to `.env`:
   ```
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   ```
5. Start the development server:
   ```bash
   npm start
   ```

## 📱 Features In Detail

### Challenges System
- Public challenges with global leaderboards
- Group challenges for private competitions
- Progress tracking and milestones
- Reward system for completing challenges

### Workout Programs
- Personalized workout recommendations
- Multiple fitness categories
- Live workout sessions
- Progress tracking

### Social Features
- User profiles
- Achievement system
- Community interactions
- Progress sharing

### 🎨 UI/UX Features
- Smooth animations using Reanimated
- Responsive design for various screen sizes
- Dark theme optimization
- Interactive components
- Loading states and error handling

## 🔒 Security
- Secure authentication with Clerk
- Protected API routes
- Data validation
- Safe storage practices

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors
- **Surya Srirama Murthy Pilla** - [sriram0620](https://github.com/sriram0620)
- **Praneeth Devarasetty**  - [praneeth622](https://github.com/praneeth622)
- **R Darshan Karthikeya**  - [karthikeya1220](https://github.com/karthikeya1220)

---

