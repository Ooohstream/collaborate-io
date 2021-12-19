import React from "react";
import { View, Button } from "react-native-ui-lib";
import {
  Menu,
  MenuItem,
  MenuDivider,
  Position,
} from "react-native-enhanced-popup-menu";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../Translation/i18n";
import { StackActions, useTheme } from "@react-navigation/native";
import { setTheme } from "../store/themeSlice";

const MenuPopover = ({ navigation }) => {
  let elementRef = React.createRef();
  let menuRef = null;
  const setMenuRef = (ref) => (menuRef = ref);
  const hideMenu = () => menuRef?.hide();
  const showMenu = () => {
    menuRef?.show(elementRef.current, Position.TOP_LEFT);
  };
  const onPress = () => showMenu();
  const { colors } = useTheme();
  const theme = useSelector((state) => state.theme);
  const dispatcher = useDispatch();

  return (
    <>
      <View
        ref={elementRef}
        style={{
          borderColor: "transparent",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      <Button
        onPress={onPress}
        link
        label="..."
        labelStyle={{ fontSize: 40 }}
        linkColor={colors.secondary}
      />
      <Menu ref={setMenuRef} style={{ backgroundColor: colors.secondary }}>
        <MenuItem
          onPress={async () => {
            switch (i18n.locale) {
              case "ru":
                await AsyncStorage.setItem("user_lang", "en-US");
                i18n.locale = "en-US";
                break;
              case "en-US":
                await AsyncStorage.setItem("user_lang", "ru");
                i18n.locale = "ru";
                break;
            }
            navigation.dispatch(StackActions.replace("Dashboard"));
          }}
        >
          {i18n.t("Language")}
        </MenuItem>
        <MenuItem
          onPress={async () => {
            switch (theme) {
              case "light":
                await AsyncStorage.setItem("user_theme", "dark");
                dispatcher(setTheme("dark"));
                break;
              case "dark":
                await AsyncStorage.setItem("user_theme", "light");
                dispatcher(setTheme("light"));
                break;
            }
            navigation.dispatch(StackActions.replace("Dashboard"));
          }}
        >
          {i18n.t("Theme")}
        </MenuItem>
        <MenuItem
          onPress={hideMenu}
          onPress={async () => {
            dispatcher(logout());
            await AsyncStorage.removeItem("user_info");
          }}
        >
          {i18n.t("Exit")}
        </MenuItem>
        <MenuDivider />
      </Menu>
    </>
  );
};

export default MenuPopover;
