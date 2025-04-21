import { Toaster } from "@/components/ui/sonner";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Routing from "./components/routing/Routing";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routing />
    <Toaster />
  </BrowserRouter>
);
