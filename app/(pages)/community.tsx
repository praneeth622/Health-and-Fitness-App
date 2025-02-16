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

const categories = [
  {
    id: 1,
    title: 'Nutrition',
    topics: 450,
    icon: 'nutrition',
    color: '#4ADE80',
  },
  {
    id: 2,
    title: 'Training',
    topics: 328,
    icon: 'barbell',
    color: '#F472B6',
  },
  {
    id: 3,
    title: 'Recovery',
    topics: 245,
    icon: 'bed',
    color: '#60A5FA',
  },
  {
    id: 4,
    title: 'Motivation',
    topics: 189,
    icon: 'flame',
    color: '#FBBF24',
  },
];

const trendingTopics = [
  {
    id: 1,
    title: 'Best Pre-Workout Meals?',
    author: {
      name: 'Sarah',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800',
    },
    replies: 45,
    likes: 128,
    time: '2 hours ago',
  },
  {
    id: 2,
    title: 'How to improve running form?',
    author: {
      name: 'Mike',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800',
    },
    replies: 32,
    likes: 95,
    time: '4 hours ago',
  },
];

const experts = [
  {
    id: 1,
    name: 'Dr. Emily',
    role: 'Nutritionist',
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800',
  },
  {
    id: 2,
    name: 'Coach John',
    role: 'Fitness Trainer',
    rating: 4.8,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
  },
  {
    id: 3,
    name: 'Anna',
    role: 'Yoga Instructor',
    rating: 4.9,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800',
  },
];

export default function CommunityForum() {
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
            <Text style={styles.headerTitle}>Community Forum</Text>
            <Text style={styles.headerSubtitle}>
              Join discussions and get expert advice
            </Text>
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={styles.content}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse Topics</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category, index) => (
              <Animated.View
                key={category.id}
                entering={FadeInRight.delay(index * 100)}>
                <TouchableOpacity style={styles.categoryCard}>
                  <View
                    style={[
                      styles.categoryIcon,
                      { backgroundColor: category.color },
                    ]}>
                    <Ionicons name={category.icon} size={24} color="#fff" />
                  </View>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <Text style={styles.categoryTopics}>
                    {category.topics} topics
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        {/* Trending Topics */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Discussions</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <Ionicons name="arrow-forward" size={16} color="#4ADE80" />
            </TouchableOpacity>
          </View>
          {trendingTopics.map((topic, index) => (
            <Animated.View
              key={topic.id}
              entering={FadeInDown.delay(index * 100)}>
              <TouchableOpacity style={styles.topicCard}>
                <View style={styles.topicHeader}>
                  <Image
                    source={{ uri: topic.author.image }}
                    style={styles.authorImage}
                  />
                  <View style={styles.topicInfo}>
                    <Text style={styles.topicTitle}>{topic.title}</Text>
                    <Text style={styles.authorName}>by {topic.author.name}</Text>
                  </View>
                </View>
                <View style={styles.topicStats}>
                  <View style={styles.topicStat}>
                    <Ionicons
                      name="chatbubble-outline"
                      size={16}
                      color="#4ADE80"
                    />
                    <Text style={styles.statText}>{topic.replies} replies</Text>
                  </View>
                  <View style={styles.topicStat}>
                    <Ionicons name="heart-outline" size={16} color="#4ADE80" />
                    <Text style={styles.statText}>{topic.likes} likes</Text>
                  </View>
                  <Text style={styles.topicTime}>{topic.time}</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* Expert Advice */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Ask the Experts</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {experts.map((expert, index) => (
              <Animated.View
                key={expert.id}
                entering={FadeInRight.delay(index * 100)}>
                <TouchableOpacity style={styles.expertCard}>
                  <Image source={{ uri: expert.image }} style={styles.expertImage} />
                  <Text style={styles.expertName}>{expert.name}</Text>
                  <Text style={styles.expertRole}>{expert.role}</Text>
                  <View style={styles.expertStats}>
                    <View style={styles.rating}>
                      <Ionicons name="star" size={16} color="#FBBF24" />
                      <Text style={styles.ratingText}>{expert.rating}</Text>
                    </View>
                    <Text style={styles.reviews}>
                      {expert.reviews} reviews
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.askButton}>
                    <Text style={styles.askButtonText}>Ask a Question</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </View>
      </Animated.ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={24} color="#121212" />
        <Text style={styles.fabText}>New Post</Text>
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
  categoryCard: {
    width: width * 0.4,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
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
  categoryTopics: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  topicCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  topicInfo: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 4,
  },
  authorName: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  topicStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topicStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    gap: 4,
  },
  statText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4ADE80',
  },
  topicTime: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
    marginLeft: 'auto',
  },
  expertCard: {
    width: width * 0.6,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
  },
  expertImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  expertName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 4,
  },
  expertRole: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 12,
  },
  expertStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#F BBF24',
  },
  reviews: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  askButton: {
    backgroundColor: '#4ADE80',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  askButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#121212',
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