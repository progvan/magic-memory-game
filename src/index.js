import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import global_en from "./translations/en/global.json"
import global_ua from "./translations/ua/global.json"

import i18next from "i18next";
import { I18nextProvider } from "react-i18next";


i18next.init({
    interpolation: {escapeValue: false},
    lng: window.localStorage.getItem('USER_LANGUAGE') || 'en',
    resources: {
      en: {
        global: global_en,
      },
      ua: {
        global: global_ua,
      },
    },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
    <App />
    </I18nextProvider>
  </React.StrictMode>
);

