import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Easing } from 'react-native';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  // Animation values using React Native's Animated API
  const backgroundOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const bounceY = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start background fade in
    Animated.timing(backgroundOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Logo entrance animation with bounce effect
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Bouncing effect
    const bounceAnimation = Animated.sequence([
      Animated.timing(bounceY, {
        toValue: -20,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(bounceY, {
        toValue: 0,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(bounceY, {
        toValue: -15,
        duration: 250,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(bounceY, {
        toValue: 0,
        duration: 250,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(bounceY, {
        toValue: -10,
        duration: 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(bounceY, {
        toValue: 0,
        duration: 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]);

    // Repeat bounce animation
    Animated.loop(bounceAnimation, { iterations: 2 }).start();

    // Text fade in
    setTimeout(() => {
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }, 800);

    // Auto hide splash after 3 seconds
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 0.8,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onFinish();
      });
    }, 3000);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: backgroundOpacity }]}>
      <View style={styles.content}>
        {/* Boss Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [
                { scale: logoScale },
                { translateY: bounceY }
              ],
              opacity: logoOpacity,
            },
          ]}
        >
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>BOSS</Text>
          </View>
        </Animated.View>

        {/* App Name and Tagline */}
        <Animated.View style={[styles.textContainer, { opacity: textOpacity }]}>
          <Text style={styles.appName}>BOSS LOTTO</Text>
          <Text style={styles.tagline}>Your Lucky Numbers Await</Text>
          <Text style={styles.loadingText}>Loading...</Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Deep black background matching boss.co.ke gaming theme
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFD700', // Gold color
    borderWidth: 4,
    borderColor: '#B8860B', // Dark goldenrod
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8B0000', // Dark red
    textAlign: 'center',
    letterSpacing: 2,
  },
  textContainer: {
    alignItems: 'center',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700', // Gold
    marginBottom: 8,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#CCCCCC',
    fontStyle: 'italic',
  },
});