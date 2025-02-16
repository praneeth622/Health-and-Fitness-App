import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { useUser, useAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { redeemReward } from '../../utils/rewards';
import { Reward } from '../../types/reward';
import { collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';
import * as Linking from 'expo-linking'
import { BlurView } from 'expo-blur';
import Animated, { FadeInDown, FadeInRight, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { PublicChallenge } from '@/types/challenge';

const { width } = Dimensions.get('window');

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const achievements = [
  {
    id: 1,
    title: 'Step Master',
    description: 'Walked 100K steps in a month',
    icon: 'walk-outline' as const,
    color: '#4ADE80',
  },
  {
    id: 2,
    title: 'Workout Warrior',
    description: 'Completed 50 workouts',
    icon: 'fitness-outline' as const,
    color: '#F472B6',
  },
  {
    id: 3,
    title: 'Marathon Champ',
    description: 'Finished a 10K run',
    icon: 'trophy-outline' as const,
    color: '#FBBF24',
  },
  {
    id: 4,
    title: 'Healthy Eater',
    description: 'Logged meals for 30 days straight',
    icon: 'restaurant-outline' as const,
    color: '#60A5FA',
  },
];

const rewards = [
  {
    id: 1,
    title: '10% Off Fitness Gear',
    points: 1000,
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800',
  },
  {
    id: 2,
    title: '1-Month Premium Access',
    points: 3000,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
  },
  {
    id: 3,
    title: 'Discount on Sports Headphones',
    points: 5000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
  },
];

// Update the interface for PublicChallenge to match your schema
interface PublicChallenge {
  id: string;
  title: string;
  duration: string;
  image: string;
  members: string[];
  participants: number;
  progress: string;
  rank: number;
  reward: string;
  sponsor: string;
  updatedAt: string;
}

interface ActiveChallenge {
  id: string;
  title: string;
  progress: number;
  image: string;
}

interface CompletedChallenge {
  id: string;
  title: string;
  badge: string;
  streak?: number;
  image: string;
}

export default function Profile() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [userPoints, setUserPoints] = useState(0);
  const [activeChallenges, setActiveChallenges] = useState<PublicChallenge[]>([]);
  const [completedChallenges, setCompletedChallenges] = useState<CompletedChallenge[]>([]);
  const [availableRewards, setAvailableRewards] = useState<Reward[]>([]);
  const scrollY = useSharedValue(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data and challenges
  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // Get user document
        const userDoc = await getDoc(doc(db, 'Users', user.id));
        
        if (userDoc.exists()) {
          // Set user points
          setUserPoints(userDoc.data().earnedPoints || 0);
          
          // Get user's public challenges IDs
          const userPublicChallenges = userDoc.data().publicChallenges || [];
          
          // Fetch all public challenges that user is enrolled in
          const activeChallengesData = await Promise.all(
            userPublicChallenges.map(async (challengeId: string) => {
              const challengeDoc = await getDoc(doc(db, 'PublicChallenges', challengeId));
              if (challengeDoc.exists()) {
                const data = challengeDoc.data();
                return {
                  id: challengeDoc.id,
                  title: data.title,
                  duration: data.duration,
                  image: data.image,
                  members: data.members || [],
                  participants: data.participants,
                  progress: data.progress || '0',
                  rank: data.rank || 0,
                  reward: data.reward,
                  sponsor: data.sponsor,
                  updatedAt: data.updatedAt
                } as PublicChallenge;
              }
              return null;
            })
          );

          // Filter out any null values and set active challenges
          setActiveChallenges(activeChallengesData.filter(Boolean) as PublicChallenge[]);

          // Get completed challenges
          const completedChallengesIds = userDoc.data().completedChallenges || [];
          const completedData = await Promise.all(
            completedChallengesIds.map(async (id: string) => {
              const challengeDoc = await getDoc(doc(db, 'PublicChallenges', id));
              if (challengeDoc.exists()) {
                const data = challengeDoc.data();
                return {
                  id: challengeDoc.id,
                  title: data.title,
                  badge: 'Achievement',
                  image: data.image,
                  streak: data.streak || 0
                };
              }
              return null;
            })
          );

          setCompletedChallenges(completedData.filter(Boolean) as CompletedChallenge[]);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

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

  const handleSignOut = async () => {
    try {
      await signOut()
      Linking.openURL(Linking.createURL('/(auth)/login'))
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const handleRedeemReward = async (reward: Reward) => {
    if (!user) return;
    
    try {
      const success = await redeemReward(user.id, reward.id, reward.pointsCost);
      if (success) {
        setUserPoints(prev => prev - reward.pointsCost);
        Alert.alert(
          'Success!',
          `You have successfully redeemed ${reward.title}. Check your email for details.`
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to redeem reward. Please try again.');
    }
  };

  // Add this component for no rewards
  const NoRewardsCard = () => (
    <View style={styles.noRewardsCard}>
      <Ionicons name="star-outline" size={48} color="#4ADE80" />
      <Text style={styles.noRewardsTitle}>No Rewards Available</Text>
      <Text style={styles.noRewardsText}>
        Complete challenges to earn points and unlock rewards!
      </Text>
    </View>
  );

  // Add this component for no challenges
  const NoChallengesCard = () => (
    <View style={styles.noChallengesCard}>
      <Ionicons name="fitness-outline" size={48} color="#4ADE80" />
      <Text style={styles.noChallengesTitle}>No Active Challenges</Text>
      <Text style={styles.noChallengesText}>
        Join public challenges to start your fitness journey!
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, headerStyle]}>
        <AnimatedBlurView
          tint="dark"
          intensity={30}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.headerContent}>
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: user?.imageUrl }}
              style={styles.profileImage}
            />
            <View style={styles.profileText}>
              <Text style={styles.profileName}>{user?.fullName}</Text>
              <Text style={styles.profileBio}>Fitness Enthusiast | Runner</Text>
            </View>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>15,240</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Badges</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>28</Text>
              <Text style={styles.statLabel}>Days Streak</Text>
            </View>
          </View>
          <View style={styles.profileInfo}>
          <TouchableOpacity style={styles.editButton} onPress={() => router.push('/(pages)/profile-setup')}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={handleSignOut}>
            <Text style={styles.editButtonText}>Logout</Text>
          </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}>
        {/* Achievements Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <Ionicons name="arrow-forward" size={16} color="#4ADE80" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {achievements.map((achievement, index) => (
              <Animated.View
                key={achievement.id}
                entering={FadeInRight.delay(index * 100)}>
                <TouchableOpacity style={styles.achievementCard}>
                  <View style={[styles.achievementIcon, { backgroundColor: achievement.color }]}>
                    <Ionicons name={achievement.icon} size={24} color="#fff" />
                  </View>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        {/* Active Challenges Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Challenges</Text>
            <TouchableOpacity style={styles.seeAllButton} onPress={() => router.push('/(pages)/active-challenges')}>
              <Text style={styles.seeAllText}>Find More</Text>
              <Ionicons name="arrow-forward" size={16} color="#4ADE80" />
            </TouchableOpacity>
          </View>
          {isLoading ? (
            <ActivityIndicator color="#4ADE80" size="large" />
          ) : activeChallenges.length === 0 ? (
            <NoChallengesCard />
          ) : (
            activeChallenges.map((challenge, index) => (
              <Animated.View
                key={challenge.id}
                entering={FadeInDown.delay(index * 100)}>
                <TouchableOpacity 
                  style={styles.challengeCard}
                  onPress={() => router.push(`/(pages)/public-challenge-details?challengeId=${challenge.id}`)}>
                  <Image source={{ uri: challenge.image }} style={styles.challengeImage} />
                  <View style={styles.challengeInfo}>
                    <Text style={styles.challengeTitle}>{challenge.title}</Text>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          { width: `${parseFloat(challenge.progress) * 100}%` },
                        ]}
                      />
                    </View>
                    <Text style={styles.progressText}>
                      {Math.round(parseFloat(challenge.progress) * 100)}% Complete
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))
          )}
        </View>

        {/* Completed Challenges */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Completed Challenges</Text>
          </View>
          {completedChallenges.map((challenge, index) => (
            <Animated.View
              key={challenge.id}
              entering={FadeInDown.delay(index * 100)}>
              <TouchableOpacity style={styles.completedCard}>
                <Image source={{ uri: challenge.image }} style={styles.completedImage} />
                <View style={styles.completedInfo}>
                  <Text style={styles.completedTitle}>{challenge.title}</Text>
                  <View style={styles.badgeContainer}>
                    <Ionicons name="trophy" size={16} color="#FBBF24" />
                    <Text style={styles.badgeText}>{challenge.badge} Badge</Text>
                  </View>
                  {challenge.streak && (
                    <Text style={styles.streakText}>
                      {challenge.streak} Day Streak!
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* Rewards Section */}
        <View style={[styles.section, styles.lastSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Rewards</Text>
            <TouchableOpacity 
              style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <Ionicons name="chevron-forward" size={16} color="#4ADE80" />
            </TouchableOpacity>
          </View>
          {availableRewards.length === 0 ? (
            <NoRewardsCard />
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {availableRewards.map((reward, index) => (
                <Animated.View
                  key={reward.id}
                  entering={FadeInRight.delay(index * 100)}>
                  <TouchableOpacity style={styles.rewardCard}>
                    <Image source={{ uri: reward.image }} style={styles.rewardImage} />
                    <View style={styles.rewardInfo}>
                      <Text style={styles.rewardTitle}>{reward.title}</Text>
                      <View style={styles.pointsContainer}>
                        <Ionicons name="star" size={16} color="#FBBF24" />
                        <Text style={styles.pointsText}>{reward.pointsCost} points</Text>
                      </View>
                      <TouchableOpacity 
                        style={[
                          styles.redeemButton,
                          user?.earnedPoints < reward.pointsCost && styles.redeemButtonDisabled
                        ]}
                        disabled={user?.earnedPoints < reward.pointsCost}
                        onPress={() => handleRedeemReward(reward)}>
                        <Text style={styles.redeemButtonText}>
                          {user?.earnedPoints < reward.pointsCost ? 'Not Enough Points' : 'Redeem'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </ScrollView>
          )}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 30,
  },
  header: {
    height: 280,
    paddingVertical: 24,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerContent: {
    gap: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#4ADE80',
  },
  profileText: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  profileBio: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  editButton: {
    backgroundColor: '#4ADE80',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#121212',
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
  achievementCard: {
    width: 160,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },
  challengeCard: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    height: 100,
  },
  challengeImage: {
    width: 100,
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
  completedCard: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    height: 80,
  },
  completedImage: {
    width: 80,
    height: '100%',
  },
  completedInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  completedTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 4,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FBBF24',
  },
  streakText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },
  rewardCard: {
    width: width * 0.7,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
  },
  rewardImage: {
    width: '100%',
    height: 120,
  },
  rewardInfo: {
    padding: 16,
  },
  rewardTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 8,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  pointsText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FBBF24',
  },
  redeemButton: {
    backgroundColor: '#4ADE80',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  redeemButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#121212',
  },
  redeemButtonDisabled: {
    backgroundColor: 'rgba(74,222,128,0.3)',
  },
  noRewardsCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },
  noRewardsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  noRewardsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },
  noChallengesCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },
  noChallengesTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  noChallengesText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },
});