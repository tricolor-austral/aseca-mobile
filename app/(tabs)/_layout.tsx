import {Tabs} from 'expo-router';
import React from 'react';
import {useColorScheme} from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'white',
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: 'black',
                },
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Buy',
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Cart',
                }}
            />
        </Tabs>
    );
}
