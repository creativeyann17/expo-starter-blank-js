import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import get from 'lodash/get';

import { debug } from '../../utils/logger';
import en_US from './intl/en_US';
import fr_FR from './intl/fr_FR';

const DEFAULT_LOCALE = 'en-US';

export const init = () => {
  i18n.translations = {
    // generic
    en: en_US,
    fr: fr_FR,
    // specific
    'en-US': en_US,
    'fr-FR': fr_FR,
  };
  i18n.defaultLocale = DEFAULT_LOCALE;
  i18n.locale = getSystemLocale();
  i18n.fallbacks = true;

  debug('Init i18n locale:', i18n.locale);

  return i18n.currentLocale();
};

export const setLocale = (locale) => {
  i18n.locale = locale;
  return i18n.currentLocale();
};

export const getSystemLocale = () => {
  return get(Localization, 'locale', DEFAULT_LOCALE);
};
