/**
 * Boss Lotto App - WebView for boss.co.ke
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, Text, TouchableOpacity, Alert, ActivityIndicator, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';

function App() {
  const [webViewError, setWebViewError] = useState(false);
  const [webViewLoaded, setWebViewLoaded] = useState(false);
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
    setWebViewLoaded(false);
  };

  const handleWebViewLoadStart = () => {
    console.log('WebView loading started...');
    setWebViewLoaded(false);
  };

  const handleWebViewLoadEnd = () => {
    console.log('WebView loading completed');
    setWebViewLoaded(true);
    setWebViewError(false);
  };

  const handleRetry = () => {
    setWebViewError(false);
    setWebViewLoaded(false);
    setWebViewKey(prev => prev + 1); // Force WebView re-render
  };

  const renderLoadingView = () => (
    <View style={styles.loadingContainer}>
      <View style={styles.logoCircleSmall}>
        <Text style={styles.logoTextSmall}>BOSS</Text>
      </View>
      <ActivityIndicator size="large" color="#FFD700" />
      <Text style={styles.loadingText}>Loading Boss Lotto...</Text>
    </View>
  );

  const injectedJavaScript = `
    (function() {
      if (document.body) {
        document.body.style.backgroundColor = '#000000';
      }
    })();
    true;
  `;

  return (
    <SafeAreaProvider style={{ backgroundColor: '#000000' }}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <SafeAreaView style={styles.safeArea}>
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
              containerStyle={styles.webviewContainer}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              renderLoading={renderLoadingView}
              injectedJavaScript={injectedJavaScript}
              scalesPageToFit={true}
              cacheEnabled={false}
              incognito={true}
              thirdPartyCookiesEnabled={true}
              sharedCookiesEnabled={true}
              onError={handleWebViewError}
              onHttpError={handleWebViewError}
              onLoadStart={handleWebViewLoadStart}
              onLoadEnd={handleWebViewLoadEnd}
              backgroundColor="#000000"
            />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  webviewContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  webview: {
    flex: 1,
    backgroundColor: '#000000',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    zIndex: 1,
  },
  logoCircleSmall: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFD700',
    borderWidth: 3,
    borderColor: '#B8860B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoTextSmall: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8B0000',
  },
  loadingText: {
    color: '#FFD700',
    marginTop: 15,
    fontSize: 16,
    fontWeight: '500',
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
