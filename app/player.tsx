import { Text, View } from "react-native";
import { fetch } from "expo/fetch";
import { Audio, AVPlaybackSource } from "expo-av";
import { useEffect, useState } from "react";
import Player from "@/components/Player";
import { useRoute } from "@react-navigation/native";
import { Asset } from "expo-asset";

const MOCK_AUDIO_URI = () => Asset.loadAsync(require('../assets/mock/audio.mp3')).then(([asset]) => asset.uri);

export type RouteParams = {
  audioUri?: string;
  captionsUri?: string;
};

const PLAYER = new Audio.Sound();

function loadAudio(uri: string) {
  return new Promise((res, rej) => {
    /**
     * It seems Audio.Sound has some issues regarding completely loading the media file.
     * There were cases that the video was not loaded, but the promise was resolved.
     * This recursion ensures that we have a valid video
     */
    let checkCount = 0;
    const checkIfLoaded = async () => {
      const status = await PLAYER.getStatusAsync();
      if (status.isLoaded && status.durationMillis) {
        return res(status);
      }
      if (checkCount++ > 10) {
        rej("Invalid Video/Audio");
      }
      setTimeout(checkIfLoaded, 1000);
    };

    PLAYER.loadAsync({ uri }).then(checkIfLoaded).catch(rej);
  });
}

function loadCaptionsJSON(uri: string) {
  return fetch(uri).then((r) => r.json());
}

export default function PlayerPage() {
  const router = useRoute();
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [json, setJson] = useState<any>(null);

  useEffect(() => {
    const params = router.params as RouteParams || {};
    const audioLoad = Promise.resolve(params.audioUri || MOCK_AUDIO_URI()).then(loadAudio);
    const captionsLoad = params.captionsUri ? loadCaptionsJSON(params.captionsUri) : require('../assets/mock/captions.json');
    
    Promise.all([audioLoad, captionsLoad]).then(
      ([status, json]) => {
        setJson(json);
        setReady(true);
      }
    ).catch((e) => {
      setError(true)
    });
    return () => {
      PLAYER.unloadAsync();
    };
  }, []);

  const content = error ? (
    <Text>
      It's an error, couldn't load resource from the urls (check CORS for
      example)
    </Text>
  ) : !ready ? (
    <Text>Loading...</Text>
  ) : (
    <Player player={PLAYER} json={json}></Player>
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {content}
    </View>
  );
}
