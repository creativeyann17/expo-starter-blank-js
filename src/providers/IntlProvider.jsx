import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import get from 'lodash/get';
import React from 'react';

import en_US from '../intl/en_US';
import fr_FR from '../intl/fr_FR';
import { debug } from '../utils/logger';

const DEFAULT_LOCALE = 'en-US';

const IntlStateContext = React.createContext();
const IntlDispatchContext = React.createContext();

const getSystemLocale = () => {
  return get(Localization, 'locale', DEFAULT_LOCALE);
};

const setLocale = (locale) => {
  i18n.locale = locale;
  return i18n.currentLocale();
};

const init = () => {
  i18n.translations = {
    // generic
    en: en_US,
    fr: fr_FR,
    // specific
    'en-US': en_US,
    'fr-FR': fr_FR,
  };
  i18n.defaultLocale = DEFAULT_LOCALE;
  i18n.fallbacks = true;
  return setLocale(getSystemLocale());
};

function intlReducer(state, action) {
  switch (action.type) {
    case 'setLocale': {
      return { ...state, locale: setLocale(action.locale) };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function IntlProvider({ children }) {
  const [state, dispatch] = React.useReducer(intlReducer, undefined, () => ({
    locale: init(),
  }));
  //const [state, dispatch] = React.useReducer(intlReducer, { locale: init() });
  debug('IntlProvider locale:', state.locale);
  return (
    <IntlStateContext.Provider value={state} key={state.locale}>
      <IntlDispatchContext.Provider value={dispatch}>{children}</IntlDispatchContext.Provider>
    </IntlStateContext.Provider>
  );
}

function useIntlState() {
  const context = React.useContext(IntlStateContext);
  if (context === undefined) {
    throw new Error('useIntlState must be used within a IntlProvider');
  }
  return context;
}

function useIntlDispatch() {
  const context = React.useContext(IntlDispatchContext);
  if (context === undefined) {
    throw new Error('useIntlDispatch must be used within a IntlProvider');
  }
  return context;
}

function useIntl() {
  return [useIntlState(), useIntlDispatch()];
}

export { IntlProvider, useIntlState, useIntlDispatch, useIntl };
