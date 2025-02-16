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
  withSpring,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const challengeDetails = {
  title: 'Ultra-Marathon Challenge',
  sponsor: 'Adidas',
  duration: '30 Days',
  goal: 'Complete 100KM in 30 days',
  reward: 'Win Adidas sports gear worth $500',
  participants: 1234,
  image: 'https://images.unsplash.com/photo-1539794830467-1f1755804d13?w=800',
  description: 'Push your limits with this 30-day ultra-marathon challenge. Run, jog, or walk your way to completing 100KM while competing with participants worldwide.',
  progress: 0.4,
  currentDistance: 40,
  targetDistance: 100,
  daysLeft: 18,
};

const milestones = [
  {
    id: 1,
    distance: 25,
    reward: 'Bronze Badge',
    completed: true,
  },
  {
    id: 2,
    distance: 50,
    reward: 'Silver Badge + $50 Voucher',
    completed: false,
  },
  {
    id: 3,
    distance: 75,
    reward: 'Gold Badge + $100 Voucher',
    completed: false,
  },
  {
    id: 4,
    distance: 100,
    reward: 'Ultimate Prize Pack',
    completed: false,
  },
];

const leaderboard = [
  {
    id: 1,
    name: 'Sarah',
    distance: 68,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800',
  },
  {
    id: 2,
    name: 'Mike',
    distance: 65,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800',
  },
  {
    id: 3,
    name: 'Alex',
    distance: 62,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800',
  },
];

const tips = [
  {
    id: 1,
    title: 'Pace Yourself',
    description: 'Start slow and gradually increase your distance',
    icon: 'walk',
  },
  {
    id: 2,
    title: 'Stay Hydrated',
    description: 'Drink water before, during, and after runs',
    icon: 'water',
  },
  {
    id: 3,
    title: 'Rest Days',
    description: 'Include recovery days in your schedule',
    icon: 'bed',
  },
];

export default function ChallengeDetails() {
  const [isJoined, setIsJoined] = useState(false);
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

  const handleJoinChallenge = () => {
    setIsJoined(true);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, headerStyle]}>
        <AnimatedBlurView
          tint="dark"
          intensity={30}
          style={StyleSheet.absoluteFill}
        />
        <Image
          source={{ uri: challengeDetails.image }}
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
            <Text style={styles.sponsorText}>
              Sponsored by {challengeDetails.sponsor}
            </Text>
            <Text style={styles.headerTitle}>{challengeDetails.title}</Text>
            <View style={styles.headerStats}>
              <View style={styles.headerStat}>
                <Ionicons name="time" size={16} color="#4ADE80" />
                <Text style={styles.headerStatText}>
                  {challengeDetails.duration}
                </Text>
              </View>
              <View style={styles.headerStat}>
                <Ionicons name="people" size={16} color="#4ADE80" />
                <Text style={styles.headerStatText}>
                  {challengeDetails.participants} joined
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={styles.content}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        {/* Challenge Progress */}
        <View style={styles.section}>
          <View style={styles.progressContainer}>
            <View style={styles.progressInfo}>
              <Text style={styles.progressTitle}>Your Progress</Text>
              <Text style={styles.progressText}>
                {challengeDetails.currentDistance}KM /{' '}
                {challengeDetails.targetDistance}KM
              </Text>
            </View>
            <View style={styles.progressBar}>
              <Animated.View
                style={[
                  styles.progressFill,
                  { width: `${challengeDetails.progress * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.daysLeft}>
              {challengeDetails.daysLeft} days left
            </Text>
          </View>
        </View>

        {/* Challenge Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About the Challenge</Text>
          <Text style={styles.description}>{challengeDetails.description}</Text>
          <View style={styles.rewardContainer}>
            <Ionicons name="gift" size={24} color="#FBBF24" />
            <Text style={styles.rewardText}>{challengeDetails.reward}</Text>
          </View>
        </View>

        {/* Milestones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Milestones</Text>
          {milestones.map((milestone, index) => (
            <Animated.View
              key={milestone.id}
              entering={FadeInDown.delay(index * 100)}>
              <View style={styles.milestoneCard}>
                <View
                  style={[
                    styles.milestoneIcon,
                    milestone.completed && styles.milestoneCompleted,
                  ]}>
                  {milestone.completed ? (
                    <Ionicons name="checkmark" size={20} color="#121212" />
                  ) : (
                    <Text style={styles.milestoneDistance}>
                      {milestone.distance}KM
                    </Text>
                  )}
                </View>
                <View style={styles.milestoneInfo}>
                  <Text style={styles.milestoneTitle}>
                    {milestone.distance}KM Milestone
                  </Text>
                  <Text style={styles.milestoneReward}>{milestone.reward}</Text>
                </View>
              </View>
            </Animated.View>
          ))}
        </View>

        {/* Leaderboard */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Performers</Text>
          {leaderboard.map((user, index) => (
            <Animated.View
              key={user.id}
              entering={FadeInDown.delay(index * 100)}>
              <View style={styles.leaderboardCard}>
                <Text style={styles.rank}>#{index + 1}</Text>
                <Image source={{ uri: user.image }} style={styles.userImage} />
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userDistance}>{user.distance}KM</Text>
                </View>
                {index === 0 && (
                  <Ionicons name="trophy" size={24} color="#FFD700" />
                )}
              </View>
            </Animated.View>
          ))}
        </View>

        {/* Tips */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Pro Tips</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {tips.map((tip, index) => (
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
      </Animated.ScrollView>

      {/* Join Button */}
      <Animated.View
        entering={FadeInDown.delay(500)}
        style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.joinButton, isJoined && styles.joinedButton]}
          onPress={handleJoinChallenge}
          disabled={isJoined}>
          <Text style={[styles.joinButtonText, isJoined && styles.joinedButtonText]}>
            {isJoined ? 'Joined Challenge' : 'Join Challenge'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
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
  sponsorText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4ADE80',
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  headerStats: {
    flexDirection: 'row',
    gap: 16,
  },
  headerStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerStatText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4ADE80',
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  lastSection: {
    marginBottom: 100,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 16,
  },
  progressContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4ADE80',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ADE80',
    borderRadius: 4,
  },
  daysLeft: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 24,
    marginBottom: 16,
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(251,191,36,0.1)',
    padding: 16,
    borderRadius: 12,
  },
  rewardText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FBBF24',
  },
  milestoneCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  milestoneIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(74,222,128,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  milestoneCompleted: {
    backgroundColor: '#4ADE80',
  },
  milestoneDistance: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#4ADE80',
  },
  milestoneInfo: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 4,
  },
  milestoneReward: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  leaderboardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  rank: {
    width: 30,
    fontSize: 16,
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
  userDistance: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  tipCard: {
    width: width * 0.7,
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
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 48,
    backgroundColor: 'rgba(18,18,18,0.9)',
  },
  joinButton: {
    backgroundColor: '#4ADE80',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinedButton: {
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#4ADE80',
  },
  joinButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#121212',
  },
  joinedButtonText: {
    color: '#4ADE80',
  },
});