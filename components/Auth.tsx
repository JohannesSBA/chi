import React, { useState } from "react";
import { Alert, Platform, StyleSheet, View, Text } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input } from "@rneui/themed";
import * as AppleAuthentication from "expo-apple-authentication";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //   GoogleSignin.configure({
  //     scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  //     webClientId: "YOUR CLIENT ID FROM GOOGLE CONSOLE",
  //   });

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          width: "100%",
          fontSize: 36,
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        Welcome To Chi!
      </Text>
      <Input
        label="Email"
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="email@address.com"
        autoCapitalize={"none"}
      />
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title="Sign in"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>

      {/* 
      {Platform.OS === "ios" && (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={{ width: 200, height: 64 }}
          onPress={async () => {
            try {
              const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
              });
              // Sign in via Supabase Auth.
              if (credential.identityToken) {
                const {
                  error,
                  data: { user },
                } = await supabase.auth.signInWithIdToken({
                  provider: "apple",
                  token: credential.identityToken,
                });
                console.log(JSON.stringify({ error, user }, null, 2));
                if (!error) {
                  // User is signed in.
                }
              } else {
                throw new Error("No identityToken.");
              }
            } catch (e: any) {
              if (e.code === "ERR_REQUEST_CANCELED") {
                // handle that the user canceled the sign-in flow
              } else {
                // handle other errors
              }
            }
          }}
        />
      )}

      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={async () => {
          try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            if (userInfo.data && userInfo.data.idToken) {
              const { data, error } = await supabase.auth.signInWithIdToken({
                provider: "google",
                token: userInfo.data.idToken,
              });
              console.log(error, data);
            } else {
              throw new Error("no ID token present!");
            }
          } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
            } else {
              // some other error happened
            }
          }
        }}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginTop: 230,
  },
  heading: {
    fontSize: 36,
    fontFamily: "PlusJakartaSans-ExtraBold",
    color: "black",
    marginBottom: 20,
    backgroundColor: "white",
    justifyContent: "flex-start",
    width: "100%",
  },

  input: {
    height: 50,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DDD",
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    width: "100%",
    // Adding subtle shadow (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Elevation for Android shadow
    elevation: 3,
    borderRadius: 10,
    position: "relative",
  },
  passInput: {
    height: 50,
    marginBottom: 15,
    fontSize: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderRadius: 10,
    position: "relative",
  },

  iconContainer: {
    position: "absolute",
    right: 15,
  },
  icon: {
    marginTop: 10,
  },
  btn: {
    backgroundColor: "#3C82F6",
    borderColor: "#4B5563",
    marginVertical: 20,
    paddingVertical: 10,
    justifyContent: "center",
    shadowColor: "#D1D5DB",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 9999,
    width: "100%",
    boxShadow: "0px 6px 6px rgb(82, 135, 241)",
  },
  btnTxt: {
    fontSize: 16,
    fontFamily: "PlusJakartaSans-SemiBold",
    color: "white",
  },

  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
