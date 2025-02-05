import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { formatTime } from "@/utils/format-time";
import { PlayerContext } from "@/contexts/player.context";
import { CaptionsContext } from "@/contexts/captions.context";

export default function Controls() {
  const player = useContext(PlayerContext)!;
  const captions = useContext(CaptionsContext)!;

  const onPrev = () => {
    const prev = captions.getPrev(player.status.time);
    if (prev) {
      player.setTime(prev.from);
    }
  }

  const onNext = () => {
    const next = captions.getNext();
    if (next) {
      player.setTime(next.from);
    }
  }

  useEffect(() => captions.setHighlightedByTime(player.status.time), [player.status.time])

  return (
    <View style={styles.container}>
      <View style={styles.timeAndTrackerContainer}>
        <View style={styles.trackerContainer}>
          <View style={[styles.trackerHead, { width: `${player.status.timePercent()}%` }]}></View>
          <View style={styles.trackerTail}></View>
        </View>
        <View style={styles.timeWrapper}>
          <Text>{formatTime(player.status.time)}</Text>
          <Text>{formatTime(player.status.total)}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <View>
          <AntDesign.Button
            onPress={onPrev}
            name="stepbackward"
            color="black"
            backgroundColor='transparent'
          />
        </View>
        <AntDesign.Button
          onPress={player.togglePlayPause}
          name={player.status.playing ? "pausecircle" : "play"}
          color="black"
          backgroundColor="transparent"
          style={styles.playPauseBtn}
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

const styles = StyleSheet.create({
  container: { backgroundColor: "#ddd", paddingBottom: 30 },
  timeAndTrackerContainer: { minHeight: 50 },
  trackerContainer: { height: 5, flexDirection: "row" },
  trackerHead: { backgroundColor: "orange" },
  trackerTail: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "orange",
    alignSelf: "center",
  },
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
  playPauseBtn: { paddingHorizontal: 5 }
})