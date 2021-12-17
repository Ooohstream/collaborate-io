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
    setAddTaskForm({
      ...addTaskForm,
      workers: projectWorkers.filter((worker) => worker.isExecutor === true),
    });
    const { data } = await axios.post(`${PROXY}/tasks/add`, {
      projectId: route.params.projectId,
      categoryId: route.params.categoryId,
      task: { ...addTaskForm, id: uuid.v4() },
    });
    setCategories(data);
    navigation.goBack();
  };

  return (
    <View flex backgroundColor="#0080FF" padding-10>
      <TextInput
        value={addTaskForm.name}
        placeholder="Task"
        style={{
          backgroundColor: "white",
          borderRadius: 10,
          padding: 10,
          ...Typography.text60,
          marginBottom: 10,
        }}
        onChangeText={(e) => {
          setAddTaskForm({ ...addTaskForm, name: e });
        }}
      />
      <View style={{ minHeight: 100 }} bg-white br20 marginV-10>
        <TextInput
          multiline
          placeholder="Description"
          style={{
            backgroundColor: "white",
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
        bg-white
        br20
        padding-10
        marginV-10
        flex-1
        style={{ minHeight: 150 }}
      >
        <Text style={{ ...Typography.text60, borderBottomWidth: 2 }}>
          Assign executors
        </Text>
        <ScrollView>
          {projectWorkers.map((worker) => (
            <TouchableOpacity
              key={worker.id}
              style={{
                borderWidth: 1,
                borderColor: worker.isExecutor ? "#0080FF" : "lightgray",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                marginVertical: 5,
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
              <Text style={Typography.text60}>{worker.name}</Text>
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
          borderRadius: 10,
          marginVertical: 10,
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
          Deadline
        </Text>
        <DateTimePicker
          placeholder="Date"
          placeholderTextColor="#dc3545"
          hideUnderline
          style={{
            backgroundColor: "white",
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
          placeholder="Time"
          placeholderTextColor="#dc3545"
          hideUnderline
          style={{
            backgroundColor: "white",
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
        color="#0080FF"
        backgroundColor="white"
        marginV-10
        label="Add"
        onPress={() => {
          handleAdd();
        }}
      />
    </View>
  );
};

export default AddTaskScreen;
