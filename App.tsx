import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MonitorScreen from './src/screens/MonitorScreen';
import TimerScreen from './src/screens/TimerScreen';
import ChartScreen from './src/screens/ChartScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyBPOWmLWorktIvwTA5pq93P3NcGGXi6_hw",
  authDomain: "vietlongpro1999.firebaseapp.com",
  databaseURL: "https://vietlongpro1999-default-rtdb.firebaseio.com",
  projectId: "vietlongpro1999",
  storageBucket: "vietlongpro1999.appspot.com",
  messagingSenderId: "186658120354",
  appId: "1:186658120354:web:24ecfe73e43d9a88daedfb",
  measurementId: "G-1JQBC7VKX0"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Monitor">
        <Tab.Screen name="Monitor" 
          component={MonitorScreen}
          options={{
            title: "Monitor",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="monitor" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Timer"
          component={TimerScreen}
          options={{
            title: "Timer",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="clock" color={color} size={size} />
            ),
          }}
          />
          <Tab.Screen
            name="Chart"
            component={ChartScreen}
            options={{
              title: "Chart",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="chart-bar" color={color} size={size} />
              ),
            }}
            />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
