import { View, Text } from "react-native";
import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserScreen from "../screens/UserScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ConfirmEmailScreen from "../screens/ConfirmEmailScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import NewPasswordScreen from "../screens/NewPasswordScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import AddFoodScreen from "../screens/AddFoodScreen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={UserScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
      <Stack.Screen
        // options={{
        //   gestureEnabled: false,
        //   headerShown: false,
        //   headerLeft: () => <></>,
        //   headerRight: () => (
        //     <Icon.Button
        //       name="account-edit"
        //       size={25}
        //       backgroundColor="#000"
        //       onPress={() => navigation.openDrawer()}
        //     />
        //   ),
        // }}
        name="Profile"
        component={ProfileScreen}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="AddFood" component={AddFoodScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
