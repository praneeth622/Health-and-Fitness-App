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

const featuredGroups = [
  {
    id: 1,
    name: 'Yoga & Mindfulness',
    members: 328,
    description: 'Daily meditation and stretching routines',
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800',
  },
  {
    id: 2,
    title: 'Weight Loss Warriors',
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

const groupCategories = [
  {
    id: 1,
    title: 'Strength Training',
    groups: 45,
    icon: 'barbell',
    color: '#4ADE80',
  },
  {
    id: 2,
    title: 'Cardio & HIIT',
    groups: 38,
    icon: 'fitness',
    color: '#F472B6',
  },
  {
    id: 3,
    title: 'Yoga & Wellness',
    groups: 32,
    icon: 'body',
    color: '#60A5FA',
  },
  {
    id: 4,
    title: 'Nutrition',
    groups: 28,
    icon: 'nutrition',
    color: '#FBBF24',
  },
];

const activeGroups = [
  {
    id: 1,
    name: 'Morning Yoga Flow',
    members: 156,
    activeNow: 12,
    nextEvent: 'Group Session Tomorrow 7 AM',
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800',
  },
  {
    id: 2,
    name: '30-Day HIIT Challenge',
    members: 234,
    activeNow: 28,
    nextEvent: 'Live Workout Today 6 PM',
    image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800',
  },
];

export default function PopularGroups() {
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
            <Text style={styles.headerTitle}>Popular Groups</Text>
            <Text style={styles.headerSubtitle}>
              Join communities that match your interests
            </Text>
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={styles.content}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        {/* Featured Groups */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Groups</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredGroups.map((group, index) => (
              <Animated.View
                key={group.id}
                entering={FadeInRight.delay(index * 100)}>
                <TouchableOpacity style={styles.featuredCard}>
                  <Image source={{ uri: group.image }} style={styles.featuredImage} />
                  <View style={styles.featuredOverlay}>
                    <View style={styles.featuredContent}>
                      <Text style={styles.featuredName}>{group.name}</Text>
                      <Text style={styles.featuredDescription}>
                        {group.description}
                      </Text>
                      <View style={styles.memberCount}>
                        <Ionicons name="people" size={16} color="#4ADE80" />
                        <Text style={styles.memberText}>
                          {group.members} members
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        {/* Group Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse by Category</Text>
          <View style={styles.categoriesGrid}>
            {groupCategories.map((category, index) => (
              <Animated.View
                key={category.id}
                entering={FadeInDown.delay(index * 100)}
                style={styles.categoryWrapper}>
                <TouchableOpacity style={styles.categoryCard}>
                  <View
                    style={[
                      styles.categoryIcon,
                      { backgroundColor: category.color },
                    ]}>
                    <Ionicons name={category.icon} size={24} color="#fff" />
                  </View>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <Text style={styles.categoryCount}>
                    {category.groups} groups
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* Active Groups */}
        <View style={[styles.section, styles.lastSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Now</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <Ionicons name="arrow-forward" size={16} color="#4ADE80" />
            </TouchableOpacity>
          </View>
          {activeGroups.map((group, index) => (
            <Animated.View
              key={group.id}
              entering={FadeInDown.delay(index * 100)}>
              <TouchableOpacity style={styles.activeCard}>
                <Image source={{ uri: group.image }} style={styles.activeImage} />
                <View style={styles.activeInfo}>
                  <View>
                    <Text style={styles.activeName}>{group.name}</Text>
                    <View style={styles.activeStats}>
                      <View style={styles.statItem}>
                        <Ionicons name="people" size={16} color="#4ADE80" />
                        <Text style={styles.statText}>
                          {group.members} members
                        </Text>
                      </View>
                      <View style={styles.statItem}>
                        <Ionicons name="radio" size={16} color="#4ADE80" />
                        <Text style={styles.statText}>
                          {group.activeNow} active now
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.eventContainer}>
                    <Ionicons name="calendar" size={16} color="#FBBF24" />
                    <Text style={styles.eventText}>{group.nextEvent}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </Animated.ScrollView>

      {/* Create Group FAB */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={24} color="#121212" />
        <Text style={styles.fabText}>Create Group</Text>
      </TouchableOpacity>
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
  featuredCard: {
    width: width * 0.7,
    height: 200,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  featuredContent: {
    padding: 16,
  },
  featuredName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 4,
  },
  featuredDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  memberCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  memberText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4ADE80',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryWrapper: {
    width: (width - 60) / 2,
  },
  categoryCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  activeCard: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    height: 120,
  },
  activeImage: {
    width: 120,
    height: '100%',
  },
  activeInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  activeName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 8,
  },
  activeStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4ADE80',
  },
  eventContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  eventText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FBBF24',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#4ADE80',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 28,
    gap: 8,
  },
  fabText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#121212',
  },
});