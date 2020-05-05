import React from 'react';
import { View, Platform, Slider } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  Text,
  Button,
  withTheme,
  IconButton,
  Dialog,
  Paragraph,
  Portal,
  Switch,
} from 'react-native-paper';
import { connect } from 'react-redux';

import * as awakeActions from '../services/awakeService/actions';
import * as awakeSelectors from '../services/awakeService/selectors';
import * as themeActions from '../services/themeService/actions';
import * as themeSelectors from '../services/themeService/selectors';

const PRECISION = 1000;

const Timer = ({ theme, isDarkMode, setDarkMode, isKeepAwake, setKeepAwake }) => {
  const [state, setState] = React.useState({
    count: 0,
    lastTimeout: 0,
    running: false,
    precision: PRECISION,
    dialog: false,
  });

  React.useEffect(() => {
    let timeout;
    if (state.running) {
      timeout = setTimeout(() => {
        setState({
          ...state,
          count: state.count + (Date.now() - state.lastTimeout),
          lastTimeout: Date.now(),
        });
      }, state.precision);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  });

  const start = () => {
    if (!state.running) {
      setState({
        ...state,
        lastTimeout: Date.now(),
        running: true,
      });
    }
  };

  const stop = () => {
    if (state.running) {
      setState({ ...state, running: false });
    }
  };

  const reset = () => {
    setState({ ...state, count: 0 });
  };

  const date = new Date(state.count);

  const toStr = (value, padding = 3, pattern = '0000') => {
    const str = '' + value;
    return pattern.substring(0, padding - str.length) + str;
  };

  const formatDate = (date) => {
    return `${toStr(date.getHours() - 19, 2)}:${toStr(date.getMinutes(), 2)}:${toStr(
      date.getSeconds(),
      2
    )}:${toStr(date.getMilliseconds(), 3)}`;
  };

  const setDialogVisible = (visible) => {
    setState({ ...state, dialog: visible });
  };

  const renderPrecisionDialog = () => {
    return (
      <Dialog
        visible={state.dialog}
        style={styles.dialog}
        onDismiss={() => setDialogVisible(false)}>
        <Dialog.Title>Precision</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Period between computations of time</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setDialogVisible(false)}>OK</Button>
        </Dialog.Actions>
      </Dialog>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <View style={styles.switchView}>
          <Text style={styles.switchText}>Keep awake</Text>
          <Switch value={isKeepAwake} onValueChange={(value) => setKeepAwake(value)} />
          <Text style={styles.switchText}>Dark mode</Text>
          <Switch value={isDarkMode} onValueChange={(value) => setDarkMode(value)} />
        </View>
        <Text style={styles.counter}>{formatDate(date)}</Text>
        <Button mode="contained" disabled={state.running} onPress={start} style={styles.button}>
          START
        </Button>
        <Button mode="contained" disabled={!state.running} onPress={stop} style={styles.button}>
          STOP
        </Button>
        <Button mode="contained" onPress={reset} style={styles.button}>
          RESET
        </Button>
        {Platform.OS !== 'web' && (
          <Slider
            thumbTintColor={theme.colors.primary}
            style={styles.slider}
            minimumValue={10}
            maximumValue={1000}
            step={10}
            value={state.precision}
            onValueChange={(value) => setState({ ...state, precision: value })}
          />
        )}
        <View style={styles.tooltipView}>
          <Paragraph style={styles.precision}>
            Precision {toStr(state.precision, 4, '    ')} ms
          </Paragraph>
          {Platform.OS !== 'foo' && (
            <View style={styles.tooltip}>
              <IconButton
                icon="information"
                onPress={() => setDialogVisible(true)}
                color={theme.colors.primary}
              />
              <Portal>{renderPrecisionDialog()}</Portal>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  switchView: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchText: {
    marginLeft: '.75rem',
    marginRight: '.75rem',
  },
  slider: {
    marginTop: '2rem',
  },
  tooltipView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: '1rem',
  },
  tooltip: {
    marginLeft: '1rem',
  },
  center: {
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: '3rem',
  },
  dialog: {
    alignSelf: 'center',
    margin: 'auto',
  },
  counter: {
    marginTop: '1rem',
    fontSize: 43,
    fontWeight: 'bold',
    alignSelf: 'center',
    ...Platform.select({
      web: {
        fontSize: 70,
      },
    }),
  },
  button: {
    marginTop: '1rem',
    padding: '1rem',
  },
  precision: {
    ...Platform.select({
      android: {
        fontFamily: 'monospace',
      },
      web: {
        fontFamily: 'monospace',
      },
    }),
    color: '#aaa',
  },
});

const mapStateToProps = (state) => {
  return {
    isDarkMode: themeSelectors.isDarkMode(state),
    isKeepAwake: awakeSelectors.isKeepAwake(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDarkMode: (isDarkMode) => dispatch(themeActions.setDarkMode(isDarkMode)),
    setKeepAwake: (isKeepAwake) => dispatch(awakeActions.setKeepAwake(isKeepAwake)),
  };
};

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(Timer));
