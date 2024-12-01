import App from "./App.tsx";
import store from "./store/store.ts";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { ThemeColorProvider } from "./context/ThemeColorContext.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeColorProvider>
      <App />
    </ThemeColorProvider>
  </Provider>
);
