import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CalendarScreen from './screen/calendar'
// import FriendScreen from './screen/friend'
//import Mypage from './screen/mypage'


function FriendScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Friend</Text>
    </View>
  );
}
/*
function CalendarScreen({}) {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>calendar</Text>
      </View>
  );
}
*/
function Mypage() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Mypage</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="calendar">
        <Tab.Screen name="friend" component={FriendScreen} />
        <Tab.Screen name="calendar" component={CalendarScreen} />
        <Tab.Screen name="mypage" component={Mypage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}