import React, { useState } from "react";
import { View } from "react-native-ui-lib";
import Accordion from "react-native-collapsible/Accordion";
import { ScrollView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryHeader from "../CategoryHeader";
import TaskItem from "../TaskItem";
import AddCategoryFlipper from "../AddCategoryFlipper";
import { useEffect } from "react/cjs/react.development";
import ProjectSettingsScreen from "./ProjectSettingsScreen";
import HeaderRightProjectScreen from "../HeaderRightProjectScreen";
import EditTaskScreen from "./EditTaskScreen";
import AddTaskScreen from "./AddTaskScreen";
import axios from "axios";
import PROXY from "../../proxyConfig";

const Project = createNativeStackNavigator();

const ProjectScreen = ({ route, navigation }) => {
  const [categories, setCategories] = useState([]);
  const [activeSections, setActiveSections] = useState([]);

  useEffect(() => {
    const init = async () => {
      const { data } = await axios.get(`${PROXY}/categories`, {
        params: {
          id: route.params.id,
        },
      });
      setCategories(data);
    };
    init();
  }, []);

  const _renderHeader = (section) => {
    return (
      <CategoryHeader
        key={section.id}
        id={section.id}
        projectId={route.params.id}
        name={section.name}
        setCategories={setCategories}
        navigation={navigation}
      />
    );
  };

  const _renderContent = (section) => {
    return (
      <View padding-5>
        {section.tasks.map((task) => {
          return (
            <TaskItem
              projectId={route.params.id}
              key={task.id}
              setCategories={setCategories}
              task={task}
              category={section.id}
              navigation={navigation}
            />
          );
        })}
      </View>
    );
  };

  const _updateSections = (activeSectionsUpdate) => {
    setActiveSections(activeSectionsUpdate);
  };

  return (
    <Project.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0080FF" },
        headerShadowVisible: false,
      }}
    >
      <Project.Screen
        name="ProjectMain"
        options={(params) => ({
          title: "Project",
          headerRight: () => (
            <HeaderRightProjectScreen
              onPress={() => {
                params.navigation.navigate("ProjectSettingsScreen");
              }}
            />
          ),
        })}
      >
        {(props) => (
          <ScrollView style={{ flex: 1, backgroundColor: "#fafafa" }}>
            <Accordion
              expandMultiple
              sectionContainerStyle={{
                width: "100%",
                paddingVertical: 5,
                backgroundColor: "#DEE1E6",
                marginVertical: 10,
              }}
              touchableProps={{
                activeOpacity: 0.6,
                underlayColor: "#DEE1E6",
              }}
              sections={categories}
              activeSections={activeSections}
              renderHeader={_renderHeader}
              renderContent={_renderContent}
              onChange={_updateSections}
            />
            <AddCategoryFlipper
              projectId={route.params.id}
              setCategories={setCategories}
            />
          </ScrollView>
        )}
      </Project.Screen>
      <Project.Screen name="ProjectSettingsScreen" options={{ title: "" }}>
        {(props) => <ProjectSettingsScreen {...props} />}
      </Project.Screen>
      <Project.Screen name="EditTaskScreen" options={{ title: "" }}>
        {(props) => <EditTaskScreen {...props} />}
      </Project.Screen>
      <Project.Screen name="AddTaskScreen" options={{ title: "" }}>
        {(props) => <AddTaskScreen {...props} setCategories={setCategories} />}
      </Project.Screen>
    </Project.Navigator>
  );
};

export default ProjectScreen;
