import { View, Text } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";

const SocialSignInButtons = () => {
  const onSignInFacebook = () => {
    console.warn("onSignInFacebook");
  };
  const onSignInGoogle = () => {
    console.warn("onSignInGoogle");
  };
  const onSignInApple = () => {
    console.warn("onSignInApple");
  };
  return (
    <>
      <CustomButton
        text="Sign in with Facebook"
        onPress={onSignInFacebook}
        bgColor="#E7EAF4"
        fgColor="#4765A9"
      />
      <CustomButton
        text="Sign in with Google"
        onPress={onSignInGoogle}
        bgColor="#FAE9EA"
        fgColor="#DD4D44"
      />
      <CustomButton
        text="Sign in with Apple"
        onPress={onSignInApple}
        bgColor="#E3E3E3"
        fgColor="#363636"
      />
    </>
  );
};

export default SocialSignInButtons;
