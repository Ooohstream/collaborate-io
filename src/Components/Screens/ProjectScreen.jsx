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
import i18n from "../../Translation/i18n";
import { useTheme } from "@react-navigation/native";

const Project = createNativeStackNavigator();

const ProjectScreen = ({ route, navigation, setProjects }) => {
  const [categories, setCategories] = useState([]);
  const [activeSections, setActiveSections] = useState([]);
  const { colors } = useTheme();

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

  useEffect(() => {
    setActiveSections([]);
  }, [categories]);

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
        headerStyle: { backgroundColor: colors.main },
        headerShadowVisible: false,
        animation: "fade",
        headerTintColor: colors.secondary,
      }}
    >
      <Project.Screen
        name="ProjectMain"
        options={(params) => ({
          title: "",
          headerRight: () => (
            <HeaderRightProjectScreen
              onPress={() => {
                params.navigation.navigate("ProjectSettingsScreen", {
                  id: route.params.id,
                });
              }}
            />
          ),
        })}
      >
        {(props) => (
          <ScrollView style={{ flex: 1, backgroundColor: colors.secondary }}>
            <Accordion
              expandMultiple
              sectionContainerStyle={{
                width: "100%",
                paddingVertical: 5,
                backgroundColor: colors.main,
                marginVertical: 10,
              }}
              touchableProps={{
                activeOpacity: 0.6,
                underlayColor: colors.main,
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
        {(props) => (
          <ProjectSettingsScreen {...props} setProjects={setProjects} />
        )}
      </Project.Screen>
      <Project.Screen name="EditTaskScreen" options={{ title: "" }}>
        {(props) => <EditTaskScreen {...props} setCategories={setCategories} />}
      </Project.Screen>
      <Project.Screen name="AddTaskScreen" options={{ title: "" }}>
        {(props) => <AddTaskScreen {...props} setCategories={setCategories} />}
      </Project.Screen>
    </Project.Navigator>
  );
};

export default ProjectScreen;
