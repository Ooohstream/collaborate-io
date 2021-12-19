import { useTheme } from "@react-navigation/native";
import axios from "axios";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Chip,
  Checkbox,
  Typography,
} from "react-native-ui-lib";
import PROXY from "../proxyConfig";

const TaskItem = ({ task, setCategories, category, navigation, projectId }) => {
  const handleCheck = async () => {
    const { data } = await axios.put(`${PROXY}/task/set-done`, {
      projectId,
      categoryId: category,
      id: task.id,
    });
    setCategories(data);
  };

  const { colors } = useTheme();

  return (
    <View
      key={task.id}
      backgroundColor={colors.secondary}
      row
      br50
      padding-20
      marginV-5
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("EditTaskScreen", { projectId, category, task });
        }}
        activeOpacity={0.6}
        flex-1
        spread
      >
        <Text style={{ ...Typography.text60, color: colors.main }}>
          {task.name}
        </Text>
        <Text
          style={{
            ...Typography.text70BO,
            marginVertical: 5,
            color: colors.placeholder,
          }}
        >
          {task.description}
        </Text>
        <View flex row marginT-5 style={{ flexWrap: "wrap" }}>
          {task.workers.map((worker, index) => (
            <Chip
              key={worker.id}
              label={worker.name}
              labelStyle={{ color: colors.black }}
              containerStyle={{
                marginHorizontal: index === 0 ? 0 : 5,
                marginVertical: 5,
                borderColor: colors.black,
              }}
            />
          ))}
        </View>
      </TouchableOpacity>
      <View
        center
        br10
        style={{
          width: 100,
          borderLeftColor: task.badgeColor,
          borderLeftWidth: 5,
        }}
      >
        <Checkbox
          onValueChange={(e) => handleCheck(e)}
          value={task.isDone}
          color={colors.main}
        />
      </View>
    </View>
  );
};

export default TaskItem;
