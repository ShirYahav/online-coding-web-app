import { createRoot } from "react-dom/client";
import Routing from "./components/routing/Routing";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routing />
  </BrowserRouter>
);
