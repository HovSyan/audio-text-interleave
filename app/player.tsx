import { Text, View } from "react-native";
import { fetch } from 'expo/fetch';
import { Audio, AVPlaybackSource } from 'expo-av';
import { useEffect, useState } from "react";
import Player from "@/components/Player";
import { useRoute } from "@react-navigation/native";

export type RouteParams = {
  audioUri: string;
  captionsUri: string;
}

const PLAYER = new Audio.Sound();

function loadAudio(uri: string) {
  return new Promise((res) => {
    /**
     * It seems Audio.Sound has some issues regarding completely loading the media file.
     * There were cases that the video was not loaded, but the promise was resolved.
     * This recursion ensures that we have a valid video
     */
    let checkCount = 0;
    const checkIfLoaded = async () => {
      const status = await PLAYER.getStatusAsync()
      if (status.isLoaded && status.durationMillis) {
        return res(status);
      }
      if (checkCount++ > 10) {
        throw 'Invalid Video/Audio'
      }
      setTimeout(checkIfLoaded, 500);
    }

    PLAYER.loadAsync({ uri }).then(checkIfLoaded);
  })
}

function loadCaptionsJSON(uri: string) {
  return fetch(uri).then((r) => r.json())
}

export default function PlayerPage() {
  const router = useRoute();
  const [ready, setReady] = useState(false);
  const [json, setJson] = useState<any>(null);

  useEffect(() => {
    const { audioUri, captionsUri } = router.params as RouteParams;
    Promise.all([loadAudio(audioUri), loadCaptionsJSON(captionsUri)]).then(([status, json]) => {
      setJson(json);
      setReady(true);
    });
    return () => {
      PLAYER.unloadAsync();
    }
  }, [])
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {ready ? <Player player={PLAYER} json={json}></Player> : <Text>Loading...</Text>}
    </View>
  );
}
