import React from 'react';
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

const suggestedFriends = [
  {
    id: 1,
    name: 'Alex',
    interests: 'Running, HIIT',
    mutualFriends: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800',
  },
  {
    id: 2,
    name: 'Sarah',
    interests: 'Yoga, Strength',
    mutualFriends: 3,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800',
  },
  {
    id: 3,
    name: 'Mike',
    interests: 'Cycling, Swimming',
    mutualFriends: 7,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800',
  },
];

const activityFeed = [
  {
    id: 1,
    user: {
      name: 'Emily',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800',
    },
    activity: 'completed a 5K run',
    time: '2 min ago',
    stats: {
      distance: '5.2 km',
      pace: '5:30/km',
    },
    likes: 12,
    comments: 3,
  },
  {
    id: 2,
    user: {
      name: 'David',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800',
    },
    activity: 'achieved a new PR in deadlifts',
    time: '15 min ago',
    stats: {
      weight: '140 kg',
      reps: 5,
    },
    likes: 24,
    comments: 8,
  },
];

const challenges = [
  {
    id: 1,
    title: 'Weekly Steps Challenge',
    participants: 128,
    prize: 'Gold Badge',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800',
  },
  {
    id: 2,
    title: 'Summer Fitness Challenge',
    participants: 256,
    prize: 'Premium Membership',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
  },
];

export default function SocialFitness() {
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
          source={{ uri: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800' }}
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
            <Text style={styles.headerTitle}>Social Fitness</Text>
            <Text style={styles.headerSubtitle}>
              Connect with friends and stay motivated
            </Text>
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={styles.content}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        {/* Suggested Friends */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suggested Friends</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {suggestedFriends.map((friend, index) => (
              <Animated.View
                key={friend.id}
                entering={FadeInRight.delay(index * 100)}>
                <View style={styles.friendCard}>
                  <Image source={{ uri: friend.image }} style={styles.friendImage} />
                  <Text style={styles.friendName}>{friend.name}</Text>
                  <Text style={styles.friendInterests}>{friend.interests}</Text>
                  <Text style={styles.mutualFriends}>
                    {friend.mutualFriends} mutual friends
                  </Text>
                  <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="person-add" size={20} color="#121212" />
                    <Text style={styles.addButtonText}>Add Friend</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        {/* Activity Feed */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity Feed</Text>
          {activityFeed.map((activity, index) => (
            <Animated.View
              key={activity.id}
              entering={FadeInDown.delay(index * 100)}>
              <View style={styles.activityCard}>
                <View style={styles.activityHeader}>
                  <Image
                    source={{ uri: activity.user.image }}
                    style={styles.activityUserImage}
                  />
                  <View style={styles.activityHeaderText}>
                    <Text style={styles.activityUserName}>
                      {activity.user.name}
                    </Text>
                    <Text style={styles.activityDescription}>
                      {activity.activity}
                    </Text>
                    <Text style={styles.activityTime}>{activity.time}</Text>
                  </View>
                </View>
                <View style={styles.activityStats}>
                  {Object.entries(activity.stats).map(([key, value]) => (
                    <View key={key} style={styles.activityStat}>
                      <Text style={styles.activityStatValue}>{value}</Text>
                      <Text style={styles.activityStatLabel}>{key}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.activityActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="heart-outline" size={24} color="#4ADE80" />
                    <Text style={styles.actionText}>{activity.likes}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons
                      name="chatbubble-outline"
                      size={24}
                      color="#4ADE80"
                    />
                    <Text style={styles.actionText}>{activity.comments}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          ))}
        </View>

        {/* Friend Challenges */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Friend Challenges</Text>
          {challenges.map((challenge, index) => (
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
                    <Text style={styles.challengeParticipants}>
                      {challenge.participants} participants
                    </Text>
                  </View>
                  <View style={styles.challengePrize}>
                    <Ionicons name="trophy" size={16} color="#FBBF24" />
                    <Text style={styles.prizeText}>{challenge.prize}</Text>
                  </View>
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
  friendCard: {
    width: width * 0.6,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
  },
  friendImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  friendName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 4,
  },
  friendInterests: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 8,
  },
  mutualFriends: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4ADE80',
    marginBottom: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4ADE80',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#121212',
  },
  activityCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  activityHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  activityUserImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  activityHeaderText: {
    flex: 1,
  },
  activityUserName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  activityDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  activityTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },
  activityStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  activityStat: {
    flex: 1,
    backgroundColor: 'rgba(74,222,128,0.1)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  activityStatValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#4ADE80',
    marginBottom: 4,
  },
  activityStatLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  activityActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4ADE80',
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
    marginBottom: 4,
  },
  challengeParticipants: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  challengePrize: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  prizeText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FBBF24',
  },
});