import React, { useState } from "react";
import { View, TextField, Button } from "react-native-ui-lib";
import FlipCard from "react-native-flip-card";
import DelayInput from "react-native-debounce-input";

const AddCategoryFlipper = ({ addCategory }) => {
  const [flip, setFlip] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("");

  return (
    <FlipCard
      friction={6}
      perspective={500}
      flipHorizontal
      flip={flip}
      clickable={true}
      style={{ marginVertical: 20 }}
    >
      <Button
        label="Add category"
        disabled
        disabledBackgroundColor="#0080FF"
        onPress={() => {
          setFlip(!setFlip);
        }}
      />
      <View center>
        <DelayInput
          value={categoryTitle}
          style={{
            width: "95%",
            borderBottomWidth: 1,
            padding: 5,
            borderBottomColor: "lightgray",
          }}
          delayTimeout={1000}
          onChangeText={(e) => {
            if (e) addCategory(e);
            setCategoryTitle("");
            setFlip(!flip);
          }}
          placeholder="Category name"
        />
      </View>
    </FlipCard>
  );
};

export default AddCategoryFlipper;
