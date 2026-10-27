# Field Notes (1923050645_1923050808_Field_Notes)

Complete React Native mobile application built for mobile field inspections, featuring offline-first synchronization, compressed photo attachments, GPS tagging, interactive map view, and daily report exports.

## Features

- **Offline-First Architecture:** Local storage with SQLite / AsyncStorage and intelligent automatic sync queue.
- **Robust Synchronization Engine:** Status indicators (Synced, Pending, Failed), exponential retry limits, and conflict handling.
- **Media & Geolocation:** Compressed photo attachments (`expo-image-manipulator`) and GPS coordinate tagging (`expo-location`).
- **Interactive Mapping:** Marker visualization of field notes using `react-native-maps`.
- **Expo Router Navigation:** Dynamic routes (`[id]`), modal presentations, tab layouts, and deep linking support.

## Running the App

1. Install dependencies: `npm install`
2. Run development server: `npx expo start`
3. Run tests: `npm test`
