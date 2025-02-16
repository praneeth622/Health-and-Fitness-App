import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import Animated, {
  FadeIn,
  FadeInDown,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const activeChallenges = [
  {
    id: 1,
    title: '10K Steps Daily',
    currentDay: 15,
    totalDays: 30,
    progress: 0.5,
    currentValue: 150000,
    targetValue: 300000,
    unit: 'steps',
    rank: 10,
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800',
  },
  {
    id: 2,
    title: '100 Push-Ups Challenge',
    currentDay: 7,
    totalDays: 21,
    progress: 0.33,
    currentValue: 700,
    targetValue: 2100,
    unit: 'push-ups',
    nextMilestone: '1,000 push-ups badge',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800',
  },
];

const dailyStats = {
  steps: 12500,
  pushUps: 120,
  distance: 8,
  calories: 4500,
  streak: 7,
};

const communityUpdates = [
  {
    id: 1,
    user: {
      name: 'Alex',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800',
    },
    message: 'Just hit 200K steps! Let\'s go! 🔥',
    time: '5 min ago',
  },
  {
    id: 2,
    user: {
      name: 'Sarah',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800',
    },
    message: 'Push-up challenge is tough but loving the progress! 💪',
    time: '15 min ago',
  },
];

export default function ActiveChallenges() {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, [0, 100], [280, 200], 'clamp'),
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
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Active Challenges</Text>
            <Text style={styles.headerSubtitle}>
              Track your progress and stay motivated
            </Text>
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={styles.content}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        {/* Active Challenges */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Challenges</Text>
          {activeChallenges.map((challenge, index) => (
            <Animated.View
              key={challenge.id}
              entering={FadeInDown.delay(index * 100)}>
              <View style={styles.challengeCard}>
                <Image
                  source={{ uri: challenge.image }}
                  style={styles.challengeImage}
                />
                <View style={styles.challengeContent}>
                  <Text style={styles.challengeTitle}>{challenge.title}</Text>
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          { width: `${challenge.progress * 100}%` },
                        ]}
                      />
                    </View>
                    <View style={styles.progressStats}>
                      <Text style={styles.progressText}>
                        Day {challenge.currentDay}/{challenge.totalDays}
                      </Text>
                      <Text style={styles.progressValue}>
                        {challenge.currentValue.toLocaleString()}/
                        {challenge.targetValue.toLocaleString()} {challenge.unit}
                      </Text>
                    </View>
                  </View>
                  {challenge.rank && (
                    <View style={styles.rankContainer}>
                      <Ionicons name="trophy" size={16} color="#FBBF24" />
                      <Text style={styles.rankText}>
                        Rank #{challenge.rank} on leaderboard
                      </Text>
                    </View>
                  )}
                  {challenge.nextMilestone && (
                    <View style={styles.milestoneContainer}>
                      <Ionicons name="star" size={16} color="#4ADE80" />
                      <Text style={styles.milestoneText}>
                        Next: {challenge.nextMilestone}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </Animated.View>
          ))}
        </View>

        {/* Daily Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Progress</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="footsteps" size={24} color="#4ADE80" />
              <Text style={styles.statValue}>{dailyStats.steps}</Text>
              <Text style={styles.statLabel}>Steps</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="fitness" size={24} color="#4ADE80" />
              <Text style={styles.statValue}>{dailyStats.pushUps}</Text>
              <Text style={styles.statLabel}>Push-Ups</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="map" size={24} color="#4ADE80" />
              <Text style={styles.statValue}>{dailyStats.distance}km</Text>
              <Text style={styles.statLabel}>Distance</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="flame" size={24} color="#4ADE80" />
              <Text style={styles.statValue}>{dailyStats.calories}</Text>
              <Text style={styles.statLabel}>Calories</Text>
            </View>
          </View>
          <View style={styles.streakCard}>
            <Ionicons name="timer" size={24} color="#FBBF24" />
            <Text style={styles.streakText}>
              {dailyStats.streak} Day Streak! Keep it up! 🔥
            </Text>
          </View>
        </View>

        {/* Community Updates */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Community Updates</Text>
          {communityUpdates.map((update, index) => (
            <Animated.View
              key={update.id}
              entering={FadeInDown.delay(index * 100)}>
              <View style={styles.updateCard}>
                <Image
                  source={{ uri: update.user.image }}
                  style={styles.userImage}
                />
                <View style={styles.updateContent}>
                  <View style={styles.updateHeader}>
                    <Text style={styles.userName}>{update.user.name}</Text>
                    <Text style={styles.updateTime}>{update.time}</Text>
                  </View>
                  <Text style={styles.updateMessage}>{update.message}</Text>
                </View>
              </View>
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
    height: 280,
    justifyContent: 'flex-end',
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
  challengeCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  challengeImage: {
    width: '100%',
    height: 160,
  },
  challengeContent: {
    padding: 16,
  },
  challengeTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 12,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ADE80',
    borderRadius: 2,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4ADE80',
  },
  progressValue: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255,255,255,0.6)',
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  rankText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FBBF24',
  },
  milestoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  milestoneText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4ADE80',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
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
  streakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
  },
  streakText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FBBF24',
  },
  updateCard: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  updateContent: {
    flex: 1,
  },
  updateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  updateTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.4)',
  },
  updateMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.8)',
  },
});