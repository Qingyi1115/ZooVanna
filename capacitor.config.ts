import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.app",
  appName: "ZooVanna",
  webDir: "dist",
  server: {
    androidScheme: "https",
    cleartext: true,
    allowNavigation: ["localhost:3000/api/*"],
  },
};

export default config;
