import React, { useEffect } from "react";
import { View, Text, Button, Typography, Chip } from "react-native-ui-lib";
import { TextInput, TouchableOpacity } from "react-native";
import uuid from "react-native-uuid";
import { useSelector } from "react-redux";

const ProjectSettingsScreen = ({ navigation }) => {
  const name = useSelector((state) => state.auth.name);

  return (
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
      <Chip
        backgroundColor="white"
        labelStyle={Typography.text50BO}
        label={`Project owner: ${name}`}
        containerStyle={{ borderWidth: 0 }}
      />
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
        label="Save"
      />
    </View>
  );
};

export default ProjectSettingsScreen;
