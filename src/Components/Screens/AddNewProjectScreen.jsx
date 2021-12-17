import React from "react";
import { View, Typography, Button } from "react-native-ui-lib";
import { Text, TextInput, TouchableOpacity } from "react-native";
import uuid from "react-native-uuid";
import axios from "axios";
import PROXY from "../../proxyConfig";
import { useState } from "react/cjs/react.development";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../../store/projectsSlice";

const AddNewProjectScreen = ({ navigation, setProjects, projects }) => {
  const user = useSelector((state) => state.auth);
  const [addProjectForm, setAddProjectForm] = useState({
    id: uuid.v4(),
  });
  const handleCreate = async () => {
    const { data } = await axios.post(`${PROXY}/projects/add`, {
      ...addProjectForm,
      owner: user.id,
      workers: [{ ...user, isAuth: undefined, photoUrl: undefined }],
    });
    setProjects([...projects, data]);
    navigation.goBack();
  };

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
        value={addProjectForm.name}
        onChangeText={(e) => {
          setAddProjectForm({ ...addProjectForm, name: e });
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
          value={addProjectForm.description}
          onChangeText={(e) => {
            setAddProjectForm({ ...addProjectForm, description: e });
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
        <Text style={Typography.text60}>Press to copy id to clipboard!</Text>
        <Text style={Typography.text70}>
          You can share it to invite collaborators.
        </Text>
        <Text>{addProjectForm.id}</Text>
      </TouchableOpacity>
      <Button
        labelStyle={Typography.text60}
        color="#0080FF"
        backgroundColor="white"
        marginV-10
        label="Create"
        onPress={() => {
          handleCreate();
        }}
      />
    </View>
  );
};

export default AddNewProjectScreen;
