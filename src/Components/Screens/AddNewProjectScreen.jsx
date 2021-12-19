import React from "react";
import { View, Typography, Button } from "react-native-ui-lib";
import { Text, TextInput, TouchableOpacity } from "react-native";
import uuid from "react-native-uuid";
import axios from "axios";
import PROXY from "../../proxyConfig";
import { useState } from "react/cjs/react.development";
import { useSelector } from "react-redux";
import i18n from "../../Translation/i18n";
import { useTheme } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";

const AddNewProjectScreen = ({ navigation, setProjects, projects }) => {
  const user = useSelector((state) => state.auth);
  const { colors } = useTheme();
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
    <View flex backgroundColor={colors.main} padding-10>
      <TextInput
        placeholder={i18n.t("ProjectNamePlaceholder")}
        placeholderTextColor={colors.placeholder}
        style={{
          backgroundColor: colors.secondary,
          borderRadius: 10,
          padding: 10,
          ...Typography.text60,
        }}
        value={addProjectForm.name}
        onChangeText={(e) => {
          setAddProjectForm({ ...addProjectForm, name: e });
        }}
      />
      <View
        height={200}
        backgroundColor={colors.secondary}
        br20
        marginV-10
        flex-1
      >
        <TextInput
          multiline={true}
          placeholder={i18n.t("ProjectDescriptionPlaceholder")}
          placeholderTextColor={colors.placeholder}
          style={{
            backgroundColor: colors.secondary,
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
          backgroundColor: colors.secondary,
          padding: 10,
          borderRadius: 10,
          marginVertical: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => Clipboard.setString(addProjectForm.id)}
      >
        <Text
          style={{
            ...Typography.text60,
            color: colors.black,
            textAlign: "center",
          }}
        >
          {i18n.t("ProjectYouCanShare")}
        </Text>
        <Text
          style={{
            ...Typography.text70,
            color: colors.black,
            textAlign: "center",
          }}
        >
          {addProjectForm.id}
        </Text>
      </TouchableOpacity>
      <Button
        labelStyle={{ ...Typography.text60, color: colors.secondary }}
        backgroundColor={colors.accent}
        marginV-10
        label={i18n.t("ProjectCreateButton")}
        onPress={() => {
          handleCreate();
        }}
      />
    </View>
  );
};

export default AddNewProjectScreen;
