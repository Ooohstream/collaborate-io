import React, { useEffect, useState } from "react";
import { View, Text, Button, Typography, Chip } from "react-native-ui-lib";
import { TextInput, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";
import PROXY from "../../proxyConfig";
import i18n from "../../Translation/i18n";
import { useTheme } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";

const ProjectSettingsScreen = ({ route, navigation, setProjects }) => {
  const id = useSelector((state) => state.auth.id);
  const [editProjectForm, setEditProjectForm] = useState({});
  const { colors } = useTheme();

  useEffect(() => {
    const init = async () => {
      const { data } = await axios.get(`${PROXY}/project`, {
        params: {
          id: route.params.id,
        },
      });
      setEditProjectForm({
        name: data.name,
        description: data.description,
        id: data.id,
        owner: data.workers.find((worker) => worker.id === data.owner),
      });
    };
    init();
  }, []);

  const handleSave = async () => {
    const { data } = await axios.put(`${PROXY}/projects/edit`, {
      id: route.params.id,
      name: editProjectForm.name,
      description: editProjectForm.description,
      userId: id,
    });
    setProjects(data);
    navigation.goBack();
  };

  return (
    <View flex backgroundColor={colors.main} padding-10>
      <TextInput
        placeholder={i18n.t("ProjectNamePlaceholder")}
        placeholderTextColor={colors.placeholder}
        value={editProjectForm?.name}
        onChangeText={(e) => {
          setEditProjectForm({ ...editProjectForm, name: e });
        }}
        style={{
          backgroundColor: colors.secondary,
          borderRadius: 10,
          padding: 10,
          ...Typography.text60,
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
          value={editProjectForm?.description}
          onChangeText={(e) => {
            setEditProjectForm({ ...editProjectForm, description: e });
          }}
          placeholder={i18n.t("ProjectDescriptionPlaceholder")}
          placeholderTextColor={colors.placeholder}
          style={{
            backgroundColor: colors.secondary,
            borderRadius: 10,
            padding: 10,
            ...Typography.text60,
          }}
        />
      </View>
      <View
        style={{
          padding: 10,
          borderRadius: 10,
          marginVertical: 10,
        }}
        backgroundColor={colors.secondary}
      >
        <Text style={Typography.text60}>{`${i18n.t("ProjectOwner")}: ${
          editProjectForm?.owner?.name
        }`}</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          backgroundColor: colors.secondary,
          padding: 10,
          borderRadius: 10,
          marginVertical: 10,
        }}
        onPress={() => Clipboard.setString(editProjectForm.id)}
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
          {editProjectForm?.id}
        </Text>
      </TouchableOpacity>
      <Button
        labelStyle={Typography.text60}
        color={colors.secondary}
        backgroundColor={colors.accent}
        marginV-10
        label={i18n.t("ProjectSaveButton")}
        onPress={() => handleSave()}
      />
    </View>
  );
};

export default ProjectSettingsScreen;
