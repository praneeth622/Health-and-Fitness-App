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

const { width } = Dimensions.get('window');
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const benefits = [
  {
    id: 1,
    title: 'Premium Rewards',
    description: 'Win exclusive prizes',
    icon: 'gift',
  },
  {
    id: 2,
    title: 'Brand Discounts',
    description: 'Special offers & deals',
    icon: 'pricetag',
  },
  {
    id: 3,
    title: 'Pro Features',
    description: 'Access premium content',
    icon: 'star',
  },
  {
    id: 4,
    title: 'Recognition',
    description: 'Get featured by brands',
    icon: 'trophy',
  },
];

interface SponsoredChallenge {
  id: string;
  goal: string;
  image: string;
  title: string;
  reward: string;
  sponsor: string;
}

const successStories = [
  {
    id: 1,
    name: 'Alex',
    challenge: 'Nike Running Challenge',
    achievement: '200KM completed',
    testimonial: 'Winning the Nike Challenge pushed me to new limits!',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800',
  },
  {
    id: 2,
    name: 'Emily',
    challenge: 'Nike Running Challenge',
    achievement: '180KM completed',
    testimonial: 'The rewards were an awesome bonus to achieving my goals!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800',
  },
];

export default function SponsoredChallenges() {
  const scrollY = useSharedValue(0);
  const [sponsoredChallenges, setSponsoredChallenges] = useState<SponsoredChallenge[]>([]);

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

  useEffect(() => {
    const fetchSponsoredChallenges = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "SponsoredChallenges"));
        const challengesData: SponsoredChallenge[] = [];
        querySnapshot.forEach((doc) => {
          challengesData.push({
            id: doc.id,
            goal: doc.data().goal,
            image: doc.data().image,
            title: doc.data().title, 
            reward: doc.data().reward,
            sponsor: doc.data().sponsor
          });
        });
        setSponsoredChallenges(challengesData);
      } catch (error) {
        console.error("Error fetching sponsored challenges:", error);
      }
    };

    fetchSponsoredChallenges();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, headerStyle]}>
        <AnimatedBlurView
          tint="dark"
          intensity={30}
          style={StyleSheet.absoluteFill}
        />
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1539794830467-1f1755804d13?w=800' }}
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
            <Text style={styles.headerTitle}>Sponsored Challenges</Text>
            <Text style={styles.headerSubtitle}>
              Compete & win exclusive rewards from top fitness brands
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
          <Text style={styles.sectionTitle}>Exclusive Benefits</Text>
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

        {/* Active Challenges */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Challenges</Text>
          {sponsoredChallenges.map((challenge, index) => (
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
                    <Text style={styles.sponsorName}>by {challenge.sponsor}</Text>
                  </View>
                  <Text style={styles.challengeGoal}>{challenge.goal}</Text>
                  <View style={styles.rewardContainer}>
                    <Ionicons name="gift" size={16} color="#FBBF24" />
                    <Text style={styles.rewardText}>{challenge.reward}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* Success Stories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Success Stories</Text>
          {successStories.map((story, index) => (
            <Animated.View
              key={story.id}
              entering={FadeInDown.delay(index * 100)}>
              <View style={styles.storyCard}>
                <Image source={{ uri: story.image }} style={styles.userImage} />
                <View style={styles.storyInfo}>
                  <Text style={styles.userName}>{story.name}</Text>
                  <View style={styles.achievementContainer}>
                    <Text style={styles.challengeName}>
                      {story.challenge}
                    </Text>
                    <Text style={styles.achievement}>
                      {story.achievement}
                    </Text>
                  </View>
                  <Text style={styles.testimonial}>
                    "{story.testimonial}"
                  </Text>
                </View>
              </View>
            </Animated.View>
          ))}
        </View>

        {/* Join Button */}
        <View style={[styles.section, styles.lastSection]}>
          <TouchableOpacity style={styles.joinButton} activeOpacity={0.8}>
            <Text style={styles.joinButtonText}>Join & Win Rewards</Text>
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
  },
  sponsorName: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  challengeGoal: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4ADE80',
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rewardText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FBBF24',
  },
  storyCard: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  userImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  storyInfo: {
    flex: 1,
    gap: 4,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  achievementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  challengeName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4ADE80',
  },
  achievement: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  testimonial: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.8)',
    fontStyle: 'italic',
    marginTop: 4,
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