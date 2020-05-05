import i18n from 'i18n-js';
import * as React from 'react';
import { Appbar } from 'react-native-paper';

export default function Header() {
  return (
    <Appbar.Header>
      <Appbar.Content title={i18n.t('app.header.title')} subtitle={i18n.t('app.header.subTitle')} />
    </Appbar.Header>
  );
}
