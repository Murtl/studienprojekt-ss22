import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'studienprojekt-ss22',
  webDir: 'build',
  ios : {
    scheme: 'ionic'
  },
  bundledWebRuntime: false
};

export default config;
