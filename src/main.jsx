import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import "./index.css";
import Transactions from "./routes/transactions";
import Deconnexion from "./routes/deconnexion";
import Connexion from "./routes/connexion";
import HomePage from "./routes/app";



import { MotDePasse } from "./routes/mot_de_passe";
import { Profil } from "./routes/profil";

import '@radix-ui/themes/styles.css';
import { Theme } from "@radix-ui/themes";

import ProtectedRoute from "./lib/auth";
import Comptes from "./routes/comptes";
import Classes from "./routes/classes";
import Types from "./routes/types";
import Etudiants from "./routes/etudiants";
import Acceuil from "./routes/acceuil";



const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute component={Acceuil} />,
      },
      {
        path: "/transactions",
        element: <ProtectedRoute component={Transactions} />,
      },
      {
        path: "/etudiants",
        element: <ProtectedRoute component={Etudiants} />,
      },
      {
        path: "/comptes",
        element: <ProtectedRoute component={Comptes} />,
      },
      {
        path: "/classes",
        element: <ProtectedRoute component={Classes} />,
      },
      {
        path: "/types",
        element: <ProtectedRoute component={Types} />,
      },
     
      {
        path: "/mot_de_passe",
        element: <ProtectedRoute component={MotDePasse} />,
      },
      {
        path: "/profil",
        element: <ProtectedRoute component={Profil} />,
      },
      {
        path: "/deconnexion",
        element: <Deconnexion />,
      },
    ],
  },
  { path: "/connexion", element: <Connexion /> },
]);

const lang = window.localStorage.getItem("lang");

if(lang){
  i18n.changeLanguage(lang)
}
else {
  window.localStorage.setItem('lang', i18n.language)
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <div
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        className={"mainElement " +(i18n.language == "ar" ? "font-arabic" : "font-fr")}
      >
        <Theme>
          <RouterProvider router={router} />
        </Theme>
        
      </div>
    </I18nextProvider>
  </React.StrictMode>
);
