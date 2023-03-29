import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nextcap.app',
  appName: 'drury-mirror-app',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    url: "http://192.168.56.1:3000",
    androidScheme: 'https',
    cleartext: true 
}
};

export default config;
