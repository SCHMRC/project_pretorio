import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Pretorio',
  webDir: 'www',
  plugins: {
    OneSignal: {
      appId: 'e9c960e6-8268-4f00-a58c-1c1ee131ee6c',
    },
  },
};

export default config;
