import React from "react";
import {
  View,
  Button,
  TextField,
  ChipsInput,
  Wizard,
  DateTimePicker,
} from "react-native-ui-lib";
import { FlatGrid } from "react-native-super-grid";
import ProjectTile from "../ProjectTile";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import search from "/assets/search.png";
import MenuPopover from "../MenuPopover";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { Typography } from "react-native-ui-lib";
import * as Clipboard from "expo-clipboard";
import uuid from "react-native-uuid";
import join from "/assets/join.png";

const Dashboard = createNativeStackNavigator();

const DashboardScreen = ({ navigation }) => {
  return (
    <Dashboard.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0080FF" },
        headerShadowVisible: false,
      }}
    >
      <Dashboard.Screen
        name="DashboardMain"
        options={{
          title: "",
          headerLeft: () => <MenuPopover />,
          headerRight: () => (
            <View height="100%" row center>
              <Button
                round
                size="large"
                iconStyle={{ width: 28, height: 28 }}
                iconSource={search}
                link
                linkColor="black"
              />
              <Button
                round
                size="large"
                iconSource={join}
                iconStyle={{ height: 28, width: 28 }}
                link
                linkColor="black"
              />
            </View>
          ),
        }}
      >
        {(props) => (
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
              style={{ position: "absolute", top: "92%", left: "84%" }}
              round
              text60BL
              backgroundColor="#0080FF"
              label="+"
              onPress={() => {
                navigation.navigate("DashboardCreateProject");
              }}
            />
          </View>
        )}
      </Dashboard.Screen>
      <Dashboard.Screen
        options={{
          title: "",
        }}
        name="DashboardCreateProject"
      >
        {(props) => (
          <View flex backgroundColor="#0080FF" padding-10>
            <TextInput
              placeholder="Project Name"
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                padding: 10,
                ...Typography.text60,
              }}
            />
            <View height={200} bg-white br20 marginV-10 flex-1>
              <TextInput
                multiline={true}
                placeholder="Description"
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: 10,
                  ...Typography.text60,
                }}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                backgroundColor: "white",
                padding: 10,
                borderRadius: 10,
                marginVertical: 10,
              }}
            >
              <Text style={Typography.text60}>Copy ID to clipboard</Text>
              <Text style={Typography.text70}>
                You can share it to invite collaborators!
              </Text>
              <Text>{uuid.v4()}</Text>
            </TouchableOpacity>
            <Button
              labelStyle={Typography.text60}
              color="#0080FF"
              backgroundColor="white"
              marginV-10
              label="Create"
            />
          </View>
        )}
      </Dashboard.Screen>
    </Dashboard.Navigator>
  );
};

export default DashboardScreen;
