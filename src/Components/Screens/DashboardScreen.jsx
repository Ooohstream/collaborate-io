import React from "react";
import { Text, Touchable } from "react-native";
import { View } from "react-native-ui-lib";
import { FlatGrid } from "react-native-super-grid";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-ui-lib";

const DashboardScreen = () => {
  return (
    <View flex flexG bg-grey70>
      <FlatGrid
        style={{ position: "relative" }}
        itemDimension={130}
        data={["Project", 2, 3, 4, 5, 6]}
        renderItem={({ item }) => (
          <TouchableOpacity
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
            <View
              bg-grey50
              flex-1
              centerH
              width="100%"
              style={{ borderRadius: 10 }}
            >
              <Text>{item}</Text>
            </View>
          </TouchableOpacity>
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
