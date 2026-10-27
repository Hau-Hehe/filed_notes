import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password.");
      return;
    }
    await SecureStore.setItemAsync("user_token", "mock_jwt_token_1923050645");
    await SecureStore.setItemAsync("username", username);
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Field Notes</Text>
      <Text style={styles.subtitle}>DNTU Mobile App Project</Text>
      <TextInput
        style={styles.input}
        placeholder="Username / Student ID"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
        accessibilityLabel="Username input"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        accessibilityLabel="Password input"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f5f5f7",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1c1c1e",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#636366",
    marginBottom: 32,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#c7c7cc",
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    height: 50,
    backgroundColor: "#007aff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
