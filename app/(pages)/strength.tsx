import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInRight,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const benefits = [
  {
    id: 1,
    title: 'Muscle Growth',
    description: 'Build lean muscle mass',
    icon: 'barbell',
  },
  {
    id: 2,
    title: 'Strength Gains',
    description: 'Increase power & force',
    icon: 'fitness',
  },
  {
    id: 3,
    title: 'Fat Loss',
    description: 'Boost metabolism',
    icon: 'flame',
  },
  {
    id: 4,
    title: 'Better Posture',
    description: 'Improve alignment',
    icon: 'body',
  },
];

const gymExercises = [
  {
    id: 1,
    name: 'Barbell Squats',
    sets: '4 sets',
    reps: '8-12 reps',
    description: 'Legs, glutes, and core',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
  },
  {
    id: 2,
    name: 'Deadlifts',
    sets: '3 sets',
    reps: '8-10 reps',
    description: 'Total-body power',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
  },
  {
    id: 3,
    name: 'Bench Press',
    sets: '4 sets',
    reps: '8-12 reps',
    description: 'Chest and triceps',
    image: 'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=800',
  },
];

const homeExercises = [
  {
    id: 1,
    name: 'Push-Ups',
    sets: '3 sets',
    reps: 'Max reps',
    description: 'Upper body strength',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800',
  },
  {
    id: 2,
    name: 'Bodyweight Squats',
    sets: '4 sets',
    reps: '20 reps',
    description: 'Lower body power',
    image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800',
  },
];

export default function Strength() {
  const scrollY = useSharedValue(0);
  const [activeTab, setActiveTab] = useState('gym');

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, [0, 100], [300, 200], 'clamp'),
      opacity: interpolate(scrollY.value, [0, 100], [1, 0.9], 'clamp'),
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, headerStyle]}>
        <AnimatedBlurView
          tint="dark"
          intensity={30}
          style={StyleSheet.absoluteFill}
        />
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800' }}
          style={[StyleSheet.absoluteFill, { opacity: 0.6 }]}
        />
        <View style={styles.headerOverlay} />
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Full-Body Strength</Text>
            <Text style={styles.headerSubtitle}>Intermediate Level • 60 min</Text>
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={styles.content}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        {/* Benefits Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Benefits</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {benefits.map((benefit, index) => (
              <Animated.View
                key={benefit.id}
                entering={FadeInRight.delay(index * 100)}>
                <View style={styles.benefitCard}>
                  <View style={styles.benefitIcon}>
                    <Ionicons name={benefit.icon} size={24} color="#4ADE80" />
                  </View>
                  <Text style={styles.benefitTitle}>{benefit.title}</Text>
                  <Text style={styles.benefitDescription}>
                    {benefit.description}
                  </Text>
                </View>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        {/* Workout Type Tabs */}
        <View style={styles.section}>
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'gym' && styles.activeTab]}
              onPress={() => setActiveTab('gym')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'gym' && styles.activeTabText,
                ]}>
                Gym Workout
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'home' && styles.activeTab]}
              onPress={() => setActiveTab('home')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'home' && styles.activeTabText,
                ]}>
                Home Workout
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Exercises Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercise Plan</Text>
          <Text style={styles.sectionSubtitle}>
            {activeTab === 'gym'
              ? 'Complete all exercises with proper form'
              : 'No equipment needed for these exercises'}
          </Text>
          {(activeTab === 'gym' ? gymExercises : homeExercises).map(
            (exercise, index) => (
              <Animated.View
                key={exercise.id}
                entering={FadeInDown.delay(index * 100)}>
                <TouchableOpacity style={styles.exerciseCard}>
                  <Image
                    source={{ uri: exercise.image }}
                    style={styles.exerciseImage}
                  />
                  <View style={styles.exerciseInfo}>
                    <View>
                      <Text style={styles.exerciseName}>{exercise.name}</Text>
                      <Text style={styles.exerciseDescription}>
                        {exercise.description}
                      </Text>
                    </View>
                    <View style={styles.exerciseStats}>
                      <View style={styles.exerciseStat}>
                        <Ionicons name="repeat" size={16} color="#4ADE80" />
                        <Text style={styles.exerciseStatText}>
                          {exercise.sets}
                        </Text>
                      </View>
                      <View style={styles.exerciseStat}>
                        <Ionicons name="fitness" size={16} color="#4ADE80" />
                        <Text style={styles.exerciseStatText}>
                          {exercise.reps}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ),
          )}
        </View>

        {/* Tips Section */}
        <View style={[styles.section, styles.tipsSection]}>
          <Text style={styles.sectionTitle}>Pro Tips</Text>
          <View style={styles.tipCard}>
            <Ionicons name="information-circle" size={24} color="#4ADE80" />
            <Text style={styles.tipText}>
              Start with lighter weights to perfect your form before increasing the load.
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Ionicons name="water" size={24} color="#4ADE80" />
            <Text style={styles.tipText}>
              Stay hydrated throughout your workout and maintain proper breathing technique.
            </Text>
          </View>
        </View>

        {/* Start Workout Button */}
        <View style={[styles.section, styles.lastSection]}>
          <TouchableOpacity style={styles.startButton} activeOpacity={0.8}>
            <Text style={styles.startButtonText}>Start Workout</Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    height: 300,
    justifyContent: 'flex-end',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerContent: {
    padding: 24,
    gap: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    gap: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.8)',
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  lastSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 16,
  },
  benefitCard: {
    width: width * 0.6,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
  },
  benefitIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(74,222,128,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  benefitTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#4ADE80',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255,255,255,0.6)',
  },
  activeTabText: {
    color: '#121212',
  },
  exerciseCard: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    height: 100,
  },
  exerciseImage: {
    width: 100,
    height: '100%',
  },
  exerciseInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  exerciseName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 4,
  },
  exerciseDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  exerciseStats: {
    flexDirection: 'row',
    gap: 16,
  },
  exerciseStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  exerciseStatText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4ADE80',
  },
  tipsSection: {
    gap: 12,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.8)',
  },
  startButton: {
    backgroundColor: '#4ADE80',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#121212',
  },
});