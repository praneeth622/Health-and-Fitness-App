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
    title: 'Mental Clarity',
    description: 'Enhance focus & concentration',
    icon: 'brain',
  },
  {
    id: 2,
    title: 'Stress Relief',
    description: 'Reduce anxiety & tension',
    icon: 'leaf',
  },
  {
    id: 3,
    title: 'Better Sleep',
    description: 'Improve sleep quality',
    icon: 'moon',
  },
  {
    id: 4,
    title: 'Emotional Balance',
    description: 'Enhance mood & stability',
    icon: 'heart',
  },
];

const techniques = [
  {
    id: 1,
    name: 'Deep Breathing',
    duration: '2 min',
    description: 'Inhale for 4s, hold for 4s, exhale for 6s',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
  },
  {
    id: 2,
    name: 'Body Scan',
    duration: '3 min',
    description: 'Progressive relaxation from toes to head',
    image: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800',
  },
  {
    id: 3,
    name: 'Gratitude Practice',
    duration: '3 min',
    description: 'Focus on things you\'re thankful for',
    image: 'https://images.unsplash.com/photo-1602192509154-0b900ee1f851?w=800',
  },
];

const advancedTechniques = [
  {
    id: 1,
    name: 'Mindful Walking',
    duration: '10 min',
    description: 'Walking meditation in nature',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
  },
  {
    id: 2,
    name: 'Mantra Meditation',
    duration: '5 min',
    description: 'Silent repetition of calming phrases',
    image: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800',
  },
];

export default function Meditation() {
  const scrollY = useSharedValue(0);
  const [activeTab, setActiveTab] = useState('beginner');

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
            <Text style={styles.headerTitle}>Morning Meditation</Text>
            <Text style={styles.headerSubtitle}>Start your day mindfully • 15 min</Text>
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

        {/* Experience Level Tabs */}
        <View style={styles.section}>
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'beginner' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('beginner')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'beginner' && styles.activeTabText,
                ]}>
                Beginner
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'advanced' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('advanced')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'advanced' && styles.activeTabText,
                ]}>
                Advanced
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Techniques Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meditation Techniques</Text>
          <Text style={styles.sectionSubtitle}>
            {activeTab === 'beginner'
              ? 'Perfect for beginners to establish a practice'
              : 'Advanced techniques for experienced meditators'}
          </Text>
          {(activeTab === 'beginner' ? techniques : advancedTechniques).map(
            (technique, index) => (
              <Animated.View
                key={technique.id}
                entering={FadeInDown.delay(index * 100)}>
                <TouchableOpacity style={styles.techniqueCard}>
                  <Image
                    source={{ uri: technique.image }}
                    style={styles.techniqueImage}
                  />
                  <View style={styles.techniqueInfo}>
                    <View>
                      <Text style={styles.techniqueName}>{technique.name}</Text>
                      <Text style={styles.techniqueDescription}>
                        {technique.description}
                      </Text>
                    </View>
                    <View style={styles.techniqueDuration}>
                      <Ionicons name="time" size={16} color="#4ADE80" />
                      <Text style={styles.techniqueDurationText}>
                        {technique.duration}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ),
          )}
        </View>

        {/* Tips Section */}
        <View style={[styles.section, styles.tipsSection]}>
          <Text style={styles.sectionTitle}>Meditation Tips</Text>
          <View style={styles.tipCard}>
            <Ionicons name="information-circle" size={24} color="#4ADE80" />
            <Text style={styles.tipText}>
              Find a quiet space where you won't be disturbed during your practice.
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Ionicons name="time" size={24} color="#4ADE80" />
            <Text style={styles.tipText}>
              Consistency is key. Try to meditate at the same time each day.
            </Text>
          </View>
        </View>

        {/* Start Button */}
        <View style={[styles.section, styles.lastSection]}>
          <TouchableOpacity style={styles.startButton} activeOpacity={0.8}>
            <Text style={styles.startButtonText}>Begin Meditation</Text>
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
  techniqueCard: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    height: 100,
  },
  techniqueImage: {
    width: 100,
    height: '100%',
  },
  techniqueInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  techniqueName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 4,
  },
  techniqueDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  techniqueDuration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  techniqueDurationText: {
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