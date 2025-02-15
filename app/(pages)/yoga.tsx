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
    title: 'Stress Relief',
    description: 'Reduce anxiety & tension',
    icon: 'leaf',
  },
  {
    id: 2,
    title: 'Flexibility',
    description: 'Improve range of motion',
    icon: 'body',
  },
  {
    id: 3,
    title: 'Inner Peace',
    description: 'Find mental balance',
    icon: 'heart',
  },
  {
    id: 4,
    title: 'Better Sleep',
    description: 'Enhance sleep quality',
    icon: 'moon',
  },
];

const poses = [
  {
    id: 1,
    name: 'Child\'s Pose',
    duration: '2 min',
    description: 'Gently stretches the back',
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800',
  },
  {
    id: 2,
    name: 'Cat-Cow Pose',
    duration: '1 min',
    description: 'Releases spinal tension',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
  },
  {
    id: 3,
    name: 'Forward Fold',
    duration: '2 min',
    description: 'Calms the nervous system',
    image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800',
  },
];

const breathingTechniques = [
  {
    id: 1,
    name: 'Deep Belly Breathing',
    duration: '3 min',
    description: 'Expand abdomen with each breath',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
  },
  {
    id: 2,
    name: 'Alternate Nostril',
    duration: '5 min',
    description: 'Balance left & right channels',
    image: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800',
  },
];

export default function Yoga() {
  const scrollY = useSharedValue(0);
  const [activeTab, setActiveTab] = useState('poses');

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
          source={{ uri: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800' }}
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
            <Text style={styles.headerTitle}>Stress Relief Yoga</Text>
            <Text style={styles.headerSubtitle}>Find your inner peace • 20 min</Text>
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

        {/* Practice Type Tabs */}
        <View style={styles.section}>
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'poses' && styles.activeTab]}
              onPress={() => setActiveTab('poses')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'poses' && styles.activeTabText,
                ]}>
                Yoga Poses
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'breathing' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('breathing')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'breathing' && styles.activeTabText,
                ]}>
                Breathing
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Poses/Breathing Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {activeTab === 'poses' ? 'Yoga Sequence' : 'Breathing Techniques'}
          </Text>
          <Text style={styles.sectionSubtitle}>
            {activeTab === 'poses'
              ? 'Hold each pose gently with steady breathing'
              : 'Practice these techniques to calm your mind'}
          </Text>
          {(activeTab === 'poses' ? poses : breathingTechniques).map(
            (item, index) => (
              <Animated.View
                key={item.id}
                entering={FadeInDown.delay(index * 100)}>
                <TouchableOpacity style={styles.poseCard}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.poseImage}
                  />
                  <View style={styles.poseInfo}>
                    <View>
                      <Text style={styles.poseName}>{item.name}</Text>
                      <Text style={styles.poseDescription}>
                        {item.description}
                      </Text>
                    </View>
                    <View style={styles.poseDuration}>
                      <Ionicons name="time" size={16} color="#4ADE80" />
                      <Text style={styles.poseDurationText}>
                        {item.duration}
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
          <Text style={styles.sectionTitle}>Practice Tips</Text>
          <View style={styles.tipCard}>
            <Ionicons name="information-circle" size={24} color="#4ADE80" />
            <Text style={styles.tipText}>
              Listen to your body and never force yourself into poses.
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Ionicons name="water" size={24} color="#4ADE80" />
            <Text style={styles.tipText}>
              Stay hydrated and practice on an empty stomach.
            </Text>
          </View>
        </View>

        {/* Start Button */}
        <View style={[styles.section, styles.lastSection]}>
          <TouchableOpacity style={styles.startButton} activeOpacity={0.8}>
            <Text style={styles.startButtonText}>Begin Practice</Text>
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
  poseCard: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    height: 100,
  },
  poseImage: {
    width: 100,
    height: '100%',
  },
  poseInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  poseName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 4,
  },
  poseDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  poseDuration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  poseDurationText: {
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