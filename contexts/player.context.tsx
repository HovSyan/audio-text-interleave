import { createContext, ReactNode } from "react";
import { Text } from "react-native";
import usePlayer from "@/hooks/Player.hook";

export type TPlayerContext = ReturnType<typeof usePlayer>;

export const PlayerContext = createContext<TPlayerContext | null>(null);

type Props = {
  children: ReactNode;
  uri: string;
};

export default function PlayerProvider({ uri, children }: Props) {
  const player = usePlayer(uri);

  if (player.error) {
    return <Text>It's an error, couldn't load the video (check CORS for example)</Text>
  }
  if (player.loading) {
    return <Text>Loading...</Text>
  }

  return <PlayerContext.Provider value={player}>{children}</PlayerContext.Provider>
}
