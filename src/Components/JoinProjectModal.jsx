import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from "react-native";
import { Typography, Button, Toast } from "react-native-ui-lib";
import { useSelector } from "react-redux";
import PROXY from "../proxyConfig";
import { addProject } from "../store/projectsSlice";

const JoinProjectModal = ({
  joinModal,
  setJoinModal,
  setProjects,
  projects,
}) => {
  const [projectId, setProjectId] = useState("");
  const user = useSelector((state) => state.auth);

  const handleJoin = async () => {
    const { data } = await axios.patch(`${PROXY}/projects/join`, {
      id: projectId,
      user: { ...user, isAuth: undefined, photoUrl: undefined },
    });
    console.log(data);
    if (!data?.alreadyMember) setProjects([...projects, data]);
    else ToastAndroid.show(data.message, ToastAndroid.CENTER);
    setProjectId("");
    setJoinModal(false);
  };

  return (
    <Modal transparent={true} visible={joinModal} animationType="fade">
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setJoinModal(false)}
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 300,
            height: 200,
            padding: 20,
            borderRadius: 10,
            backgroundColor: "#0080FF",
            justifyContent: "space-evenly",
          }}
        >
          <TextInput
            placeholder="Project id"
            value={projectId}
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              padding: 10,
              ...Typography.text60,
            }}
            onChangeText={(e) => {
              setProjectId(e);
            }}
          />
          <Button
            labelStyle={Typography.text60}
            color="#0080FF"
            backgroundColor="white"
            marginV-10
            label="Join"
            onPress={() => {
              handleJoin();
            }}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default JoinProjectModal;
