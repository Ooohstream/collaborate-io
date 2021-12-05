import React, { useEffect, useState } from "react";
import LoadingScreen from "./src/Components/Screens/LoadingScreen";
import LoginScreen from "./src/Components/Screens/LoginScreen";
import ProjectScreen from "./src/Components/Screens/ProjectScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "./src/Components/Screens/DashboardScreen";
import { Button, View } from "react-native-ui-lib";
import search from "/assets/search.png";
import HeaderRightProjectScreen from "./src/Components/HeaderRightProjectScreen";
import NotificationPopover from "./src/Components/NotificationPopover";
import MenuPopover from "./src/Components/MenuPopover";

const Stack = createNativeStackNavigator();

export default App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#0080FF" },
        }}
      >
        {isLoaded ? (
          isAuthenticated ? (
            <>
              <Stack.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={({ navigation }) => ({
                  title: "",
                  headerStyle: { backgroundColor: "#0080FF" },
                  headerLeft: () => <MenuPopover />,
                  headerRight: () => (
                    <View height="100%" row center>
                      <Button
                        round
                        size="large"
                        iconStyle={{ width: 32, height: 32 }}
                        iconSource={search}
                        link
                        linkColor="black"
                      />
                      <NotificationPopover />
                    </View>
                  ),
                })}
              />
              <Stack.Screen
                name="ProjectScreen"
                options={{ headerShown: false }}
                component={ProjectScreen}
              />
            </>
          ) : (
            <Stack.Screen name="Entrance" options={{ headerShown: false }}>
              {(props) => (
                <LoginScreen
                  {...props}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            </Stack.Screen>
          )
        ) : (
          <Stack.Screen
            name="Loader"
            component={LoadingScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
