import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
    title: 'Track Your Progress',
    description: 'Monitor your fitness journey with detailed analytics and insights',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800',
    title: 'Expert Workouts',
    description: 'Access professional training programs tailored to your goals',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=800',
    title: 'Join the Community',
    description: 'Connect with like-minded fitness enthusiasts and share your achievements',
  },
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      router.replace('/(auth)/login');
    }
  }, [currentSlide]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <Animated.View 
        entering={FadeIn}
        exiting={FadeOut}
        key={slides[currentSlide].image}
        style={StyleSheet.absoluteFill}>
        <Image
          source={{ uri: slides[currentSlide].image }}
          style={styles.backgroundImage}
        />
        <LinearGradient
          colors={['transparent', '#121212']}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      <View style={styles.content}>
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          key={slides[currentSlide].title}>
          <Text style={styles.title}>{slides[currentSlide].title}</Text>
          <Text style={styles.description}>{slides[currentSlide].description}</Text>
        </Animated.View>

        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentSlide && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
          activeOpacity={0.8}>
          <Text style={styles.buttonText}>
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  backgroundImage: {
    width,
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 24,
    paddingBottom: 48,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#rgba(255, 255, 255, 0.8)',
    marginBottom: 32,
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginRight: 8,
  },
  paginationDotActive: {
    backgroundColor: '#4ADE80',
    width: 24,
  },
  button: {
    backgroundColor: '#4ADE80',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#121212',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
});