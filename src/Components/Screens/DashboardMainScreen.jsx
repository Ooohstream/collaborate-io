import React from "react";
import { View, Button } from "react-native-ui-lib";
import { FlatGrid } from "react-native-super-grid";
import plus from "/assets/plus.png";
import ProjectTile from "../ProjectTile";
import { useTheme } from "@react-navigation/native";

const DashboardMainScreen = ({ navigation, projects, searchTerm }) => {
  const { colors } = useTheme();

  return (
    <View flex flexG style={{ backgroundColor: colors.secondary }}>
      <FlatGrid
        style={{ position: "relative" }}
        itemDimension={200}
        data={projects.filter((project) => project.name.includes(searchTerm))}
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
        link
        linkColor={colors.main}
        iconSource={plus}
        iconStyle={{ width: 48, height: 48 }}
        onPress={() => {
          navigation.navigate("AddNewProjectScreen");
        }}
      />
    </View>
  );
};

export default DashboardMainScreen;
