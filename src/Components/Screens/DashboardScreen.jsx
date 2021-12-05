import React from "react";
import { View, Button } from "react-native-ui-lib";
import { FlatGrid } from "react-native-super-grid";
import ProjectTile from "../ProjectTile";

const DashboardScreen = ({ navigation }) => {
  return (
    <View flex flexG bg-grey70>
      <FlatGrid
        style={{ position: "relative" }}
        itemDimension={130}
        data={["Project", "Another Project", "Project"]}
        renderItem={({ item }) => (
          <ProjectTile
            item={item}
            onPress={() => {
              navigation.navigate("ProjectScreen");
            }}
          />
        )}
      />
      <Button
        style={{
          position: "absolute",
          top: "90%",
          left: "85%",
          justifyContent: "center",
          alignItems: "center",
        }}
        labelStyle={{ fontWeight: "600", fontSize: 25 }}
        round
        label="+"
      />
    </View>
  );
};

export default DashboardScreen;
