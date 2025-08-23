import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const wife_color = "rgb(210, 26, 127)";
  const husband_color = "rgb(0, 115, 176)";

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
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Me',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="face-woman-shimmer" color={color} />,
          tabBarActiveTintColor: wife_color,
        }}
      />
      <Tabs.Screen
        name="husband"
        options={{
          title: 'Josh',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="face-man" color={color} />,
          tabBarActiveTintColor: husband_color,
        }}
      />
    </Tabs>
  );
}
