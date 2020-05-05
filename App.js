import { AppLoading, Logs } from 'expo';
import includes from 'lodash/includes';
import React, { Suspense } from 'react';
import { Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { DefaultTheme, Provider as PaperProvider, Colors } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';

import LoadingLayout from './src/layouts/LoadingLayout';
import IntlProvider from './src/providers/IntlProvider';
import configureStore from './src/services';
import { debug } from './src/utils/logger';

const WebLayout = React.lazy(() => import('./src/layouts/WebLayout'));
const MobileLayout = React.lazy(() => import('./src/layouts/MobileLayout'));

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.blue700,
    accent: Colors.blue500,
  },
};

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  const store = configureStore();

  async function loadAppAsync() {
    if (__DEV__ && Platform.OS !== 'web') {
      Logs.disableExpoCliLogging();
    }

    debug('theme', theme);

    EStyleSheet.clearCache();
    EStyleSheet.build();
  }

  if (isLoadingComplete) {
    return (
      <StoreProvider store={store}>
        <PaperProvider theme={theme}>
          <Suspense fallback={<LoadingLayout />}>
            <IntlProvider>
              {includes(['android', 'ios'], Platform.OS) ? <MobileLayout /> : <WebLayout />}
            </IntlProvider>
          </Suspense>
        </PaperProvider>
      </StoreProvider>
    );
  } else {
    return (
      <AppLoading
        startAsync={() => loadAppAsync()}
        onFinish={() => setLoadingComplete(true)}
        onError={console.warn}
      />
    );
  }
}
