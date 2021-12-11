import React from "react";
import { View, Button } from "react-native-ui-lib";
import notifications from "assets/notifications.png";
import { usePopover, Popover } from "react-native-modal-popover";

const NotificationPopover = ({}) => {
  const notificationsPopover = usePopover();
  return (
    <>
      <Button
        link
        linkColor="black"
        round
        size="large"
        iconSource={notifications}
        iconStyle={{ width: 28, height: 28 }}
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
          }}
          bg-white
        ></View>
      </Popover>
    </>
  );
};

export default NotificationPopover;
