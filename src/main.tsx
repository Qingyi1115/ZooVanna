import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import AuthContextProvider from "./context/AuthContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
  
  // </React.StrictMode>,
);
