import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.app",
  appName: "ZooVanna",
  webDir: "dist",
  server: {
    //   // url: 'http://172.31.16.158:3000',
    cleartext: true,
    //   androidScheme: "https",
  },
};

export default config;
