// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import des fichiers de traduction
import fr from './locales/fr.json';
import en from './locales/en.json';

const resources = {
  fr: {
    translation: fr
  },
  en: {
    translation: en
  }
};

i18n
  // Détection automatique de la langue du navigateur
  .use(LanguageDetector)
  // Passer l'instance i18n à react-i18next
  .use(initReactI18next)
  // Initialiser i18next
  .init({
    resources,
    fallbackLng: 'fr', // Langue par défaut
    debug: process.env.NODE_ENV === 'development',

    // Options de détection
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false, // React échappe déjà les valeurs
<<<<<<< HEAD
      format: function(value, format) {
=======
      format: function(value, format, lng) {
>>>>>>> 03165f1a4a7f6e93679023d749bd62bab0652d35
        if (format === 'uppercase') return value.toUpperCase();
        if (format === 'lowercase') return value.toLowerCase();
        return value;
      }
    },

    // Namespace par défaut
    defaultNS: 'translation',
    ns: ['translation'],

    // Options de chargement des ressources
    load: 'languageOnly', // fr au lieu de fr-FR
    preload: ['fr', 'en'],

    // Gestion des clés manquantes
    saveMissing: false,
<<<<<<< HEAD
    missingKeyHandler: (lng, ns, key) => {
=======
    missingKeyHandler: (lng, ns, key, fallbackValue) => {
>>>>>>> 03165f1a4a7f6e93679023d749bd62bab0652d35
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Clé de traduction manquante: ${key} pour la langue: ${lng}`);
      }
    },

    // Options React
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'em', 'span'],
    }
  });

export default i18n;