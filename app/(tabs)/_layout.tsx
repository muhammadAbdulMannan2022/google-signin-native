import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Google',
          tabBarIcon: ({ color }) => (
            <Ionicons name="logo-google" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="facebook"
        options={{
          title: 'Facebook',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="facebook-square" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stripe"
        options={{
          title: 'Pay',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="credit-card-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
