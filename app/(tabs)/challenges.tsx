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

interface PublicChallenge {
  id: string;
  title: string;
  sponsor: string;
  reward: string;
  duration: string;
  participants: number;
  progress: number;
  image: string;
}


interface SponsoredChallenge {
  id: string;
  goal: string;
  image: string;
  title: string;
  reward: string;
  sponsor: string;
}

// Add the interface for group challenges
interface GroupChallenge {
  id: string;
  title: string;
  group: string;
  members: any[];
  description: string;
  duration: string;
  image: string;
}

// Add interface for personal challenges
interface PersonalChallenge {
  id: string;
  title: string;
  progress: number;
  currentDay: number;
  totalDays: number;
  image: string;
}

export default function Challenges() {
  const scrollY = useSharedValue(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sponsoredChallenges, setSponsoredChallenges] = useState<SponsoredChallenge[]>([]);
  const [groupChallenges, setGroupChallenges] = useState<GroupChallenge[]>([]);
  const [personalChallenges, setPersonalChallenges] = useState<PersonalChallenge[]>([]);
  const [publicChallenges, setPublicChallenges] = useState<PublicChallenge[]>([]);

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

  // Add new useEffect for fetching group challenges
  useEffect(() => {
    const fetchGroupChallenges = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "GroupChallenges"));
        const challengesData: GroupChallenge[] = [];
        querySnapshot.forEach((doc) => {
          challengesData.push({
            id: doc.id,
            title: doc.data().title,
            group: doc.data().group,
            members: doc.data().members,
            description: doc.data().description,
            duration: doc.data().duration,
            image: doc.data().image
          });
        });
        setGroupChallenges(challengesData);
      } catch (error) {
        console.error("Error fetching group challenges:", error);
      }
    };

    fetchGroupChallenges();
  }, []);

  // Add new useEffect for fetching personal challenges
  useEffect(() => {
    const fetchPersonalChallenges = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "PersonalChallenges"));
        const challengesData: PersonalChallenge[] = [];
        querySnapshot.forEach((doc) => {
          challengesData.push({
            id: doc.id,
            title: doc.data().title,
            progress: doc.data().progress,
            currentDay: doc.data().currentDay,
            totalDays: doc.data().totalDays,
            image: doc.data().image
          });
        });
        setPersonalChallenges(challengesData);
      } catch (error) {
        console.error("Error fetching personal challenges:", error);
      }
    };

    fetchPersonalChallenges();
  }, []);

  // Add new useEffect for fetching public challenges
  useEffect(() => {
    const fetchPublicChallenges = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "PublicChallenges"));
        const challengesData: PublicChallenge[] = [];
        querySnapshot.forEach((doc) => {
          challengesData.push({
            id: doc.id,
            title: doc.data().title,
            sponsor: doc.data().sponsor,
            reward: doc.data().reward,
            duration: doc.data().duration,
            participants: doc.data().participants,
            progress: doc.data().progress,
            image: doc.data().image
          });
        });
        setPublicChallenges(challengesData);
      } catch (error) {
        console.error("Error fetching public challenges:", error);
      }
    };

    fetchPublicChallenges();
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
                          {challenge.members.length} members
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