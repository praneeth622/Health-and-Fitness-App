import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeInDown,
  FadeInRight,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const groups = [
  {
    id: 1,
    name: 'Yoga & Mindfulness',
    members: 328,
    description: 'Daily meditation and stretching routines',
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800',
  },
  {
    id: 2,
    name: 'Weight Loss Warriors',
    members: 452,
    description: 'Share tips, diets, and success stories',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800',
  },
  {
    id: 3,
    name: 'Running Enthusiasts',
    members: 289,
    description: 'Weekly step goals and outdoor running events',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800',
  },
];

const challenges = [
  {
    id: 1,
    title: '10K Steps a Day',
    duration: '30 Days',
    currentDay: 12,
    participants: 1234,
    progress: 0.4,
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800',
  },
  {
    id: 2,
    title: '7-Day Full Body Workout',
    duration: '7 Days',
    currentDay: 5,
    participants: 856,
    progress: 0.71,
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800',
  },
  {
    id: 3,
    title: 'Healthy Eating Streak',
    duration: 'Ongoing',
    currentDay: 4,
    participants: 2341,
    progress: 0.57,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
  },
];

const activities = [
  {
    id: 1,
    user: {
      name: 'Alex',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800',
    },
    activity: 'completed a 5K run',
    message: 'Felt amazing after today\'s session! 🔥💯',
    time: '1 min ago',
  },
  {
    id: 2,
    user: {
      name: 'Sophia',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800',
    },
    activity: 'joined the "Strength Training Club" group',
    time: '10 mins ago',
  },
  {
    id: 3,
    user: {
      name: 'David',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800',
    },
    activity: 'shared a new healthy smoothie recipe',
    message: 'Try this green smoothie: Banana, Spinach, Almond Milk, and Chia Seeds!',
    time: '15 mins ago',
  },
];

const influencers = [
  {
    id: 1,
    name: 'Mike',
    role: 'Strength Coach',
    followers: '45K',
    image: 'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=800',
  },
  {
    id: 2,
    name: 'Anna',
    role: 'Marathon Trainer',
    followers: '30K',
    image: 'https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=800',
  },
  {
    id: 3,
    name: 'Dr. Emily',
    role: 'Nutritionist',
    followers: '20K',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800',
  },
];

export default function Discover() {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, [0, 100], [200, 120], 'clamp'),
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
          <View>
            <Text style={styles.greeting}>Explore</Text>
            <Text style={styles.title}>Discover Your Community</Text>
          </View>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}>
        {/* Groups Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Groups</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <Ionicons name="arrow-forward" size={16} color="#4ADE80" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {groups.map((group, index) => (
              <Animated.View
                key={group.id}
                entering={FadeInRight.delay(index * 100)}>
                <TouchableOpacity style={styles.groupCard}>
                  <Image source={{ uri: group.image }} style={styles.groupImage} />
                  <View style={styles.groupInfo}>
                    <Text style={styles.groupName}>{group.name}</Text>
                    <Text style={styles.groupDescription}>{group.description}</Text>
                    <View style={styles.groupStats}>
                      <View style={styles.groupStat}>
                        <Ionicons name="people" size={16} color="#4ADE80" />
                        <Text style={styles.groupStatText}>{group.members} members</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        {/* Challenges Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Challenges</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <Ionicons name="arrow-forward" size={16} color="#4ADE80" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {challenges.map((challenge, index) => (
              <Animated.View
                key={challenge.id}
                entering={FadeInRight.delay(index * 100)}>
                <TouchableOpacity style={styles.challengeCard}>
                  <Image source={{ uri: challenge.image }} style={styles.challengeImage} />
                  <View style={styles.challengeOverlay}>
                    <View style={styles.challengeBadge}>
                      <Text style={styles.challengeBadgeText}>{challenge.duration}</Text>
                    </View>
                    <View style={styles.challengeInfo}>
                      <Text style={styles.challengeTitle}>{challenge.title}</Text>
                      <View style={styles.challengeProgress}>
                        <View style={styles.progressBar}>
                          <View
                            style={[
                              styles.progressFill,
                              { width: `${challenge.progress * 100}%` },
                            ]}
                          />
                        </View>
                        <Text style={styles.progressText}>
                          Day {challenge.currentDay}
                        </Text>
                      </View>
                      <Text style={styles.challengeParticipants}>
                        {challenge.participants.toLocaleString()} participants
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        {/* Recent Activities */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activities</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <Ionicons name="arrow-forward" size={16} color="#4ADE80" />
            </TouchableOpacity>
          </View>
          {activities.map((activity, index) => (
            <Animated.View
              key={activity.id}
              entering={FadeInDown.delay(index * 100)}>
              <TouchableOpacity style={styles.activityCard}>
                <Image source={{ uri: activity.user.image }} style={styles.userImage} />
                <View style={styles.activityInfo}>
                  <View style={styles.activityHeader}>
                    <Text style={styles.userName}>{activity.user.name}</Text>
                    <Text style={styles.activityText}>{activity.activity}</Text>
                  </View>
                  {activity.message && (
                    <Text style={styles.activityMessage}>{activity.message}</Text>
                  )}
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* Top Influencers */}
        <View style={[styles.section, styles.lastSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Influencers</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <Ionicons name="arrow-forward" size={16} color="#4ADE80" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {influencers.map((influencer, index) => (
              <Animated.View
                key={influencer.id}
                entering={FadeInRight.delay(index * 100)}>
                <TouchableOpacity style={styles.influencerCard}>
                  <Image source={{ uri: influencer.image }} style={styles.influencerImage} />
                  <View style={styles.influencerInfo}>
                    <Text style={styles.influencerName}>{influencer.name}</Text>
                    <Text style={styles.influencerRole}>{influencer.role}</Text>
                    <View style={styles.influencerStats}>
                      <Ionicons name="people" size={14} color="#4ADE80" />
                      <Text style={styles.influencerFollowers}>{influencer.followers} followers</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
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
    height: 200,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.6)',
    fontFamily: 'Inter-Regular',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Inter-Bold',
    marginTop: 4,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
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
  groupCard: {
    width: width * 0.7,
    height: 280,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1E1E1E',
  },
  groupImage: {
    width: '100%',
    height: 160,
  },
  groupInfo: {
    padding: 16,
  },
  groupName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 8,
  },
  groupDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 12,
  },
  groupStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  groupStatText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4ADE80',
  },
  challengeCard: {
    width: width * 0.7,
    height: 200,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  challengeImage: {
    width: '100%',
    height: '100%',
  },
  challengeOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  challengeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#4ADE80',
  },
  challengeBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#121212',
  },
  challengeInfo: {
    gap: 8,
  },
  challengeTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  challengeProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
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
    color: '#fff',
    width: 50,
  },
  challengeParticipants: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.8)',
  },
  activityCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    marginBottom: 12,
  },
  userImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  activityInfo: {
    flex: 1,
    gap: 4,
  },
  activityHeader: {
    flexDirection: 'row',
    gap: 4,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  activityText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.8)',
  },
  activityMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  activityTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.4)',
    marginTop: 4,
  },
  influencerCard: {
    width: 160,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1E1E1E',
  },
  influencerImage: {
    width: '100%',
    height: 160,
  },
  influencerInfo: {
    padding: 12,
  },
  influencerName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  influencerRole: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 8,
  },
  influencerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  influencerFollowers: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4ADE80',
  },
});