import React, { useState } from "react";
import { View, Button, TextField } from "react-native-ui-lib";
import Accordion from "react-native-collapsible/Accordion";
import { ScrollView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryHeader from "../CategoryHeader";
import TaskItem from "../TaskItem";
import AddCategoryFlipper from "../AddCategoryFlipper";
import { useEffect } from "react/cjs/react.development";
import ProjectSettingsScreen from "./ProjectSettingsScreen";
import HeaderRightProjectScreen from "../HeaderRightProjectScreen";

const Project = createNativeStackNavigator();

const ProjectScreen = () => {
  const [categories, setCategories] = useState([
    {
      title: "Design",
      tasks: [
        {
          id: 1,
          title: "Design problem",
          description: "Design problem description ...",
          workers: ["John Worker"],
          isDone: false,
          badgeColor: "blue",
        },
        {
          id: 2,
          title: "Design problem 2",
          description: "Design problem 2 description ...",
          workers: ["Jamie Worker"],
          isDone: true,
          badgeColor: "red",
        },
      ],
    },
  ]);

  useEffect(() => {
    setActiveSections([]);
  }, [categories]);

  const addCategory = (categoryTitle) => {
    setCategories([...categories, { title: categoryTitle, tasks: [] }]);
  };

  const removeCategory = (categoryTitle) => {
    setCategories(
      categories.filter((category) => category.title !== categoryTitle)
    );
  };

  const addTask = (taskTitle, categoryTitle) => {
    setCategories((prev) => {
      const newCategories = [...prev];
      newCategories
        .find((category) => category.title === categoryTitle)
        .tasks.push({
          id: Date.now(),
          title: "Sample problem",
          description: "Sample problem description ...",
          workers: ["Jamie Worker"],
          isDone: true,
          badgeColor: "yellow",
        });
      return newCategories;
    });
  };

  const [activeSections, setActiveSections] = useState([]);

  const _renderHeader = (section) => {
    return (
      <CategoryHeader
        categories={categories}
        title={section.title}
        setCategories={setCategories}
        removeCategory={removeCategory}
        addTask={addTask}
      />
    );
  };

  const _renderContent = (section) => {
    return (
      <View style={{ padding: 5 }}>
        {section.tasks.map((task) => (
          <TaskItem
            setCategories={setCategories}
            task={task}
            section={section}
          />
        ))}
      </View>
    );
  };

  const _updateSections = (activeSectionsUpdate) => {
    setActiveSections(activeSectionsUpdate);
  };

  return (
    <Project.Navigator
      screenOptions={{ headerStyle: { backgroundColor: "#0080FF" } }}
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
            <AddCategoryFlipper addCategory={addCategory} />
          </ScrollView>
        )}
      </Project.Screen>
      <Project.Screen name="ProjectSettingsScreen">
        {(props) => <ProjectSettingsScreen {...props} />}
      </Project.Screen>
    </Project.Navigator>
  );
};

export default ProjectScreen;
