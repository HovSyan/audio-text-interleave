import React, { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CaptionItem from "./CaptionItem";
import { CaptionsContext } from "@/contexts/captions.context";

export default function Captions() {
  const captions = useContext(CaptionsContext)!;

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContentContainer}
    >
      {captions.list.map((c, i) => (
        <CaptionItem
          key={i}
          words={c.words}
          speaker={c.speakerName}
          highlighted={i === captions.highlighted}
          align={i % 2 ? "flex-start" : "flex-end"}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#bbb",
    flex: 1,
    padding: 10,
  },
  scrollContentContainer: {
    rowGap: 24,
  },
});
