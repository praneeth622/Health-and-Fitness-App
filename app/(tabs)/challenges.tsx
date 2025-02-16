import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { db } from '../../FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
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

const publicChallenges = [
  {
    id: 1,
    title: '10K Steps Daily',
    sponsor: 'Nike',
    reward: 'Win running shoes!',
    duration: '30 Days',
    participants: 1234,
    progress: 0.4,
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800',
  },
  {
    id: 2,
    title: '100 Push-Ups Challenge',
    duration: '15 Days',
    reward: 'Free Premium Membership',
    participants: 856,
    progress: 0.25,
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800',
  },
  {
    id: 3,
    title: 'Run 50KM in a Month',
    duration: '30 Days',
    reward: 'Gold Badge',
    participants: 567,
    progress: 0.6,
    image: 'https://images.unsplash.com/photo-1486218119243-13883505764c?w=800',
  },
];

const sponsoredChallenges = [
  {
    id: 1,
    title: 'Ultra-Marathon Challenge',
    sponsor: 'Adidas',
    reward: 'Win Adidas sports gear!',
    goal: 'Complete 100KM in 30 days',
    image: 'https://images.unsplash.com/photo-1539794830467-1f1755804d13?w=800',
    // url:'/(pages)/page-details'
  },
  {
    id: 2,
    title: 'Hydration Challenge',
    sponsor: 'Gatorade',
    reward: 'Free energy drink packs',
    goal: 'Drink 2L water daily for 14 days',
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800',
  },
  {
    id: 3,
    title: 'Strength Challenge',
    sponsor: 'Gymshark',
    reward: 'Exclusive merchandise',
    goal: 'Increase weights weekly for a month',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
  },
];

const groupChallenges = [
  {
    id: 1,
    title: 'Strength Battle',
    group: 'Gym Warriors',
    members: 12,
    description: 'Who lifts the heaviest?',
    duration: '7 Days',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800',
  },
  {
    id: 2,
    title: 'Steps Showdown',
    group: 'Running Club',
    members: 8,
    description: 'Most steps in a week!',
    duration: '7 Days',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800',
  },
];

