import React, { useState } from "react";
import { View, TextField, Button, Typography } from "react-native-ui-lib";
import FlipCard from "react-native-flip-card";
import DelayInput from "react-native-debounce-input";
import axios from "axios";
import PROXY from "../proxyConfig";
import uuid from "react-native-uuid";
import i18n from "../Translation/i18n";
import { useTheme } from "@react-navigation/native";

const AddCategoryFlipper = ({ setCategories, projectId }) => {
  const [flip, setFlip] = useState(false);
  const [name, setName] = useState("");
  const { colors } = useTheme();

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
        labelStyle={Typography.text60}
        label={i18n.t("AddCategoryButton")}
        disabled
        color={colors.secondary}
        disabledBackgroundColor={colors.accent}
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
            borderBottomColor: colors.placeholder,
          }}
          delayTimeout={1000}
          onChangeText={(e) => {
            handleChange(e);
          }}
          placeholder={i18n.t("AddCategoryPlaceholder")}
        />
      </View>
    </FlipCard>
  );
};

export default AddCategoryFlipper;
