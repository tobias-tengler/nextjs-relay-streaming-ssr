import { hydrateRoot } from "react-dom/client";
import React from "react";
import App from "./app.js";

hydrateRoot(document, React.createElement(App));
