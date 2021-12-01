import React from "react";
import { Icon, View, Text } from "react-native-ui-lib";
import appLogo from "/assets/logo.png";

const LoadingScreen = () => {
  return (
    <View flex center>
      <Icon tintColor={"#0080FF"} size={100} source={appLogo} />
      <Text text60 black>
        Collaborate.io
      </Text>
    </View>
  );
};

export default LoadingScreen;
