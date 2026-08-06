
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";
  import "./app/lib/amplifyClient"; // configures Amplify from amplify_outputs.json

  createRoot(document.getElementById("root")!).render(<App />);
  