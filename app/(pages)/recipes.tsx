import React, { useState } from 'react';
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
    title: 'Breakfast',
    description: 'Start your day right',
    icon: 'sunny',
    color: '#4ADE80',
  },
  {
    id: 2,
    title: 'Lunch',
    description: 'Energizing meals',
    icon: 'restaurant',
    color: '#F472B6',
  },
  {
    id: 3,
    title: 'Dinner',
    description: 'Healthy & satisfying',
    icon: 'moon',
    color: '#60A5FA',
  },
  {
    id: 4,
    title: 'Snacks',
    description: 'Smart choices',
    icon: 'nutrition',
    color: '#FBBF24',
  },
];

const featuredRecipes = [
  {
    id: 1,
    title: 'Overnight Oats',
    category: 'Breakfast',
    time: '10 min',
    calories: 350,
    protein: '15g',
    image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=800',
  },
  {
    id: 2,
    title: 'Quinoa Buddha Bowl',
    category: 'Lunch',
    time: '20 min',
    calories: 450,
    protein: '20g',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
  },
  {
    id: 3,
    title: 'Grilled Salmon',
    category: 'Dinner',
    time: '25 min',
    calories: 380,
    protein: '32g',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
  },
];

const dietaryPreferences = [
  {
    id: 1,
    title: 'Vegan',
    recipes: 120,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
  },
  {
    id: 2,
    title: 'Keto',
    recipes: 85,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800',
  },
  {
    id: 3,
    title: 'High Protein',
    recipes: 150,
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800',
  },
];

export default function HealthyRecipes() {
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
          source={{ uri: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800' }}
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
            <Text style={styles.headerTitle}>Healthy Recipes</Text>
            <Text style={styles.headerSubtitle}>
              Discover nutritious and delicious meals
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
          <Text style={styles.sectionTitle}>Browse by Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category, index) => (
              <Animated.View
                key={category.id}
                entering={FadeInRight.delay(index * 100)}>
                <TouchableOpacity style={styles.categoryCard}>
                  <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                    <Ionicons name={category.icon} size={24} color="#fff" />
                  </View>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <Text style={styles.categoryDescription}>
                    {category.description}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        {/* Featured Recipes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Recipes</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <Ionicons name="arrow-forward" size={16} color="#4ADE80" />
            </TouchableOpacity>
          </View>
          {featuredRecipes.map((recipe, index) => (
            <Animated.View
              key={recipe.id}
              entering={FadeInDown.delay(index * 100)}>
              <TouchableOpacity style={styles.recipeCard}>
                <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
                <View style={styles.recipeInfo}>
                  <View>
                    <Text style={styles.recipeTitle}>{recipe.title}</Text>
                    <Text style={styles.recipeCategory}>{recipe.category}</Text>
                  </View>
                  <View style={styles.recipeStats}>
                    <View style={styles.recipeStat}>
                      <Ionicons name="time" size={16} color="#4ADE80" />
                      <Text style={styles.recipeStatText}>{recipe.time}</Text>
                    </View>
                    <View style={styles.recipeStat}>
                      <Ionicons name="flame" size={16} color="#4ADE80" />
                      <Text style={styles.recipeStatText}>{recipe.calories} cal</Text>
                    </View>
                    <View style={styles.recipeStat}>
                      <Ionicons name="barbell" size={16} color="#4ADE80" />
                      <Text style={styles.recipeStatText}>{recipe.protein} protein</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* Dietary Preferences */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Dietary Preferences</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dietaryPreferences.map((diet, index) => (
              <Animated.View
                key={diet.id}
                entering={FadeInRight.delay(index * 100)}>
                <TouchableOpacity style={styles.dietCard}>
                  <Image source={{ uri: diet.image }} style={styles.dietImage} />
                  <View style={styles.dietOverlay}>
                    <Text style={styles.dietTitle}>{diet.title}</Text>
                    <Text style={styles.dietRecipes}>{diet.recipes} recipes</Text>
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
  categoryCard: {
    width: width * 0.4,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
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
  categoryDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  recipeCard: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    height: 120,
  },
  recipeImage: {
    width: 120,
    height: '100%',
  },
  recipeInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  recipeTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 4,
  },
  recipeCategory: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  recipeStats: {
    flexDirection: 'row',
    gap: 16,
  },
  recipeStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recipeStatText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4ADE80',
  },
  dietCard: {
    width: width * 0.6,
    height: 160,
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  dietImage: {
    width: '100%',
    height: '100%',
  },
  dietOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 16,
    justifyContent: 'flex-end',
  },
  dietTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 4,
  },
  dietRecipes: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.8)',
  },
});