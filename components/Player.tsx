import { Audio, AVPlaybackStatus, AVPlaybackStatusSuccess } from "expo-av";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Text, View } from "react-native";
import Captions from "./Captions";
import Controls from "./Controls";

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

export type CaptionsList = Array<SpeakingCaption>;
export type SpeakingCaption = {
  type: "speaker";
  from: number;
  to: number;
  speakerName: string;
  words: string;
};

export default function Player({ player, json }: Props) {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const highlightedRef = useRef<number | null>(null);

  const total = useRef(0);
  const onPlaybackStatusUpdate = useCallback((status: AVPlaybackStatus) => {
    total.current = (status as AVPlaybackStatusSuccess).durationMillis!;
    setTime((status as AVPlaybackStatusSuccess).positionMillis);
    if ((status as AVPlaybackStatusSuccess).didJustFinish) {
      setTime(0);
      setPlaying(false);
    }
  }, []);
  const list = useMemo(() => parseCaptionsJSON(json), [json]);

  useEffect(() => {
    player.getStatusAsync().then(onPlaybackStatusUpdate);
    player.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
  }, []);

  useEffect(() => {
    playing ? player.playAsync() : player.pauseAsync();
  }, [playing]);

  if (
    highlightedRef.current === null ||
    !(
      list[highlightedRef.current].from <= time &&
      time <= list[highlightedRef.current].to
    )
  ) {
    const index = list.findIndex((c) => c.from <= time && time < c.to);
    highlightedRef.current = index === -1 ? null : index;
  }

  const onPrev = () => {
    if (highlightedRef.current === null) return;
    if (highlightedRef.current === 0 && list[highlightedRef.current].from === time) return;

    player.setPositionAsync(
      list[highlightedRef.current].from === time
        ? list[highlightedRef.current - 1].from
        : list[highlightedRef.current].from
    );
  };
  const onNext = () => {
    if (highlightedRef.current === null) return;
    if (highlightedRef.current >= list.length) return;

    player.setPositionAsync(list[highlightedRef.current + 1].from);
  };

  return (
    <View style={{ alignSelf: "stretch", flex: 1 }}>
      <Captions list={list} activeIndex={highlightedRef.current} />
      <Controls
        time={time}
        total={total.current}
        playing={playing}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onNext={onNext}
        onPrev={onPrev}
      />
    </View>
  );
}

function parseCaptionsJSON(json: CaptionsJSON): CaptionsList {
  const pause = json.pause;
  const list: CaptionsList = [];
  const speakersLen = json.speakers.length;
  let phraseIndex = 0;
  let time = 0;
  let hasPhrase = true;

  while (hasPhrase) {
    hasPhrase = false;
    for (let i = 0; i < speakersLen; i++) {
      if (phraseIndex < json.speakers[i].phrases.length) {
        list.push({
          type: "speaker",
          from: time,
          to: time + json.speakers[i].phrases[phraseIndex].time,
          speakerName: json.speakers[i].name,
          words: json.speakers[i].phrases[phraseIndex].words,
        });
        hasPhrase = true;
        time += json.speakers[i].phrases[phraseIndex].time + pause;
      }
    }
    phraseIndex++;
  }
  return list;
}
