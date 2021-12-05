import React, { useEffect } from "react";
import {
  View,
  Text,
  Colors,
  TextArea,
  DateTimePicker,
  ChipsInput,
  Button,
} from "react-native-ui-lib";

const ProjectSettingsScreen = ({ navigation }) => {
  return (
    <View bg-white abs absF>
      <Text style={{ fontSize: 30 }}>Project name</Text>
      <View
        style={{
          height: 100,
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
          borderColor: Colors.grey60,
        }}
      >
        <TextArea placeholder="Write something.." />
      </View>
      <ChipsInput hideUnderline placeholder="Add project holder" />
      <View row>
        <ChipsInput hideUnderline placeholder="Add worker" />
      </View>
      <DateTimePicker
        placeholder="Add deadline"
        hideUnderline
        title="Deadline"
      />
      <Button
        label="Save"
        onPress={() => setProjectSettingsModal(!projectSettingsModal)}
      />
    </View>
  );
};

export default ProjectSettingsScreen;
