import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const color = 'rgb(92, 6, 53)';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}
      initialRouteName="map"
      >
      <Tabs.Screen
        name="map"
        options={{
          title: 'map',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="map" color={color} />,
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: 'list',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="format-list-bulleted" color={color} />
        }}
      />
    </Tabs>
  );
}
