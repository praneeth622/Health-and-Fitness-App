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
    title: 'Burns more calories',
    description: 'Maximize fat burn in less time',
    icon: 'flame',
  },
  {
    id: 2,
    title: 'Improves VO2 max',
    description: 'Enhance oxygen capacity',
    icon: 'fitness',
  },
  {
    id: 3,
    title: 'Boosts metabolism',
    description: 'EPOC effect for hours after',
    icon: 'trending-up',
  },
  {
    id: 4,
    title: 'Heart health',
    description: 'Strengthen cardiovascular system',
    icon: 'heart',
  },
];

const exercises = [
  {
    id: 1,
    name: 'Jump Squats',
    duration: '40 sec',
    rest: '20 sec',
    description: 'Powerful lower-body explosion',
    image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800',
  },
  {
    id: 2,
    name: 'Burpees',
    duration: '40 sec',
    rest: '20 sec',
    description: 'Full-body cardio crusher',
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800',
  },
  {
    id: 3,
    name: 'Mountain Climbers',
    duration: '40 sec',
    rest: '20 sec',
    description: 'Core & endurance burn',
    image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800',
  },
];

const equipmentBasedHIIT = [
  {
    id: 1,
    name: 'Treadmill Sprints',
    sets: '8 rounds',
    work: '30 sec',
    rest: '30 sec',
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800',
  },
  {
    id: 2,
    name: 'Battle Ropes',
    sets: '4 rounds',
    work: '30 sec',
    rest: '30 sec',
    image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800',
  },
];

export default function HIIT() {
  const scrollY = useSharedValue(0);
  const [activeTab, setActiveTab] = useState('bodyweight');

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
          source={{ uri: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=800' }}
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
            <Text style={styles.headerTitle}>High-Intensity Cardio</Text>
            <Text style={styles.headerSubtitle}>Advanced Level • 40 min</Text>
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
          <Text style={styles.sectionTitle}>Benefits of HIIT</Text>
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
              style={[
                styles.tab,
                activeTab === 'bodyweight' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('bodyweight')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'bodyweight' && styles.activeTabText,
                ]}>
                Bodyweight
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'equipment' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('equipment')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'equipment' && styles.activeTabText,
                ]}>
                Equipment
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Exercises Section */}
        {activeTab === 'bodyweight' ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Workout Routine</Text>
            <Text style={styles.sectionSubtitle}>
              Perform 3-4 rounds of these exercises
            </Text>
            {exercises.map((exercise, index) => (
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
                        <Ionicons name="time" size={16} color="#4ADE80" />
                        <Text style={styles.exerciseStatText}>
                          {exercise.duration}
                        </Text>
                      </View>
                      <View style={styles.exerciseStat}>
                        <Ionicons name="refresh" size={16} color="#4ADE80" />
                        <Text style={styles.exerciseStatText}>
                          Rest: {exercise.rest}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Equipment-Based HIIT</Text>
            <Text style={styles.sectionSubtitle}>
              Advanced exercises using gym equipment
            </Text>
            {equipmentBasedHIIT.map((exercise, index) => (
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
                      <View style={styles.exerciseStats}>
                        <View style={styles.exerciseStat}>
                          <Ionicons name="repeat" size={16} color="#4ADE80" />
                          <Text style={styles.exerciseStatText}>
                            {exercise.sets}
                          </Text>
                        </View>
                        <View style={styles.exerciseStat}>
                          <Ionicons name="time" size={16} color="#4ADE80" />
                          <Text style={styles.exerciseStatText}>
                            {exercise.work} work / {exercise.rest} rest
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        )}

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