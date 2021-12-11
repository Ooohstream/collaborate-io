import React, { useEffect, useState } from "react";
import LoadingScreen from "./src/Components/Screens/LoadingScreen";
import LoginScreen from "./src/Components/Screens/LoginScreen";
import ProjectScreen from "./src/Components/Screens/ProjectScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "./src/Components/Screens/DashboardScreen";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

export default AppWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isAuth = useSelector((state) => state.auth.isAuth);

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
          isAuth ? (
            <>
              <Stack.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ProjectScreen"
                options={{ headerShown: false }}
                component={ProjectScreen}
              />
            </>
          ) : (
            <Stack.Screen name="Entrance" options={{ headerShown: false }}>
              {(props) => <LoginScreen {...props} />}
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
