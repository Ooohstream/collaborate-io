import React from "react";
import { Icon, View, Text } from "react-native-ui-lib";
import appLogo from "/assets/logo.png";

const LoadingScreen = () => {
  return (
    <View flex center backgroundColor="#0080FF">
      <Icon tintColor={"white"} size={100} source={appLogo} />
      <Text text60 white>
        Collaborate.io
      </Text>
    </View>
  );
};

export default LoadingScreen;
