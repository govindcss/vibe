
# VibeWave Mobile

This is a React Native application for VibeWave, built with Expo.

## Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

2.  **Run the App:**

    *   **Start Expo Development Server:**
        ```bash
        npm start
        # or
        yarn start
        ```
        This will open Expo DevTools in your browser. You can then:
        *   Scan the QR code with the Expo Go app on your iOS or Android device.
        *   Run on an Android emulator/device: `npm run android` or `yarn android`
        *   Run on an iOS simulator/device: `npm run ios` or `yarn ios` (requires macOS and Xcode)
        *   Run in the web browser (for components compatible with web): `npm run web` or `yarn web`

## Project Structure (Simplified)

-   `App.tsx`: Root component, sets up navigation and providers.
-   `src/`: Contains the main application code.
    -   `screens/`: Top-level screen components.
    -   `components/`: Reusable UI components.
    -   `navigation/`: Navigation setup (stacks, tabs).
    -   `contexts/`: React Context API providers (Theme, Auth, etc.).
    -   `theme.ts`: Color palette and styling constants.
    -   `assets/`: Static assets like fonts and images.
    -   `ai/`: Genkit AI flows (note: client-side execution model changes from web).
-   `assets/`: Global assets (fonts, icon).

## Genkit AI

AI-powered features are managed using Genkit.
- To run Genkit development flow:
  ```bash
  npm run genkit:dev
  ```
- To watch Genkit files for changes:
  ```bash
  npm run genkit:watch
  ```
Note: In a mobile context, Genkit flows (especially those designed for server environments) would typically be accessed via a backend API rather than directly on the client.

## Available Scripts

-   `npm start` / `yarn start`: Starts the Expo development server.
-   `npm run android` / `yarn android`: Runs the app on an Android emulator or connected device.
-   `npm run ios` / `yarn ios`: Runs the app on an iOS simulator or connected device.
-   `npm run web` / `yarn web`: Runs the app in a web browser (experimental, may not support all native features).
-   `npm run genkit:dev`: Starts Genkit in development mode.
-   `npm run genkit:watch`: Starts Genkit in watch mode.
-   `npm run lint`: Lints the codebase.
-   `npm run typecheck`: Checks TypeScript types.
