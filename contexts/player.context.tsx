import { createContext, ReactNode, useEffect, useState } from "react";
import { Text } from "react-native";
import {
  AudioPlayer,
  AudioStatus,
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";
import useExactTime from "@/hooks/PlayerExactTime.hook";

const AUDIO_LOAD_TIMEOUT = 5000;

export type TPlayerContext = Pick<AudioPlayer, "seekTo" | "play" | "pause">;
export type TPlayerStatus = AudioStatus;
export type TPlayerExactTime = number;

export const PlayerContext = createContext<TPlayerContext | null>(null);
export const PlayerStatusContext = createContext<TPlayerStatus | null>(null);
export const PlayerExactTimeContext = createContext<TPlayerExactTime>(0);

type Props = {
  children: ReactNode;
  uri: string;
};

export default function PlayerProvider({ uri, children }: Props) {
  const player = useAudioPlayer(uri);
  const status = useAudioPlayerStatus(player);
  const current = useExactTime(player);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!status.duration) {
      const timeout = setTimeout(() => setError(true), AUDIO_LOAD_TIMEOUT);
      setLoading(true);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      setLoading(false);
      setError(false);
    }
  }, [status.duration]);

  if (error) {
    return (
      <Text>
        It's an error, couldn't load the video (check CORS for example)
      </Text>
    );
  }
  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <PlayerContext.Provider value={player}>
      <PlayerStatusContext.Provider value={status}>
        <PlayerExactTimeContext.Provider value={current}>
          {children}
        </PlayerExactTimeContext.Provider>
      </PlayerStatusContext.Provider>
    </PlayerContext.Provider>
  );
}
