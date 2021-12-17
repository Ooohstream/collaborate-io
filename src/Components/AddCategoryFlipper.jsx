import React, { useState } from "react";
import { View, TextField, Button } from "react-native-ui-lib";
import FlipCard from "react-native-flip-card";
import DelayInput from "react-native-debounce-input";
import axios from "axios";
import PROXY from "../proxyConfig";
import uuid from "react-native-uuid";

const AddCategoryFlipper = ({ setCategories, projectId }) => {
  const [flip, setFlip] = useState(false);
  const [name, setName] = useState("");

  const handleChange = async (e) => {
    if (e) {
      const { data } = await axios.post(`${PROXY}/categories/add`, {
        projectId,
        category: {
          id: uuid.v4(),
          name: e,
          tasks: [],
        },
      });
      setCategories(data);
      setName("");
      setFlip(!flip);
    }
  };

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
          value={name}
          style={{
            width: "95%",
            borderBottomWidth: 1,
            padding: 5,
            borderBottomColor: "lightgray",
          }}
          delayTimeout={1000}
          onChangeText={(e) => {
            handleChange(e);
          }}
          placeholder="Category name"
        />
      </View>
    </FlipCard>
  );
};

export default AddCategoryFlipper;
