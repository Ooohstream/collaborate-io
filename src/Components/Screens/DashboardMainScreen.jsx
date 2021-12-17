import React from "react";
import { View, Button } from "react-native-ui-lib";
import { useSelector } from "react-redux";
import { FlatGrid } from "react-native-super-grid";
import plus from "/assets/plus.png";
import ProjectTile from "../ProjectTile";

const DashboardMainScreen = ({ navigation, projects }) => {
  return (
    <View flex flexG bg-grey70>
      <FlatGrid
        style={{ position: "relative" }}
        itemDimension={130}
        data={projects}
        renderItem={({ item }) => {
          return (
            <ProjectTile
              item={item}
              onPress={() => {
                navigation.navigate("ProjectScreen", {
                  id: item.id,
                });
              }}
            />
          );
        }}
      />
      <Button
        style={{
          position: "absolute",
          top: "92%",
          left: "84%",
          width: 48,
          height: 48,
        }}
        round
        text60BL
        backgroundColor="white"
        iconSource={plus}
        iconStyle={{ width: 40, height: 40 }}
        onPress={() => {
          navigation.navigate("AddNewProjectScreen");
        }}
      />
    </View>
  );
};

export default DashboardMainScreen;