const personalChallenges = [
  {
    id: 1,
    title: '5K Run Every Weekend',
    progress: 0.43,
    currentDay: 3,
    totalDays: 7,
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800',
  },
  {
    id: 2,
    title: '30-Day Abs Workout',
    progress: 0.4,
    currentDay: 12,
    totalDays: 30,
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800',
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

export default function Challenges() {
  const scrollY = useSharedValue(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sponsoredChallenges, setSponsoredChallenges] = useState<SponsoredChallenge[]>([]);

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
            title: doc.data().name, // Note: Firestore field is 'name' but we use 'title'
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
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Push Your Limits</Text>
          <Text style={styles.headerSubtitle}>
            Join exciting challenges, compete with friends, and win amazing rewards
          </Text>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="rgba(255,255,255,0.6)" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search challenges..."
              placeholderTextColor="rgba(255,255,255,0.6)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.createButton}>
            <Ionicons name="add" size={24} color="#121212" />
            <Text style={styles.createButtonText}>Create Challenge</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}>
        {/* Public Challenges */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Public Challenges</Text>
            <TouchableOpacity style={styles.seeAllButton} onPress={() => router.push('/(pages)/public-challenges')}>
              <Text style={styles.seeAllText}>See All</Text>
              <Ionicons name="arrow-forward" size={16} color="#4ADE80" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {publicChallenges.map((challenge, index) => (
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
                      {challenge.sponsor && (
                        <View style={styles.sponsorContainer}>
                          <Text style={styles.sponsorText}>
                            Sponsored by {challenge.sponsor}
                          </Text>
                        </View>
                      )}
                      <View style={styles.challengeStats}>
                        <View style={styles.progressBar}>
                          <View
                            style={[
                              styles.progressFill,
                              { width: `${challenge.progress * 100}%` },
                            ]}
                          />
                        </View>
                        <Text style={styles.participantsText}>
                          {challenge.participants.toLocaleString()} participants
                        </Text>
                      </View>
                      {challenge.reward && (
                        <View style={styles.rewardContainer}>
                          <Ionicons name="gift" size={16} color="#FBBF24" />
                          <Text style={styles.rewardText}>{challenge.reward}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        {/* Sponsored Challenges */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sponsored Challenges</Text>
            <TouchableOpacity style={styles.seeAllButton} onPress={() => router.push('/(pages)/sponsored-challenges')}>
              <Text style={styles.seeAllText}>See All</Text>
              <Ionicons name="arrow-forward" size={16} color="#4ADE80" />
            </TouchableOpacity>
          </View>
          {sponsoredChallenges.map((challenge, index) => (
            <Animated.View
              key={challenge.id}
              entering={FadeInDown.delay(index * 100)}>
              <TouchableOpacity style={styles.sponsoredCard} onPress={() => router.push('/(pages)/page-details')}>
                <Image source={{ uri: challenge.image }} style={styles.sponsoredImage} />
                <View style={styles.sponsoredInfo}>
                  <View>
                    <Text style={styles.sponsoredTitle}>{challenge.title}</Text>
                    <Text style={styles.sponsoredSponsor}>
                      by {challenge.sponsor}
                    </Text>
                  </View>
                  <Text style={styles.sponsoredGoal}>{challenge.goal}</Text>
                  <View style={styles.rewardContainer}>
                    <Ionicons name="gift" size={16} color="#FBBF24" />
                    <Text style={styles.rewardText}>{challenge.reward}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* Group Challenges */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Group Challenges</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Create New</Text>
              <Ionicons name="add-circle" size={16} color="#4ADE80" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {groupChallenges.map((challenge, index) => (
              <Animated.View
                key={challenge.id}
                entering={FadeInRight.delay(index * 100)}>
                <TouchableOpacity style={styles.groupChallengeCard}>
                  <Image source={{ uri: challenge.image }} style={styles.groupChallengeImage} />
                  <View style={styles.groupChallengeInfo}>
                    <Text style={styles.groupChallengeTitle}>{challenge.title}</Text>
                    <Text style={styles.groupName}>{challenge.group}</Text>
                    <View style={styles.groupStats}>
                      <View style={styles.groupStat}>
                        <Ionicons name="people" size={16} color="#4ADE80" />
                        <Text style={styles.groupStatText}>
                          {challenge.members} members
                        </Text>
                      </View>
                      <View style={styles.groupStat}>
                        <Ionicons name="time" size={16} color="#4ADE80" />
                        <Text style={styles.groupStatText}>
                          {challenge.duration}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.groupDescription}>
                      {challenge.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        {/* Personal Challenges */}
        <View style={[styles.section, styles.lastSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Active Challenges</Text>
            <TouchableOpacity style={styles.seeAllButton} onPress={() => router.push('/(pages)/active-challenges')}>
              <Text style={styles.seeAllText}>See All</Text>
              <Ionicons name="arrow-forward" size={16} color="#4ADE80" />
            </TouchableOpacity>
          </View>
          {personalChallenges.map((challenge, index) => (
            <Animated.View
              key={challenge.id}
              entering={FadeInDown.delay(index * 100)}>
              <TouchableOpacity style={styles.personalCard}>
                <Image source={{ uri: challenge.image }} style={styles.personalImage} />
                <View style={styles.personalInfo}>
                  <Text style={styles.personalTitle}>{challenge.title}</Text>
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
                      Day {challenge.currentDay}/{challenge.totalDays}
                    </Text>
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
    height: 280,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerContent: {
    gap: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#fff',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4ADE80',
    height: 48,
    borderRadius: 24,
    gap: 8,
  },
  createButtonText: {
    fontSize: 16,
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
  challengeCard: {
    width: width * 0.7,
    height: 240,
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
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  sponsorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sponsorText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255,255,255,0.8)',
  },
  challengeStats: {
    gap: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ADE80',
    borderRadius: 2,
  },
  participantsText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.8)',
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
  sponsoredCard: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    height: 120,
  },
  sponsoredImage: {
    width: 120,
    height: '100%',
  },
  sponsoredInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  sponsoredTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  sponsoredSponsor: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  sponsoredGoal: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4ADE80',
  },
  groupChallengeCard: {
    width: width * 0.7,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
  },
  groupChallengeImage: {
    width: '100%',
    height: 160,
  },
  groupChallengeInfo: {
    padding: 16,
  },
  groupChallengeTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 4,
  },
  groupName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4ADE80',
    marginBottom: 12,
  },
  groupStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  groupStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  groupStatText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255,255,255,0.8)',
  },
  groupDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  personalCard: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    height: 80,
  },
  personalImage: {
    width: 80,
    height: '100%',
  },
  personalInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  personalTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 8,
  },
  progressContainer: {
    gap: 8,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4ADE80',
  },
});