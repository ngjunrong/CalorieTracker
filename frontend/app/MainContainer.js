import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import HomeScreen from "../screens/HomeScreen";
import TDEEScreen from "../screens/TDEEScreen";
import Navigation from ".";
import ProfileScreen from "../screens/ProfileScreen";

// import Icon from "react-native-vector-icons/Ionicons";

//Screen names
const homeName = "Home";
const TDEEName = "TDEE Calculator";
const userName = "User";

const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();
// const ProfileStack = createNativeStackNavigator();
function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === TDEEName) {
              iconName = focused ? "calculator" : "calculator-outline";
            } else if (rn === userName) {
              iconName = focused ? "person" : "person-outline";
            }

            // You can return any component that you like here
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "grey",
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70 },
        }}
      >
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={TDEEName} component={TDEEScreen} />
        <Tab.Screen name={userName} component={Navigation} />
        {/* <Tab.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarColor: "#694fad",
            tabBarIcon: ({ color }) => (
              <Icon name="ios-person" color={color} size={26} />
            ),
          }}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;

// const ProfileStackScreen = ({ navigation }) => {
//   <ProfileStack.Navigator
//     screenOptions={{
//       headerStyle: {
//         backgroundColor: "#fff",
//       },
//       headerTintColor: "#000",
//       headerTitleStyle: {
//         fontWeight: "bold",
//       },
//     }}
//   >
//     <ProfileStack.Screen
//       name="Profile"
//       component={ProfileScreen}
//       options={{
//         headerLeft: () => (
//           <Icon.Button
//             name="ios-menu"
//             size={25}
//             backgroundColor="#000"
//             onPress={() => navigation.openDrawer()}
//           />
//         ),
//       }}
//     />
//   </ProfileStack.Navigator>;
// };
