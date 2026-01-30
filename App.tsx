/**
 * Boss Lotto App - WebView for boss.co.ke
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, Text, TouchableOpacity, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';

function App() {
  const [webViewError, setWebViewError] = useState(false);
  const [webViewKey, setWebViewKey] = useState(0);
  const isDarkMode = useColorScheme() === 'dark';

  const handleWebViewError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('WebView error: ', nativeEvent);
    Alert.alert(
      "There's no internet",
      "Please connect to the internet to use Boss Lotto.",
      [{ text: 'Retry', onPress: handleRetry }]
    );
    setWebViewError(true);
  };

  const handleWebViewLoadStart = () => {
    console.log('WebView loading started...');
  };

  const handleWebViewLoadEnd = () => {
    console.log('WebView loading completed');
    setWebViewError(false);
  };

  const handleRetry = () => {
    setWebViewError(false);
    setWebViewKey(prev => prev + 1); // Force WebView re-render
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        {webViewError ? (
          <View style={styles.errorContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>BOSS</Text>
            </View>
            <Text style={styles.errorTitle}>There's no internet</Text>
            <Text style={styles.errorMessage}>
              Please connect to the internet to use Boss Lotto.
            </Text>
            <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <WebView
            key={webViewKey}
            source={{
              uri: 'https://boss.co.ke/',
              headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36'
              }
            }}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={true}
            cacheEnabled={false}
            incognito={true}
            thirdPartyCookiesEnabled={true}
            sharedCookiesEnabled={true}
            onError={handleWebViewError}
            onHttpError={handleWebViewError}
            onLoadStart={handleWebViewLoadStart}
            onLoadEnd={handleWebViewLoadEnd}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000000',
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFD700',
    borderWidth: 4,
    borderColor: '#B8860B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#FFD700',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8B0000',
    textAlign: 'center',
    letterSpacing: 2,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 16,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  retryButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#B8860B',
  },
  retryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B0000',
    textAlign: 'center',
  },
});

export default App;
