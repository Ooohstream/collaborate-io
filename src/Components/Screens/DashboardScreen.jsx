import React, { useEffect, useState, useRef } from "react";
import { View, Button } from "react-native-ui-lib";
import { TextInput, Animated } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import search from "/assets/search.png";
import MenuPopover from "../MenuPopover";
import join from "/assets/join.png";
import axios from "axios";
import PROXY from "../../proxyConfig";
import { useSelector } from "react-redux";
import DashboardMainScreen from "./DashboardMainScreen";
import AddNewProjectScreen from "./AddNewProjectScreen";
import JoinProjectModal from "../JoinProjectModal";
import ProjectScreen from "./ProjectScreen";
import { useTheme } from "@react-navigation/native";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const Dashboard = createNativeStackNavigator();

const DashboardScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth);
  const { colors } = useTheme();
  const [projects, setProjects] = useState([]);
  const [joinModal, setJoinModal] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const expand = useRef(new Animated.Value(0)).current;
  const searchRef = useRef();

  const expandIn = () => {
    setSearchVisible(true);
    searchRef.current.focus();
    Animated.timing(expand, {
      toValue: 200,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const expandOut = () => {
    setTimeout(() => {
      setSearchVisible(false);
      setSearchTerm("");
    }, 450);
    Animated.timing(expand, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

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
        headerStyle: { backgroundColor: colors.main },
        headerShadowVisible: false,
        animation: "fade",
        headerTintColor: colors.secondary,
      }}
    >
      <Dashboard.Screen
        name="DashboardMain"
        options={{
          title: "",
          headerLeft: () => <MenuPopover navigation={navigation} />,
          headerRight: () => (
            <View height="100%" row center>
              <View row center>
                <AnimatedTextInput
                  ref={searchRef}
                  value={searchTerm}
                  onChangeText={(text) => {
                    setSearchTerm(text);
                  }}
                  selectionColor={colors.main}
                  style={{
                    opacity: searchVisible ? 1 : 0,
                    width: expand,
                    backgroundColor: colors.secondary,
                    color: colors.black,
                    borderRadius: 10,
                    padding: 5,
                  }}
                  onBlur={() => {
                    expandOut();
                  }}
                />
                <Button
                  round
                  size="large"
                  iconStyle={{ width: 28, height: 28 }}
                  iconSource={search}
                  link
                  linkColor={colors.secondary}
                  onPress={() => {
                    searchVisible ? expandOut() : expandIn();
                  }}
                />
              </View>
              <Button
                round
                size="large"
                iconSource={join}
                iconStyle={{ height: 28, width: 28 }}
                link
                linkColor={colors.secondary}
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
        {(props) => (
          <DashboardMainScreen
            {...props}
            searchTerm={searchTerm}
            projects={projects}
            setProjects={setProjects}
          />
        )}
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
      <Dashboard.Screen name="ProjectScreen" options={{ headerShown: false }}>
        {(props) => <ProjectScreen {...props} setProjects={setProjects} />}
      </Dashboard.Screen>
    </Dashboard.Navigator>
  );
};

export default DashboardScreen;
