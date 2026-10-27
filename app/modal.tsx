import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Actions</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          router.back();
          router.push("/note/new");
        }}
      >
        <Text style={styles.btnText}>Create New Field Note</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnSecondary}
        onPress={() => router.back()}
      >
        <Text style={styles.btnSecondaryText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#007aff",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  btnSecondary: {
    backgroundColor: "#e5e5ea",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  btnSecondaryText: { color: "#3a3a3c", fontSize: 16, fontWeight: "600" },
});
