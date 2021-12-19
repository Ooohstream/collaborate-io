import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import {
  View,
  Typography,
  Button,
  ColorPalette,
  DateTimePicker,
} from "react-native-ui-lib";
import { TextInput, Text, ScrollView } from "react-native";
import axios from "axios";
import i18n from "../../Translation/i18n";
import { useTheme } from "@react-navigation/native";

const EditTaskScreen = ({ route, navigation, setCategories }) => {
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
    const init = async () => {
      const taskData = await axios.get(`${PROXY}/task`, {
        params: {
          projectId: route.params.projectId,
          categoryId: route.params.category,
          id: route.params.task.id,
        },
      });
      const projectWorkersData = await axios.get(`${PROXY}/project/workers`, {
        params: {
          projectId: route.params.projectId,
        },
      });
      setAddTaskForm({
        ...taskData.data,
        deadline: {
          date: new Date(taskData.data.deadline.date),
          time: new Date(taskData.data.deadline.time),
        },
      });
      setProjectWorkers(
        [...projectWorkersData.data]
          .map((worker) => ({
            ...worker,
            isExecutor: taskData.data.workers.some(
              (executor) => executor.id === worker.id
            ),
          }))
          .sort((x, y) => (x === y ? 0 : x ? -1 : 1))
      );
    };
    init();
  }, []);

  const handleSave = async () => {
    const { data } = await axios.put(`${PROXY}/tasks/edit`, {
      projectId: route.params.projectId,
      categoryId: route.params.category,
      task: {
        ...addTaskForm,
        workers: projectWorkers.filter((worker) => worker.isExecutor === true),
      },
    });
    setCategories(data);
    navigation.goBack();
  };

  const handleRemove = async () => {
    const { data } = await axios.delete(`${PROXY}/tasks/remove`, {
      params: {
        projectId: route.params.projectId,
        categoryId: route.params.category,
        id: route.params.task.id,
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
        style={{ minHeight: 100 }}
      >
        <Text style={{ ...Typography.text60, marginBottom: 18 }}>
          {i18n.t("AssignedExecutors")}
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
                marginVertical: 5,
                borderRadius: 10,
                backgroundColor: colors.card,
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
        backgroundColor={colors.secondary}
        containerStyle={{
          borderRadius: 10,
          marginVertical: 10,
          backgroundColor: colors.secondary,
        }}
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
            color: "white",
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
            color: colors.black,
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
            color: colors.black,
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
        label={i18n.t("SaveChangesToTaskButton")}
        onPress={() => {
          handleSave();
        }}
      />
      <Button
        labelStyle={Typography.text60}
        color={colors.attention}
        backgroundColor={colors.secondary}
        marginV-10
        label={i18n.t("RemoveTaskButton")}
        onPress={() => {
          handleRemove();
        }}
      />
    </View>
  );
};

export default EditTaskScreen;
