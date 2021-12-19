import React, { useEffect, useState } from "react";
import { View, Text, Typography, Button } from "react-native-ui-lib";
import DoubleClick from "react-native-double-tap";
import DelayInput from "react-native-debounce-input";
import trashCan from "/assets/trash.png";
import plus from "assets/plus.png";
import axios from "axios";
import PROXY from "../proxyConfig";
import { TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";

const CategoryHeader = ({
  projectId,
  id,
  name,
  setCategories,
  addTask,
  navigation,
}) => {
  const [inputMode, setInputMode] = useState(false);
  const { colors } = useTheme();

  const handleRemove = async () => {
    const { data } = await axios.delete(`${PROXY}/categories/remove`, {
      params: { projectId, id },
    });
    setCategories(data);
  };

  const handleNameChange = async (newName) => {
    const { data } = await axios.patch(`${PROXY}/categories/edit`, {
      projectId,
      id,
      name: newName,
    });
    setCategories(data);
    setInputMode(!inputMode);
  };

  return (
    <View
      row
      padding-10
      centerV
      style={{
        height: 60,
      }}
    >
      <View centerV>
        {inputMode ? (
          <DelayInput
            underlineColorAndroid="transparent"
            onChangeText={(e) => {
              handleNameChange(e);
            }}
            delayTimeout={500}
            value={name}
            style={{
              ...Typography.text40,
              borderBottomWidth: 1,
              borderBottomColor: "transparent",
            }}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              setInputMode(!inputMode);
            }}
          >
            <Text color={colors.secondary} style={Typography.text40}>
              {name}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View row center style={{ marginLeft: "auto" }}>
        <Button
          marginR-20
          iconSource={plus}
          iconStyle={{ width: 32, height: 32, tintColor: colors.secondary }}
          link
          labelStyle={Typography.text30}
          onPress={() =>
            navigation.navigate("AddTaskScreen", { categoryId: id, projectId })
          }
        />
        <Button
          onPress={() => handleRemove()}
          style={{ alignSelf: "flex-end" }}
          link
          iconSource={trashCan}
          iconStyle={{ width: 32, height: 32, tintColor: colors.secondary }}
        />
      </View>
    </View>
  );
};

export default CategoryHeader;
