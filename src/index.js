import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "react-pro-sidebar/dist/css/styles.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "nprogress/nprogress.css";
import "react-perfect-scrollbar/dist/css/styles.css";

import "./index.scss";
import Layout from "./Layout/Layout";
import reportWebVitals from "./reportWebVitals";
import { store, persistor } from "./Redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StrictMode>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </StrictMode>
    </PersistGate>
  </Provider>
);

reportWebVitals();
