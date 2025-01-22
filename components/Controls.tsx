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
  const trackerPercent = `${Math.floor((time / total) * 100)}%` as const;
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
    <View style={{ backgroundColor: "#eee", paddingBottom: 30 }}>
      <View style={{ minHeight: 50 }}>
        <View style={{ height: 5, flexDirection: "row" }}>
          <View
            style={{ width: trackerPercent, backgroundColor: "orange" }}
          ></View>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: "orange",
              alignSelf: "center",
            }}
          ></View>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            flex: 1,
            paddingHorizontal: 24,
            marginTop: 24,
          }}
        >
          <Text>{formatTime(time)}</Text>
          <Text>{formatTime(total)}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <View>
          <AntDesign.Button
            onPress={onPrev}
            name="stepbackward"
            color="black"
            backgroundColor='transparent'
          />
        </View>
        <AntDesign.Button
          onPress={playing ? onPause : onPlay}
          name={playing ? "pausecircle" : "play"}
          color="black"
          backgroundColor="transparent"
          style={{ paddingHorizontal: 5 }}
        />
        <View>
          <AntDesign.Button
            onPress={onNext}
            name="stepforward"
            color="black"
            backgroundColor='transparent'
          />
        </View>
      </View>
    </View>
  );
}
