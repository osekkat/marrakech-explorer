import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.marrakech.explorer',
  appName: 'Marrakech Explorer',
  webDir: 'dist',
  server: {
    url: 'http://localhost:8084',
    cleartext: true,
  },
};

export default config;
