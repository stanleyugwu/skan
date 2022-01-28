import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Theme } from '@react-navigation/native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { RootState, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  
  const defaultTheme:Theme = {
    dark:false,
    colors:{
      primary: '#6200EE',
      background:'#f4f4f4',
      card:'#6200EE',
      text:'#ffffff',
      border:'#00000099',
      notification:'#ff453a'
    }
  }
  
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : defaultTheme}>
      <BottomTabNavigator/>
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
// const Stack = createNativeStackNavigator<RootStackParamList>();

// function RootNavigator() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
//       {/* <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
//       <Stack.Group screenOptions={{ presentation: 'modal' }}>
//         <Stack.Screen name="Modal" component={ModalScreen} />
//       </Stack.Group> */}
//     </Stack.Navigator>
//   );
// }




/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const favoriteNetwork = useSelector((state:RootState) => state.settings.favoriteNetwork);

  return (
    <BottomTab.Navigator
      initialRouteName={favoriteNetwork ? "Settings" : "Top-Up"}
      screenOptions={{
        tabBarStyle: {backgroundColor:Colors[colorScheme].background},
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarInactiveTintColor:Colors[colorScheme].tabIconDefault
      }}>
      <BottomTab.Screen
        name="Top-Up"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Top-Up'>) => ({
          title: 'Top-Up',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
