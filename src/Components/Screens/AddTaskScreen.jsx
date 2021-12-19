import React, { useState, useEffect } from "react";
import {
  View,
  Typography,
  Button,
  ListItem,
  ColorPalette,
  DateTimePicker,
} from "react-native-ui-lib";
import { TextInput, ScrollView, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import PROXY from "../../proxyConfig";
import uuid from "react-native-uuid";
import i18n from "../../Translation/i18n";
import { useTheme } from "@react-navigation/native";

const AddTaskScreen = ({ route, navigation, setCategories }) => {
  const [projectWorkers, setProjectWorkers] = useState([]);
  const [addTaskForm, setAddTaskForm] = useState({
    name: "",
    description: "",
    badgeColor: "",
    workers: [],
    deadline: {
      date: undefined,
      time: undefined,
    },
  });
  const { colors } = useTheme();

  useEffect(() => {
    const loadWorkers = async () => {
      const { data } = await axios.get(`${PROXY}/project/workers`, {
        params: {
          projectId: route.params.projectId,
        },
      });
      setProjectWorkers(
        [...data].map((executor) => ({ ...executor, isExecutor: false }))
      );
    };
    loadWorkers();
  }, []);

  const handleAdd = async () => {
    const { data } = await axios.post(`${PROXY}/tasks/add`, {
      projectId: route.params.projectId,
      categoryId: route.params.categoryId,
      task: {
        ...addTaskForm,
        workers: projectWorkers.filter((worker) => worker.isExecutor === true),
        id: uuid.v4(),
      },
    });
    setCategories(data);
    navigation.goBack();
  };

  return (
    <View flex backgroundColor={colors.main} padding-10>
      <TextInput
        value={addTaskForm.name}
        placeholder={i18n.t("TaskNamePlaceholder")}
        placeholderTextColor={colors.placeholder}
        style={{
          backgroundColor: colors.secondary,
          borderRadius: 10,
          padding: 10,
          ...Typography.text60,
          marginBottom: 10,
        }}
        onChangeText={(e) => {
          setAddTaskForm({ ...addTaskForm, name: e });
        }}
      />
      <View
        style={{ minHeight: 100 }}
        backgroundColor={colors.secondary}
        br20
        marginV-10
      >
        <TextInput
          multiline
          placeholder={i18n.t("TaskDescriptionPlaceholder")}
          placeholderTextColor={colors.placeholder}
          style={{
            backgroundColor: colors.secondary,
            borderRadius: 10,
            padding: 10,
            ...Typography.text60,
          }}
          value={addTaskForm.description}
          onChangeText={(e) => {
            setAddTaskForm({ ...addTaskForm, description: e });
          }}
        />
      </View>
      <View
        backgroundColor={colors.secondary}
        br20
        padding-10
        marginV-10
        flex-1
        style={{ minHeight: 150 }}
      >
        <Text style={{ ...Typography.text60, marginBottom: 10 }}>
          {i18n.t("AssignExecutors")}
        </Text>
        <ScrollView backgroundColor={colors.secondary}>
          {projectWorkers.map((worker) => (
            <TouchableOpacity
              key={worker.id}
              style={{
                borderWidth: 1,
                borderColor: worker.isExecutor ? colors.accent : colors.main,
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                marginVertical: 10,
                borderRadius: 10,
              }}
              activeOpacity={0.7}
              onPress={() => {
                setProjectWorkers((prev) => {
                  const previousWorkers = [...prev];
                  previousWorkers.find(
                    (executor) => executor.id === worker.id
                  ).isExecutor = !previousWorkers.find(
                    (executor) => executor.id === worker.id
                  ).isExecutor;
                  return previousWorkers;
                });
              }}
            >
              <Text style={{ ...Typography.text60, color: colors.main }}>
                {worker.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ColorPalette
        value={addTaskForm.badgeColor}
        onValueChange={(val) => {
          setAddTaskForm({ ...addTaskForm, badgeColor: val });
        }}
        containerStyle={{
          backgroundColor: colors.secondary,
          borderRadius: 10,
          marginVertical: 10,
        }}
        style={{ backgroundColor: colors.secondary }}
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
      <View>
        <Text
          style={{
            ...Typography.text50,
            marginBottom: 10,
            color: colors.secondary,
            padding: 5,
          }}
        >
          {i18n.t("Deadline")}
        </Text>
        <DateTimePicker
          placeholder={i18n.t("Date")}
          placeholderTextColor={colors.attention}
          hideUnderline
          style={{
            backgroundColor: colors.secondary,
            padding: 10,
            borderRadius: 10,
            ...Typography.text60,
          }}
          is24Hour
          onChange={(e) => {
            setAddTaskForm({
              ...addTaskForm,
              deadline: { ...addTaskForm.deadline, date: e },
            });
          }}
          value={addTaskForm.deadline.date}
          minimumDate={new Date(Date.now())}
          timezoneOffsetInMinutes={180}
        />
        <DateTimePicker
          placeholder={i18n.t("Time")}
          placeholderTextColor={colors.attention}
          hideUnderline
          style={{
            backgroundColor: colors.secondary,
            padding: 10,
            borderRadius: 10,
            ...Typography.text60,
          }}
          mode="time"
          onChange={(e) => {
            setAddTaskForm({
              ...addTaskForm,
              deadline: { ...addTaskForm.deadline, time: e },
            });
          }}
          is24Hour
          value={addTaskForm.deadline.time}
          minimumDate={new Date(Date.now())}
          timezoneOffsetInMinutes={180}
        />
      </View>

      <Button
        labelStyle={Typography.text60}
        color={colors.secondary}
        backgroundColor={colors.accent}
        marginV-10
        label={i18n.t("AddTaskButton")}
        onPress={() => {
          handleAdd();
        }}
      />
    </View>
  );
};

export default AddTaskScreen;
