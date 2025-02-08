import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { formatTime } from "@/utils/format-time";
import { PlayerContext, PlayerStatusContext } from "@/contexts/player.context";
import Timeline from "./Timeline";
import { CaptionsContext } from "@/contexts/captions.context";

export default function Controls() {
  const player = useContext(PlayerContext)!;
  const { currentTime, duration, playing } = useContext(PlayerStatusContext)!;
  const { getPrev, getNext, setHighlightedByTime } = useContext(CaptionsContext)!;

  const onPrev = () => {
    const prev = getPrev(currentTime);
    if (prev) {
      player.seekTo(prev.from);
    }
  };

  const onNext = () => {
    const next = getNext();
    if (next) {
      player.seekTo(next.from);
    }
  };

  useEffect(
    () => setHighlightedByTime(currentTime),
    [currentTime]
  );

  return (
    <View style={styles.container}>
      <View style={styles.timeAndTrackerContainer}>
        <Timeline style={styles.slider} duration={duration} />
        <View style={styles.timeWrapper}>
          <Text>{formatTime(currentTime)}</Text>
          <Text>{formatTime(duration)}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <View>
          <AntDesign.Button
            onPress={onPrev}
            name="stepbackward"
            color="black"
            backgroundColor="transparent"
          />
        </View>
        <AntDesign.Button
          onPress={() => playing ? player.pause() : player.play() }
          name={playing ? "pausecircle" : "play"}
          color="black"
          backgroundColor="transparent"
          style={styles.playPauseBtn}
        />
        <View>
          <AntDesign.Button
            onPress={onNext}
            name="stepforward"
            color="black"
            backgroundColor="transparent"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#ddd", paddingBottom: 30 },
  timeAndTrackerContainer: { minHeight: 50 },
  slider: { width: '100%', marginTop: -10 },
  timeWrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 24,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  playPauseBtn: { paddingHorizontal: 5 },
});
