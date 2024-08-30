import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App.jsx";
import Donate from "./pages/donate.jsx";
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import { PrimeReactProvider } from "primereact/api";
import "./desiigner.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";


ReactDOM.createRoot(document.getElementById('root')).render(
  <PrimeReactProvider>
  <BrowserRouter>
    <Routes>
        <Route index element={<App />}></Route>
        <Route path="/campaigns/:campaignId" element={<Donate />}></Route>
    </Routes>
  </BrowserRouter>
  </PrimeReactProvider>,
)
