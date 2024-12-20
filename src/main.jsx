import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

import { BrowserRouter, Route, Routes } from "react-router-dom"; // Correct import
import Challenges from "./components/Chellenges.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");

// Ensure the root element exists
if (!rootElement) {
  throw new Error("Root element with id 'root' not found.");
}

createRoot(rootElement).render(
  <QueryClientProvider client={queryClient}>
    <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="challenges" element={<Challenges />} />
        </Routes>
      </BrowserRouter>
    </Theme>
  </QueryClientProvider>
);
