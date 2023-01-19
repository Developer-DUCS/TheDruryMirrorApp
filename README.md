## Pre-requisites

1. Android Studio
2. Android SDK
3. Pixel 3a API 33a x86 x64 (Android Virtual Device)
4. Mac Users: install XCode

## Running

First, run the development server:

```bash
npm run dev
```

This runs the **Capacitor** dev environment for the ios and android platforms

Next, run your desired platform device
1. If you made any big changes and don't have [live reload](https://dev.to/k4u5h4l/configure-next-js-for-cross-platform-development-with-capacitor-js-ai2) set up, do 
    ```bash
    npx cap sync
    ``` 
    to "sync" builds between your code and Android Studio's gradle build
2.

```bash
Android: npx cap run android
iPhone: npx cap run iphone
```

## Useful Docs

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
