import React, { useEffect, useState } from "react";
import LoadingScreen from "./src/Components/Screens/LoadingScreen";
import LoginScreen from "./src/Components/Screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "./src/Components/Screens/DashboardScreen";
import { Button, View } from "react-native-ui-lib";
import search from "/assets/search.png";
import notifications from "assets/notifications.png";
import { Popover, usePopover } from "react-native-modal-popover";
import {
  Menu,
  MenuItem,
  MenuDivider,
  Position,
} from "react-native-enhanced-popup-menu";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const notificationsPopover = usePopover();

  let elementRef = React.createRef();
  let menuRef = null;
  const setMenuRef = (ref) => (menuRef = ref);
  const hideMenu = () => menuRef?.hide();
  const showMenu = () => {
    menuRef?.show(elementRef.current, Position.TOP_LEFT);
  };
  const onPress = () => showMenu();

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoaded ? (
          isAuthenticated ? (
            <>
              <Stack.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                  title: "",
                  headerStyle: { backgroundColor: "#0080FF" },
                  headerLeft: () => (
                    <>
                      <View>
                        <View
                          ref={elementRef}
                          style={{
                            borderColor: "grey",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        />
                        <Button
                          onPress={onPress}
                          link
                          label="..."
                          labelStyle={{ fontSize: 48 }}
                          linkColor="black"
                        />
                        <Menu ref={setMenuRef}>
                          <MenuItem onPress={hideMenu}>Language</MenuItem>
                          <MenuItem onPress={hideMenu}>Theme</MenuItem>
                          <MenuItem onPress={hideMenu} disabled>
                            Exit
                          </MenuItem>
                          <MenuDivider />
                        </Menu>
                      </View>
                    </>
                  ),
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
                      <Button
                        link
                        linkColor="black"
                        round
                        size="large"
                        iconSource={notifications}
                        iconStyle={{ width: 32, height: 32 }}
                        ref={notificationsPopover.touchableRef}
                        onPress={notificationsPopover.openPopover}
                      />
                      <Popover
                        fromRect={{
                          ...notificationsPopover.popoverAnchorRect,
                          x: notificationsPopover.popoverAnchorRect.x - 3,
                          y: notificationsPopover.popoverAnchorRect.y - 30,
                        }}
                        onClose={notificationsPopover.closePopover}
                        visible={notificationsPopover.popoverVisible}
                        contentStyle={{ backgroundColor: "#fafafa" }}
                        calculateStatusBar="true"
                      >
                        <View
                          style={{
                            width: 295,
                            height: 500,
                            backgroundColor: "#fafafa",
                          }}
                        ></View>
                      </Popover>
                    </View>
                  ),
                }}
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
}
