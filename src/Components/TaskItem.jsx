import axios from "axios";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Chip,
  Checkbox,
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

  return (
    <View key={task.id} bg-white row br50 padding-20 marginV-5>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("EditTaskScreen", { projectId, category, task });
        }}
        activeOpacity={0.6}
        flex-1
        spread
      >
        <Text style={{ fontSize: 20 }}>{task.name}</Text>
        <Text>{task.description}</Text>
        <View flex row marginT-5 style={{ flexWrap: "wrap" }}>
          {task.workers.map((worker) => (
            <Chip key={worker.id} label={worker.name} />
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
          color="#0080FF"
        />
      </View>
    </View>
  );
};

export default TaskItem;
