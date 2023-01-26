## Pre-requisites

1. Android Studio
2. Android SDK
3. Pixel 3a API 33a x86 x64 (Android Virtual Device)
4. Mac Users: install XCode

## Running

First Time? Run these commands:
```bash
npm install // installs all modules
npm run build // builds .next folder for Android and iOS emulators
npm run static
npx cap sync // sync to emulators
npm run dev
```

Next, run your desired platform device
1. If you made any big changes and don't have [live reload](https://dev.to/k4u5h4l/configure-next-js-for-cross-platform-development-with-capacitor-js-ai2) set up, do 
    ```bash
    npx cap sync
    ``` 
    to "sync" builds between your code and Android Studio's gradle build
2. Open your emulator:
    ```bash
    Android: npx cap open android
    iPhone: npx cap open iOS
    ```
3. Run your emulator:
    ```bash
    Android: npx cap run android
    iPhone: npx cap run iOS
    ```
## Useful Docs

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
