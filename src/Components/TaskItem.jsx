import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Chip,
  Checkbox,
} from "react-native-ui-lib";

const TaskItem = ({ task, setCategories, section, navigation }) => {
  const handleCheck = (e) => {
    setCategories((prev) => {
      const newCategories = [...prev];
      newCategories
        .find((category) => category.title === section.title)
        .tasks.find((goalTask) => goalTask.id === task.id).isDone = !prev
        .find((category) => category.title === section.title)
        .tasks.find((goalTask) => goalTask.id === task.id).isDone;

      return newCategories;
    });
  };

  return (
    <View key={task.id} bg-white row br50 padding-20 marginV-5>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("EditTaskScreen");
        }}
        activeOpacity={0.6}
        flex-1
        spread
      >
        <Text style={{ fontSize: 20 }}>{task.title}</Text>
        <Text>{task.description}</Text>
        <View flex row marginT-5 style={{ flexWrap: "wrap" }}>
          {task.workers.map((worker) => (
            <Chip label={worker} />
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
