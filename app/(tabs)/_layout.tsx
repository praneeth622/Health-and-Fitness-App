import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Platform, View } from 'react-native';
import Animated from 'react-native-reanimated';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 24 : 16,
          left: 24,
          right: 24,
          height: 64,
          borderRadius: 32,
          backgroundColor: Platform.OS === 'ios' ? 'rgba(18, 18, 18, 0.7)' : '#121212',
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 12,
        },
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            <BlurView
              tint="dark"
              intensity={30}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 32,
              }}
            />
          ) : null,
        tabBarActiveTintColor: '#4ADE80',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.6)',
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="compass" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="barbell" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}