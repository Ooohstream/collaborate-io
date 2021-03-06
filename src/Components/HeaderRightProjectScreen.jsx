import React from "react";
import { View, Button } from "react-native-ui-lib";
import project_settings from "assets/projectSettings.png";
import { useTheme } from "@react-navigation/native";

const HeaderRightProjectScreen = (props) => {
  const { colors } = useTheme();

  return (
    <View height="100%" row center>
      <Button
        round
        size="large"
        iconStyle={{ width: 32, height: 32 }}
        iconSource={project_settings}
        link
        linkColor={colors.secondary}
        {...props}
      />
    </View>
  );
};

export default HeaderRightProjectScreen;
