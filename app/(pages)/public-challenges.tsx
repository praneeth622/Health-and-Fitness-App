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
    title: 'Global Community',
    description: 'Compete with users worldwide',
    icon: 'globe',
  },
  {
    id: 2,
    title: 'Track Progress',
    description: 'Monitor your achievements',
    icon: 'trending-up',
  },
  {
    id: 3,
    title: 'Win Rewards',
    description: 'Earn badges & points',
    icon: 'trophy',
  },
  {
    id: 4,
    title: 'Stay Motivated',
    description: 'Achieve goals together',
    icon: 'flame',
  },
];

const trendingChallenges = [
  {
    id: 1,
    title: '30-Day 10K Steps',
    duration: '30 Days',
    participants: 1234,
    progress: 0.7,
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800',
  },
  {
    id: 2,
    title: '100 Push-Ups Daily',
    duration: '21 Days',
    participants: 856,
    progress: 0.4,
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800',
  },
  {
    id: 3,
    title: 'Cycling 100KM',
    duration: '30 Days',
    participants: 567,
    progress: 0.6,
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800',
  },
];

const leaderboard = [
  {
    id: 1,
    name: 'Alex',
    achievement: '300K steps completed',
    rank: 1,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800',
  },
  {
    id: 2,
    name: 'Sarah',
    achievement: '290K steps',
    rank: 2,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800',
  },
  {
    id: 3,
    name: 'David',
    achievement: '275K steps',
    rank: 3,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800',
  },
];

export default function PublicChallenges() {
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
          source={{ uri: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800' }}
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
            <Text style={styles.headerTitle}>Public Challenges</Text>
            <Text style={styles.headerSubtitle}>
              Join the fitness movement and compete with a global community
            </Text>
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
          <Text style={styles.sectionTitle}>Why Join Challenges?</Text>
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

        {/* Trending Challenges */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Challenges</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <Ionicons name="arrow-forward" size={16} color="#4ADE80" />
            </TouchableOpacity>
          </View>
          {trendingChallenges.map((challenge, index) => (
            <Animated.View
              key={challenge.id}
              entering={FadeInDown.delay(index * 100)}>
              <TouchableOpacity style={styles.challengeCard}>
                <Image
                  source={{ uri: challenge.image }}
                  style={styles.challengeImage}
                />
                <View style={styles.challengeInfo}>
                  <View>
                    <Text style={styles.challengeTitle}>{challenge.title}</Text>
                    <View style={styles.challengeMeta}>
                      <View style={styles.challengeStat}>
                        <Ionicons name="time" size={16} color="#4ADE80" />
                        <Text style={styles.challengeStatText}>
                          {challenge.duration}
                        </Text>
                      </View>
                      <View style={styles.challengeStat}>
                        <Ionicons name="people" size={16} color="#4ADE80" />
                        <Text style={styles.challengeStatText}>
                          {challenge.participants} joined
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          { width: `${challenge.progress * 100}%` },
                        ]}
                      />
                    </View>
                    <Text style={styles.progressText}>
                      {Math.round(challenge.progress * 100)}% Complete
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* Leaderboard Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Global Leaderboard</Text>
          {leaderboard.map((user, index) => (
            <Animated.View
              key={user.id}
              entering={FadeInDown.delay(index * 100)}>
              <View style={styles.leaderboardCard}>
                <View style={styles.rankBadge}>
                  <Text style={styles.rankText}>#{user.rank}</Text>
                </View>
                <Image source={{ uri: user.image }} style={styles.userImage} />
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userAchievement}>
                    {user.achievement}
                  </Text>
                </View>
                {user.rank === 1 && (
                  <Ionicons name="trophy" size={24} color="#FFD700" />
                )}
              </View>
            </Animated.View>
          ))}
        </View>

        {/* Join Button */}
        <View style={[styles.section, styles.lastSection]}>
          <TouchableOpacity style={styles.joinButton} activeOpacity={0.8}>
            <Text style={styles.joinButtonText}>Join a Challenge</Text>
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 16,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4ADE80',
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
  challengeCard: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    height: 120,
  },
  challengeImage: {
    width: 120,
    height: '100%',
  },
  challengeInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  challengeTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 8,
  },
  challengeMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  challengeStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  challengeStatText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4ADE80',
  },
  progressContainer: {
    gap: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ADE80',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4ADE80',
  },
  leaderboardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(74,222,128,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#4ADE80',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 4,
  },
  userAchievement: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  joinButton: {
    backgroundColor: '#4ADE80',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#121212',
  },
});