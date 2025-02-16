import React, { useState, useEffect } from 'react';
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
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';
import { Milestone, LeaderboardUser } from '@/types/challenge';

// Move this inside the component to ensure it's defined
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
export default function PublicChallenges() {
  // Get window width inside the component
  const windowWidth = Dimensions.get('window').width;
  
  const scrollY = useSharedValue(0);   
  const [trendingChallenges, setTrendingChallenges] = useState<TrendingChallenge[]>([]);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch trending challenges
        const challengesSnapshot = await getDocs(collection(db, "PublicChallenges"));
        const challengesData: TrendingChallenge[] = [];
        challengesSnapshot.forEach((doc) => {
          challengesData.push({
            id: doc.id,
            title: doc.data().title,
            duration: doc.data().duration,
            participants: doc.data().participants,
            progress: doc.data().progress,
            image: doc.data().image
          });
        });
        setTrendingChallenges(challengesData);

        // Fetch leaderboard
        const leaderboardSnapshot = await getDocs(collection(db, "Users"));
        const leaderboardData: LeaderboardUser[] = [];
        leaderboardSnapshot.forEach((doc) => {
          leaderboardData.push({
            id: doc.id,
            name: doc.data().name,
            achievement: doc.data().achievement,
            rank: doc.data().rank,
            image: doc.data().image
          });
        });
        setLeaderboardData(leaderboardData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

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
          {leaderboardData.map((user, index) => (
            <Animated.View
              key={user.id}
              entering={FadeInDown.delay(index * 100)}>
              <View style={styles.leaderboardCard}>
                <View style={styles.rankBadge}>
                  <Text style={styles.rankText}>#{user?.rank}</Text>
                </View>
                <Image source={{ uri: user?.image }} style={styles.userImage} />
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

// Update styles to use windowWidth
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
    width: Dimensions.get('window').width * 0.6,
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
  loadingText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginTop: 20,
  },
});