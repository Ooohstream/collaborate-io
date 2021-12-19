import React from "react";
import { View, Text, Typography, TouchableOpacity } from "react-native-ui-lib";
import { useTheme } from "@react-navigation/native";

const ProjectTile = (props) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      {...props}
      style={{
        height: 130,
        backgroundColor: colors.main,
        flex: 1,
        borderRadius: 10,
        justifyContent: "flex-end",
        alignItems: "center",
      }}
      activeOpacity={0.7}
    >
      <View flex-1 center flexG>
        <Text style={{ ...Typography.text60, color: colors.secondary }}>
          {props.item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProjectTile;
