import React from "react";
import {
  View,
  Typography,
  Button,
  ListItem,
  ColorSwatch,
  ColorPicker,
  ColorPalette,
  DateTimePicker,
} from "react-native-ui-lib";
import { TextInput, TouchableOpacity, Text, ScrollView } from "react-native";

const EditTaskScreen = () => {
  return (
    <View flex backgroundColor="#0080FF" padding-10>
      <TextInput
        placeholder="Task"
        style={{
          backgroundColor: "white",
          borderRadius: 10,
          padding: 10,
          ...Typography.text60,
          marginBottom: 10,
        }}
      />
      <View style={{ minHeight: 200 }} bg-white br20 marginV-10 flex-1>
        <TextInput
          multiline
          placeholder="Description"
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            padding: 10,
            ...Typography.text60,
          }}
        />
      </View>
      <View
        style={{ minHeight: 100 }}
        flex-1
        bg-white
        br20
        padding-10
        marginV-10
      >
        <Text style={{ ...Typography.text60, borderBottomWidth: 5 }}>
          Executors
        </Text>
        <ScrollView>
          <ListItem></ListItem>
        </ScrollView>
      </View>
      <ColorPalette
        containerStyle={{ borderRadius: 10, marginVertical: 10 }}
        colors={[
          "#007bff",
          "#6c757d",
          "#28a745",
          "#dc3545",
          "#ffc107",
          "#17a2b8",
          "#f8f9fa",
          "#212529",
        ]}
      />
      <DateTimePicker
        placeholder="Deadline"
        placeholderTextColor="#dc3545"
        hideUnderline
        style={{
          backgroundColor: "white",
          padding: 10,
          marginVertical: 10,
          borderRadius: 10,
          ...Typography.text60,
        }}
        minimumDate={new Date(Date.now())}
      />
      <Button
        labelStyle={Typography.text60}
        color="#0080FF"
        backgroundColor="white"
        marginV-10
        label="Save"
      />
      <Button
        labelStyle={Typography.text60}
        color="#28a745"
        backgroundColor="white"
        marginV-10
        label="Commit task"
      />
    </View>
  );
};

export default EditTaskScreen;
