import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { TanstackRouterProvider } from "./components/partials/TanstackRouterProvider";
import "./styles/index.css";
import { AuthProvider } from "./context/AuthContext";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 15, // 15 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TanstackRouterProvider />
      </AuthProvider>
    </QueryClientProvider>
  );
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
