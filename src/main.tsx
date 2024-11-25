import App from "./App.tsx";
import store from "./store/store.ts";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { ButtonColorProvider } from "./context/ButtonColorContext";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ButtonColorProvider>
      <App />
    </ButtonColorProvider>
  </Provider>
);
