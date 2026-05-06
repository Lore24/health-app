import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { configureHandler } from '../src/notifications/schedule';
import { colors } from '../src/theme';

export default function RootLayout() {
  useEffect(() => {
    configureHandler();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.cream }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.cream },
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="recipe/[id]"
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
              contentStyle: { backgroundColor: colors.cream },
            }}
          />
          <Stack.Screen
            name="exercise/[id]"
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
              contentStyle: { backgroundColor: colors.cream },
            }}
          />
          <Stack.Screen
            name="settings/supplements"
            options={{ contentStyle: { backgroundColor: colors.cream } }}
          />
          <Stack.Screen
            name="settings/food-guidelines"
            options={{ contentStyle: { backgroundColor: colors.cream } }}
          />
          <Stack.Screen
            name="settings/grocery"
            options={{ contentStyle: { backgroundColor: colors.cream } }}
          />
          <Stack.Screen
            name="settings/tips"
            options={{ contentStyle: { backgroundColor: colors.cream } }}
          />
          <Stack.Screen
            name="settings/app"
            options={{ contentStyle: { backgroundColor: colors.cream } }}
          />
          <Stack.Screen
            name="log/weight"
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
              contentStyle: { backgroundColor: colors.cream },
            }}
          />
          <Stack.Screen
            name="log/injection"
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
              contentStyle: { backgroundColor: colors.cream },
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
