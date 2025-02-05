import Player from "@/components/Player";
import { useRoute } from "@react-navigation/native";
import PlayerProvider from "@/contexts/player.context";
import CaptionsProvider from "@/contexts/captions.context";
import mockJson from '../assets/mock/data.json';

export type RouteParams = {
  audioUri?: string;
  captionsUri?: string;
};

export default function PlayerPage() {
  const { params } = useRoute() as { params?: RouteParams };
  const audio = params?.audioUri || mockJson.audio;
  const captions = params?.captionsUri || mockJson.captions;

  return (
    <PlayerProvider uri={audio}>
      <CaptionsProvider uri={captions}>
        <Player></Player>
      </CaptionsProvider>
    </PlayerProvider>
  );
}
