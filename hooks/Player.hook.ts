import { Audio, AVPlaybackStatus } from "expo-av";
import { useEffect, useRef, useState } from "react";

export class PlayerStatus {
  time = 0;
  total = 0;
  playing = false;

  constructor(status: AVPlaybackStatus | null) {
    if (status?.isLoaded) {
      this.time = status.positionMillis;
      this.total = status.durationMillis || this.total;
      this.playing = status.isPlaying;
    }
  }

  timePercent() {
    console.log(((this.time / this.total) || 0) * 100);
    return ((this.time / this.total) || 0) * 100;
  }
}

export default function usePlayer(uri: string) {
  const player = useRef(new Audio.Sound());
  const [status, setStatus] = useState(new PlayerStatus(null));
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    player.current.setOnPlaybackStatusUpdate((status) => {
      setStatus(new PlayerStatus(status))
    });
    player.current.loadAsync({ uri }).then(
      () => setLoading(false),
      () => {
        setLoading(false);
        setError(true);
      }
    );
    return () => {
      player.current.unloadAsync();
      player.current.setOnPlaybackStatusUpdate(null);
    };
  }, [uri]);

  const togglePlayPause = () =>
    status.playing ? player.current.pauseAsync() : player.current.playAsync();
  const setTime = (t: number) => player.current.setPositionAsync(t);

  return { status, error, loading, togglePlayPause, setTime };
}
