import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./Contexts/AuthProvider/AuthProvider.jsx";
import routes from "./Routes/Routes/Routes.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={routes}>
          <App />
        </RouterProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
