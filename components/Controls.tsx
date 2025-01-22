import React from "react";
import { View, StyleSheet, Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

type Props = {
  time: number;
  total: number;
  playing: boolean;

  onPlay: () => any;
  onPause: () => any;
  onNext: () => any;
  onPrev: () => any;
};

export default function Controls({
  time,
  total,
  playing,
  onPlay,
  onPause,
  onNext,
  onPrev,
}: Props) {
  const trackerPercent = `${(time / total) * 100}%` as const;
  function formatTime(time: number) {
    let seconds = Math.floor(time / 1000);
    const hours = parseInt((seconds / 3600).toString());
    seconds = seconds % 3600;
    const minutes = parseInt((seconds / 60).toString());
    seconds = seconds % 60;
    return `${hours ? hours.toString().padStart(2, "0") + ":" : ""}${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return (
    <View style={{ backgroundColor: "red" }}>
      <View style={styles.timeline}>
        <View style={{ flexBasis: 5, flexDirection: "row" }}>
          <View
            style={{ flexBasis: trackerPercent, backgroundColor: "yellow" }}
          ></View>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: "yellow",
              alignSelf: "center",
            }}
          ></View>
        </View>
        <View style={styles.times}>
          <Text>{formatTime(time)}</Text>
          <Text>{formatTime(total)}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: "24px",
          paddingBottom: 24,
        }}
      >
        <AntDesign
          onPress={onPrev}
          name="stepbackward"
          size={24}
          color="black"
        />
        <AntDesign
          onPress={playing ? onPause : onPlay}
          name={playing ? "pause" : "caretright"}
          size={24}
          color="black"
        />
        <AntDesign
          onPress={onNext}
          name="stepforward"
          size={24}
          color="black"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timeline: {
    flex: 1,
  },
  handler: {
    height: 5,
    backgroundColor: "red",
  },
  times: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingInline: 24,
    marginTop: 24,
  },
});
