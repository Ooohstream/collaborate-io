import React, { useEffect, useState } from "react";
import { View, Button, Typography } from "react-native-ui-lib";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import search from "/assets/search.png";
import MenuPopover from "../MenuPopover";
import join from "/assets/join.png";
import axios from "axios";
import PROXY from "../../proxyConfig";
import { useDispatch, useSelector } from "react-redux";
import DashboardMainScreen from "./DashboardMainScreen";
import AddNewProjectScreen from "./AddNewProjectScreen";
import JoinProjectModal from "../JoinProjectModal";

const Dashboard = createNativeStackNavigator();

const DashboardScreen = () => {
  const user = useSelector((state) => state.auth);
  const [projects, setProjects] = useState([]);
  const [joinModal, setJoinModal] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data } = await axios.get(`${PROXY}/projects`, {
        params: { id: user.id },
      });
      setProjects(data.projects);
    };
    init();
  }, []);

  return (
    <Dashboard.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0080FF" },
        headerShadowVisible: false,
      }}
    >
      <Dashboard.Screen
        name="DashboardMain"
        options={{
          title: "",
          headerLeft: () => <MenuPopover />,
          headerRight: () => (
            <View height="100%" row center>
              <Button
                round
                size="large"
                iconStyle={{ width: 28, height: 28 }}
                iconSource={search}
                link
                linkColor="black"
              />
              <Button
                round
                size="large"
                iconSource={join}
                iconStyle={{ height: 28, width: 28 }}
                link
                linkColor="black"
                onPress={() => {
                  setJoinModal(true);
                }}
              />
              <JoinProjectModal
                setJoinModal={setJoinModal}
                joinModal={joinModal}
                projects={projects}
                setProjects={setProjects}
              />
            </View>
          ),
        }}
      >
        {(props) => <DashboardMainScreen {...props} projects={projects} />}
      </Dashboard.Screen>
      <Dashboard.Screen
        options={{
          title: "",
        }}
        name="AddNewProjectScreen"
      >
        {(props) => (
          <AddNewProjectScreen
            {...props}
            projects={projects}
            setProjects={setProjects}
          />
        )}
      </Dashboard.Screen>
    </Dashboard.Navigator>
  );
};

export default DashboardScreen;
