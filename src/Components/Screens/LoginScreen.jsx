import React from "react";
import { Text, View, Button, Icon } from "react-native-ui-lib";
import githubLogo from "/assets/github-32.png";
import gitlabLogo from "assets/gitlab-32.png";
import bitbucketLogo from "assets/bitbucket-32.png";
import appLogo from "/assets/logo.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

const LoginScreen = ({ setIsAuthenticated }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View flex width="60%">
        <View flex-2 center>
          <Icon tintColor={"#0080FF"} size={100} source={appLogo} />
          <Text text60 black>
            Collaborate.io
          </Text>
        </View>
        <View flex-1 spread marginB-100>
          <Text center text60>
            Login with...
          </Text>
          <Button
            text65
            iconOnRight
            bg-grey60
            label="GitHub"
            color="black"
            iconSource={githubLogo}
            size="large"
            onPress={() => {
              setIsAuthenticated(true);
            }}
          />
          <Button
            text65
            iconOnRight
            color="black"
            bg-orange50
            iconStyle={{ tintColor: "#fc6d27" }}
            label="GitLab"
            iconSource={gitlabLogo}
            onPress={() => {
              setIsAuthenticated(true);
            }}
          />
          <Button
            text65
            iconOnRight="true"
            bg-blue70
            color="black"
            label="BitBucket"
            iconSource={bitbucketLogo}
            iconStyle={{ tintColor: "#0080FF" }}
            onPress={() => {
              setIsAuthenticated(true);
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
    backgroundColor: "#fafafa",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginScreen;
