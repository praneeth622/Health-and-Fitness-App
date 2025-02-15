import React, { useState } from 'react';
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

const categories = [
  {
    id: 1,
    title: 'Strength Training',
    icon: 'barbell',
    description: 'Build muscle & strength',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800',
  },
  {
    id: 2,
    title: 'Cardio',
    icon: 'fitness',
    description: 'Improve endurance',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800',
  },
  {
    id: 3,
    title: 'Yoga & Flexibility',
    icon: 'body',
    description: 'Enhance mobility',
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800',
  },
  {
    id: 4,
    title: 'Core & Abs',
    icon: 'fitness',
    description: 'Strengthen your core',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800',
  },
];

const trendingWorkouts = [
  {
    id: 1,
    title: 'High-Intensity Cardio',
    duration: '35 min',
    calories: 320,
    level: 'Advanced',
    trainer: 'Sarah Wilson',
    image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=800',
  },
  {
    id: 2,
    title: 'Full Body Strength',
    duration: '45 min',
    calories: 280,
    level: 'Intermediate',
    trainer: 'Mike Johnson',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800',
  },
  {
    id: 3,
    title: 'Morning Yoga Flow',
    duration: '25 min',
    calories: 150,
    level: 'Beginner',
    trainer: 'Emma Davis',
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800',
  },
];

const personalizedPlans = [
  {
    id: 1,
    title: 'Strength Gain',
    duration: '4 Weeks',
    workouts: 20,
    description: 'Progressive overload training',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
  },
  {
    id: 2,
    title: 'Fat Loss & Toning',
    duration: '6 Weeks',
    workouts: 30,
    description: 'HIIT & strength combo',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
  },
];

const liveWorkouts = [
  {
    id: 1,
    title: 'HIIT Burnout',
    trainer: 'Coach John',
    time: 'Tomorrow 6:30 AM',
    participants: 45,
    image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=800',
  },
  {
    id: 2,
    title: 'Evening Yoga',
    trainer: 'Emma Davis',
    time: 'Today 8:00 PM',
    participants: 32,
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800',
  },
];

export default function Workouts() {
  const scrollY = useSharedValue(0);
  const [searchQuery, setSearchQuery] = useState('');

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
          <Text style={styles.headerTitle}>Your Ultimate Workout Guide</Text>
          <Text style={styles.headerSubtitle}>
            Train smarter, stay consistent, and achieve your fitness goals
          </Text>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="rgba(255,255,255,0.6)" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search workouts..."
              placeholderTextColor="rgba(255,255,255,0.6)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}>
        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Workout Categories</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <Ionicons name="arrow-forward" size={16} color="#4ADE80" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category, index) => (
              <Animated.View
                key={category.id}
                entering={FadeInRight.delay(index * 100)}>
                <TouchableOpacity style={styles.categoryCard}>
                  <Image source={{ uri: category.image }} style={styles.categoryImage} />
                  <View style={styles.categoryOverlay}>
                    <Ionicons name={category.icon} size={24} color="#4ADE80" />
                    <View style={styles.categoryInfo}>
                      <Text style={styles.categoryTitle}>{category.title}</Text>
                      <Text style={styles.categoryDescription}>{category.description}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        {/* Trending Workouts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Workouts</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <Ionicons name="arrow-forward" size={16} color="#4ADE80" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {trendingWorkouts.map((workout, index) => (
              <Animated.View
                key={workout.id}
                entering={FadeInRight.delay(index * 100)}>
                <TouchableOpacity style={styles.workoutCard}>
                  <Image source={{ uri: workout.image }} style={styles.workoutImage} />
                  <View style={styles.workoutOverlay}>
                    <View style={styles.workoutBadge}>
                      <Text style={styles.workoutLevel}>{workout.level}</Text>
                    </View>
                    <View style={styles.workoutInfo}>
                      <Text style={styles.workoutTitle}>{workout.title}</Text>
                      <Text style={styles.workoutTrainer}>with {workout.trainer}</Text>
                      <View style={styles.workoutMeta}>
                        <Text style={styles.workoutDetail}>{workout.duration}</Text>
                        <Text style={styles.workoutDetail}>•</Text>
                        <Text style={styles.workoutDetail}>{workout.calories} cal</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        {/* Personalized Plans */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Personalized Plans</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>View All</Text>
              <Ionicons name="arrow-forward" size={16} color="#4ADE80" />
            </TouchableOpacity>
          </View>
          {personalizedPlans.map((plan, index) => (
            <Animated.View
              key={plan.id}
              entering={FadeInDown.delay(index * 100)}>
              <TouchableOpacity style={styles.planCard}>
                <Image source={{ uri: plan.image }} style={styles.planImage} />
                <View style={styles.planInfo}>
                  <Text style={styles.planTitle}>{plan.title}</Text>
                  <Text style={styles.planDescription}>{plan.description}</Text>
                  <View style={styles.planMeta}>
                    <View style={styles.planStat}>
                      <Ionicons name="calendar" size={16} color="#4ADE80" />
                      <Text style={styles.planStatText}>{plan.duration}</Text>
                    </View>
                    <View style={styles.planStat}>
                      <Ionicons name="fitness" size={16} color="#4ADE80" />
                      <Text style={styles.planStatText}>{plan.workouts} workouts</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* Live Workouts */}
        <View style={[styles.section, styles.lastSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Live Workouts</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Schedule</Text>
              <Ionicons name="arrow-forward" size={16} color="#4ADE80" />
            </TouchableOpacity>
          </View>
          {liveWorkouts.map((live, index) => (
            <Animated.View
              key={live.id}
              entering={FadeInDown.delay(index * 100)}>
              <TouchableOpacity style={styles.liveCard}>
                <Image source={{ uri: live.image }} style={styles.liveImage} />
                <View style={styles.liveInfo}>
                  <View>
                    <Text style={styles.liveTitle}>{live.title}</Text>
                    <Text style={styles.liveTrainer}>with {live.trainer}</Text>
                  </View>
                  <View style={styles.liveStats}>
                    <View style={styles.liveStat}>
                      <Ionicons name="time" size={16} color="#4ADE80" />
                      <Text style={styles.liveStatText}>{live.time}</Text>
                    </View>
                    <View style={styles.liveStat}>
                      <Ionicons name="people" size={16} color="#4ADE80" />
                      <Text style={styles.liveStatText}>{live.participants} joined</Text>
                    </View>
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
  categoryCard: {
    width: width * 0.4,
    height: 160,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 16,
    justifyContent: 'space-between',
  },
  categoryInfo: {
    gap: 4,
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  categoryDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.8)',
  },
  workoutCard: {
    width: width * 0.7,
    height: 200,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  workoutImage: {
    width: '100%',
    height: '100%',
  },
  workoutOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  workoutBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#4ADE80',
  },
  workoutLevel: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#121212',
  },
  workoutInfo: {
    gap: 4,
  },
  workoutTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  workoutTrainer: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.8)',
  },
  workoutMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  workoutDetail: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255,255,255,0.8)',
  },
  planCard: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    height: 120,
  },
  planImage: {
    width: 120,
    height: '100%',
  },
  planInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  planTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  planDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  planMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  planStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  planStatText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4ADE80',
  },
  liveCard: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    height: 100,
  },
  liveImage: {
    width: 100,
    height: '100%',
  },
  liveInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  liveTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  liveTrainer: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  liveStats: {
    flexDirection: 'row',
    gap: 16,
  },
  liveStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  liveStatText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4ADE80',
  },
});