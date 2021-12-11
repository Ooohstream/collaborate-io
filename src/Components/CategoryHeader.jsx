import React, { useEffect, useState } from "react";
import { View, Text, Typography, Button } from "react-native-ui-lib";
import DoubleClick from "react-native-double-tap";
import DelayInput from "react-native-debounce-input";
import trashCan from "/assets/trash.png";
import plus from "assets/plus.png";

const CategoryHeader = ({
  title,
  setCategories,
  removeCategory,
  addTask,
  navigation,
}) => {
  const [inputMode, setInputMode] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState(title);
  const [oldCategoryTitle, setOldCategoryTitle] = useState(title);

  useEffect(() => {
    if (categoryTitle) {
      setCategories((prev) => {
        const newCategories = [...prev];
        newCategories.find(
          (category) => category.title === oldCategoryTitle
        ).title = categoryTitle;
        return newCategories;
      });
      setOldCategoryTitle(categoryTitle);
    } else setCategoryTitle(title);
  }, [categoryTitle]);

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
              setCategoryTitle(e);
              setInputMode(!inputMode);
            }}
            delayTimeout={500}
            value={categoryTitle}
            style={{
              ...Typography.text40,
              borderBottomWidth: 1,
              borderBottomColor: "gray",
            }}
          />
        ) : (
          <DoubleClick
            doubleTap={() => {
              setInputMode(!inputMode);
            }}
          >
            <Text style={Typography.text40}>{title}</Text>
          </DoubleClick>
        )}
      </View>
      <View row center style={{ marginLeft: "auto" }}>
        <Button
          marginR-20
          iconSource={plus}
          iconStyle={{ width: 32, height: 32 }}
          link
          labelStyle={Typography.text30}
          color="black"
          onPress={() => navigation.navigate("AddTaskScreen")}
        />
        <Button
          onPress={() => removeCategory(title)}
          style={{ alignSelf: "flex-end" }}
          link
          iconSource={trashCan}
          iconStyle={{ width: 32, height: 32, tintColor: "black" }}
        />
      </View>
    </View>
  );
};

export default CategoryHeader;
