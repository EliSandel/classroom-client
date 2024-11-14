import App from "./App.tsx";
import store from "./store/store.ts";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
