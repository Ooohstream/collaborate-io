import React, { useEffect, useState } from "react";
import LoadingScreen from "./src/Components/Screens/LoadingScreen";
import LoginScreen from "./src/Components/Screens/LoginScreen";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "./src/Components/Screens/DashboardScreen";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setAuth } from "./src/store/authSlice";
import i18n from "./src/Translation/i18n";
import * as Localization from "expo-localization";
import { useColorScheme } from "react-native";
import { setTheme } from "./src/store/themeSlice";

const Stack = createNativeStackNavigator();

const Theme = {
  dark: false,
  colors: {
    main: "#007bff",
    secondary: "#F4F7FB",
    accent: "#00D6C8",
    black: "#212529",
    white: "#fff",
    attention: "#dc3545",
    placeholder: "#00000050",
  },
};

const DarkTheme = {
  dark: true,
  colors: {
    main: "#131a22",
    secondary: "#808080",
    accent: "#0A2927",
    black: "#212529",
    white: "#fff",
    attention: "#bd2c3a",
    placeholder: "#00000050",
  },
};

export default AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatcher = useDispatch();
  const scheme = useColorScheme();
  const theme = useSelector((state) => state.theme);

  console.log(theme);

  useEffect(() => {
    const initApp = async () => {
      await AsyncStorage.getItem("user_info", (err, res) => {
        if (res !== null) dispatcher(setAuth(JSON.parse(res)));
      });
      await AsyncStorage.getItem("user_lang", (err, res) => {
        if (res === null) i18n.locale = Localization.locale;
        else i18n.locale = res;
      });
      await AsyncStorage.getItem("user_theme", (err, res) => {
        if (res !== null) dispatcher(setTheme(res));
        else dispatcher(setTheme(scheme));
      });
      setIsLoaded(true);
    };
    initApp();
  }, []);

  return (
    <NavigationContainer theme={theme === "dark" ? DarkTheme : Theme}>
      <Stack.Navigator
        screenOptions={{
          animation: "fade",
          headerShown: false,
        }}
      >
        {isLoaded ? (
          isAuth ? (
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
          ) : (
            <Stack.Screen name="Entrance">
              {(props) => <LoginScreen {...props} />}
            </Stack.Screen>
          )
        ) : (
          <Stack.Screen name="Loader" component={LoadingScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
