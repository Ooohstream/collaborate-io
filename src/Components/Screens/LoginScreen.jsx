import React, { useEffect } from "react";
import { Text, View, Button, Icon } from "react-native-ui-lib";
import g from "/assets/g.png";
import appLogo from "/assets/logo.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import * as Google from "expo-google-app-auth";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/authSlice";

const LoginScreen = () => {
  const dispatcher = useDispatch();

  const signInAsync = async () => {
    try {
      const { type, user } = await Google.logInAsync({
        androidClientId: `859206676920-5nqv5nfivi83k6ee5nem2dk42ivf1vv9.apps.googleusercontent.com`,
      });

      if (type === "success") {
        console.log(`Login ${type}`);
        const { email, id, name, photoUrl } = user;
        dispatcher(setAuth({ email, id, name, photoUrl }));
      }
    } catch (error) {
      console.log(`Login ${type}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View flex width="60%">
        <View flex-3 center>
          <Icon tintColor="white" size={100} source={appLogo} />
          <Text text60 white>
            Collaborate.io
          </Text>
        </View>
        <View flex-1 spread marginB-100>
          <Button
            text70
            iconOnRight
            bg-white
            label="Login with Google"
            color="black"
            iconSource={g}
            iconStyle={{ width: 25, height: 25, tintColor: "#0080FF" }}
            size="large"
            onPress={() => {
              signInAsync();
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0080FF",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginScreen;
