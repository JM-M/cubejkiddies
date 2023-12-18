import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'a77831ad',
  appName: 'user',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    LiveUpdates: {
      appId: 'a77831ad',
      channel: 'Production',
      autoUpdateMethod: 'background',
      maxVersions: 2,
    },
  },
};

export default config;
