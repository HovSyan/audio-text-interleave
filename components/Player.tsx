import { Audio, AVPlaybackStatus, AVPlaybackStatusSuccess } from "expo-av";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Text, View } from "react-native";
import Captions from "./Captions";
import Controls from "./Controls";
import { parseCaptionsJSON } from "@/utils/captions-parser";

type Props = {
  player: Audio.Sound;
  json: any;
};

export type CaptionsJSON = {
  pause: number;
  speakers: Array<{
    name: string;
    phrases: Array<{ words: string; time: number }>;
  }>;
};
export type ParsedCaptionsList = Array<ParsedCaption>;
export type ParsedCaption = {
  type: "speaker";
  from: number;
  to: number;
  speakerName: string;
  words: string;
};

export default function Player({ player, json }: Props) {
  const [total, setTotal] = useState(0);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [highlighted, setHighlighted] = useState<number | null>(null);

  const onPlaybackStatusUpdate = useCallback((status: AVPlaybackStatus) => {
    const { durationMillis, positionMillis, didJustFinish } = status as AVPlaybackStatusSuccess;
    const total = durationMillis || 0;
    const time = positionMillis || 0;
    setTotal(total);
    setTime(time);
    if (didJustFinish) {
      player.setPositionAsync(0);
      setPlaying(false);
    }
    if (highlighted === null || (list[highlighted].from <= time && time <= list[highlighted].to)) {
      const index = list.findIndex((c) => c.from <= time && time < c.to);
      setHighlighted(index === -1 ? null : index);
    }
  }, []);
  const list = useMemo(() => parseCaptionsJSON(json), [json]);

  useEffect(() => {
    player.getStatusAsync().then(onPlaybackStatusUpdate)
    player.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
  }, []);

  useEffect(() => {
    playing ? player.playAsync() : player.pauseAsync();
  }, [playing]);

  const onPrev = () => {
    if (highlighted === null) return;
    if (highlighted === 0 && list[highlighted].from === time) return;

    player.setPositionAsync(
      list[highlighted].from === time
        ? list[highlighted - 1].from
        : list[highlighted].from
    );
  };
  const onNext = () => {
    if (highlighted === null) return;
    if (highlighted >= list.length - 1) return;

    player.setPositionAsync(list[highlighted + 1].from);
  };

  return (
    <View style={{ alignSelf: "stretch", flex: 1, backgroundColor: '#ddd' }}>
      <Captions list={list} activeIndex={highlighted} />
      <Controls
        time={time}
        total={total}
        playing={playing}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onNext={onNext}
        onPrev={onPrev}
      />
    </View>
  );
}
