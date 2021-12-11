import React from "react";
import { View, Text, Typography, TouchableOpacity } from "react-native-ui-lib";

const ProjectTile = (props) => {
  return (
    <TouchableOpacity
      {...props}
      style={{
        height: 130,
        backgroundColor: "#fafafa",
        flex: 1,
        borderRadius: 10,
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <View flex-1 bg-grey50 flexG></View>
      <View bg-grey50 flex-1 centerH width="100%" style={{ borderRadius: 10 }}>
        <Text style={Typography.text60}>{props.item}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProjectTile;
