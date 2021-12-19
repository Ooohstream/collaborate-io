import { useTheme } from "@react-navigation/native";
import React from "react";
import { Icon, View, Text } from "react-native-ui-lib";
import appLogo from "/assets/logo.png";

const LoadingScreen = () => {
  const { colors } = useTheme();

  return (
    <View flex center backgroundColor={colors.main}>
      <Icon tintColor={colors.secondary} size={100} source={appLogo} />
      <Text text60 color={colors.secondary}>
        Collaborate.io
      </Text>
    </View>
  );
};

export default LoadingScreen;
