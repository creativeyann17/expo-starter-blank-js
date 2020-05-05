import { AppLoading, Logs } from 'expo';
import { deactivateKeepAwake } from 'expo-keep-awake';
import includes from 'lodash/includes';
import React, { Suspense } from 'react';
import { Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider as StoreProvider } from 'react-redux';

import LoadingLayout from './src/layouts/LoadingLayout';
import IntlProvider from './src/providers/IntlProvider';
import ThemeProvider from './src/providers/ThemeProvider';
import configureStore from './src/services';

const WebLayout = React.lazy(() => import('./src/layouts/WebLayout'));
const MobileLayout = React.lazy(() => import('./src/layouts/MobileLayout'));

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  const store = configureStore();

  async function loadAppAsync() {
    if (__DEV__ && Platform.OS !== 'web') {
      // Logs.disableExpoCliLogging();
    }

    deactivateKeepAwake();

    EStyleSheet.clearCache();
    EStyleSheet.build();
  }

  if (isLoadingComplete) {
    return (
      <StoreProvider store={store}>
        <ThemeProvider>
          <Suspense fallback={<LoadingLayout />}>
            <IntlProvider>
              {includes(['android', 'ios'], Platform.OS) ? <MobileLayout /> : <WebLayout />}
            </IntlProvider>
          </Suspense>
        </ThemeProvider>
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
