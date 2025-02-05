import { StyleSheet, View } from "react-native";
import Captions from "./Captions";
import Controls from "./Controls";


export default function Player() {
  return (
    <View style={styles.container}>
      <Captions/>
      <Controls/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignSelf: "stretch", flex: 1, backgroundColor: "#ddd" },
});
