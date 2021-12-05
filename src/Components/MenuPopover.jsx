import React from "react";
import { View, Button } from "react-native-ui-lib";
import {
  Menu,
  MenuItem,
  MenuDivider,
  Position,
} from "react-native-enhanced-popup-menu";

const MenuPopover = () => {
  let elementRef = React.createRef();
  let menuRef = null;
  const setMenuRef = (ref) => (menuRef = ref);
  const hideMenu = () => menuRef?.hide();
  const showMenu = () => {
    menuRef?.show(elementRef.current, Position.TOP_LEFT);
  };
  const onPress = () => showMenu();

  return (
    <>
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
        <MenuItem onPress={hideMenu}>Exit</MenuItem>
        <MenuDivider />
      </Menu>
    </>
  );
};

export default MenuPopover;
