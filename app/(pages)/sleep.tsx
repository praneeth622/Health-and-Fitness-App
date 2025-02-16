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

const sleepStats = {
  duration: '7h 30m',
  deepSleep: '2h 15m',
  quality: 85,
  bedtime: '10:30 PM',
  wakeup: '6:00 AM',
};

const sleepTips = [
  {
    id: 1,
    title: 'Avoid Blue Light',
    description: 'Limit screen time before bed',
    icon: 'phone-off',
  },
  {
    id: 2,
    title: 'Consistent Schedule',
    description: 'Go to bed at the same time',
    icon: 'time',
  },
  {
    id: 3,
    title: 'Cool Environment',
    description: 'Optimal temperature for sleep',
    icon: 'thermometer',
  },
  {
    id: 4,
    title: 'Relaxation',
    description: 'Practice meditation before bed',
    icon: 'moon',
  },
];

const sleepSounds = [
  {
    id: 1,
    title: 'Ocean Waves',
    duration: '8 hours',
    image: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=800',
  },
  {
    id: 2,
    title: 'Rainfall',
    duration: '10 hours',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800',
  },
  {
    id: 3,
    title: 'White Noise',
    duration: '12 hours',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
  },
];

export default function SleepTracking() {
  const scrollY = useSharedValue(0);

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
          source={{ uri: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800' }}
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
            <Text style={styles.headerTitle}>Sleep Better</Text>
            <Text style={styles.headerSubtitle}>
              Track and improve your sleep quality
            </Text>
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={styles.content}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        {/* Sleep Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Last Night's Sleep</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="time" size={24} color="#4ADE80" />
              <Text style={styles.statValue}>{sleepStats.duration}</Text>
              <Text style={styles.statLabel}>Total Sleep</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="moon" size={24} color="#4ADE80" />
              <Text style={styles.statValue}>{sleepStats.deepSleep}</Text>
              <Text style={styles.statLabel}>Deep Sleep</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="star" size={24} color="#4ADE80" />
              <Text style={styles.statValue}>{sleepStats.quality}%</Text>
              <Text style={styles.statLabel}>Quality</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="bed" size={24} color="#4ADE80" />
              <Text style={styles.statValue}>{sleepStats.bedtime}</Text>
              <Text style={styles.statLabel}>Bedtime</Text>
            </View>
          </View>
        </View>

        {/* Sleep Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tips for Better Sleep</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {sleepTips.map((tip, index) => (
              <Animated.View
                key={tip.id}
                entering={FadeInRight.delay(index * 100)}>
                <View style={styles.tipCard}>
                  <View style={styles.tipIcon}>
                    <Ionicons name={tip.icon} size={24} color="#4ADE80" />
                  </View>
                  <Text style={styles.tipTitle}>{tip.title}</Text>
                  <Text style={styles.tipDescription}>{tip.description}</Text>
                </View>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        {/* Sleep Sounds */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Sleep Sounds</Text>
          {sleepSounds.map((sound, index) => (
            <Animated.View
              key={sound.id}
              entering={FadeInDown.delay(index * 100)}>
              <TouchableOpacity style={styles.soundCard}>
                <Image source={{ uri: sound.image }} style={styles.soundImage} />
                <View style={styles.soundInfo}>
                  <View>
                    <Text style={styles.soundTitle}>{sound.title}</Text>
                    <Text style={styles.soundDuration}>{sound.duration}</Text>
                  </View>
                  <TouchableOpacity style={styles.playButton}>
                    <Ionicons name="play" size={24} color="#121212" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: (width - 72) / 2,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  tipCard: {
    width: width * 0.6,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
  },
  tipIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(74,222,128,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  soundCard: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    height: 100,
  },
  soundImage: {
    width: 100,
    height: '100%',
  },
  soundInfo: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  soundTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 4,
  },
  soundDuration: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4ADE80',
    alignItems: 'center',
    justifyContent: 'center',
  },
});