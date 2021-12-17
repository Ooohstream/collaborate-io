import React, { useEffect, useRef } from "react";
import { Text, View, Button, Icon } from "react-native-ui-lib";
import g from "/assets/g.png";
import appLogo from "/assets/logo.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Animated } from "react-native";
import * as Google from "expo-google-app-auth";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/authSlice";
import axios from "axios";
import PROXY from "../../proxyConfig";

const LoginScreen = () => {
  const expand = useRef(new Animated.Value(50)).current;

  const expandIn = () => {
    Animated.timing(expand, {
      toValue: 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const dispatcher = useDispatch();

  const signInAsync = async () => {
    try {
      const { type, user } = await Google.logInAsync({
        androidClientId: `859206676920-5nqv5nfivi83k6ee5nem2dk42ivf1vv9.apps.googleusercontent.com`,
      });

      if (type === "success") {
        console.log(`Login ${type}`);
        const { email, id, name, photoUrl } = user;
        await axios.post(`${PROXY}/authorization`, {
          email,
          id,
          name,
          photoUrl,
        });
        dispatcher(setAuth({ email, id, name, photoUrl }));
      }
    } catch (error) {
      console.log(`Login ${type}`);
    }
  };

  const AnimatedButton = Animated.createAnimatedComponent(Button);

  return (
    <SafeAreaView style={styles.container}>
      <View flex width="60%">
        <View flex-3 center>
          <Icon tintColor="white" size={100} source={appLogo} />
          <Text text60 white>
            Collaborate.io
          </Text>
        </View>
        <View flex-1 center marginB-100>
          <AnimatedButton
            style={{
              width: expand,
              height: expand,
            }}
            iconOnRight
            bg-white
            color="black"
            round
            iconSource={g}
            iconStyle={{ width: 35, height: 35, tintColor: "#0080FF" }}
            size="large"
            onPress={() => {
              expandIn();
              setTimeout(() => {
                signInAsync();
              }, 200);
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
