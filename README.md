# Stream GPT

## Setup Steps

- Create App using **Vite**
- Configure **Tailwind CSS**
- Build UI Components:
  - Header
  - Login Form
  - Signup Form
- Form Validations with `useRef`
- Setup **Firebase**
- Deploy the app to production
- Create signup user account
- Setup **Redux Store** with `userSlice`
- Implement Sign Out
- Update Profile
- **Bugfixes**:
  - Signup user display name and profile picture update
  - Redirect user to login page if not authenticated and vice versa
  - Unsubscribe from `onAuthStateChanged` callback

## Movie API Integration

- Add hardcoded values to the `constants.js` file
- Register TMDB API, create app & get access token
- Fetch movies from TMDB
- Custom hook for **Now Playing** movies
- Create `movieSlice` and update Redux store with movies data
- Plan and build `MainContainer` and `SecondaryContainer`
- Fetch data for trailer video
- Update store with trailer video data
- Embed YouTube video and enable autoplay + mute
- Build secondary component and add different movies using reusable code
- Add custom hooks

---

## ✨ Features

- Login / Signup Form
- Protected **Browser Page**
- Persistent Header
- **Main Movie View**:
  - Trailer in background
  - Title & Description
  - Suggested Movies
- **Movie List** sections (multiple rows)
- Search Bar to explore more movies
