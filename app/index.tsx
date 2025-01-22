import { Text, View } from "react-native";
import { fetch } from 'expo/fetch';
import { Audio } from 'expo-av';
import { useEffect, useState } from "react";
import Player from "@/components/Player";

const MOCK_AUDIO_URL = 'https://file.notion.so/f/f/24407104-f114-40ec-91ac-25f0ac0ac7a6/66b62104-67d0-48a9-956a-2534f0c1f52a/example_audio.mp3?table=block&id=afdf8629-9de2-456c-8d1e-cecb5f63378d&spaceId=24407104-f114-40ec-91ac-25f0ac0ac7a6&expirationTimestamp=1737518400000&signature=WagqNSaC94In8KS9F0CIqzyMCMJ6AUPDGreeHXnADf4&downloadName=example_audio.mp3';
const MOCK_JSON_URL = 'https://file.notion.so/f/f/24407104-f114-40ec-91ac-25f0ac0ac7a6/fd457fa5-cdfc-423b-8900-d47ed9bc0915/example_audio.json?table=block&id=3e0f14c4-ac0a-4fb2-98a0-4f8197052beb&spaceId=24407104-f114-40ec-91ac-25f0ac0ac7a6&expirationTimestamp=1737518400000&signature=pJwnLRKO-GzlnK0UR-x6vN4M-OUOnrDPDl-v_8-OuvY&downloadName=example_audio.json';
const PLAYER = new Audio.Sound();

function loadAudio(uri: string) {
  return PLAYER.loadAsync({ uri }, { progressUpdateIntervalMillis: 5 });
}

function loadCaptionsJSON(uri: string) {
  return fetch(uri).then((r) => r.json())
}

export default function Index() {
  const [ready, setReady] = useState(false);
  const [json, setJson] = useState<any>(null);

  useEffect(() => {
    Promise.all([loadAudio(MOCK_AUDIO_URL), loadCaptionsJSON(MOCK_JSON_URL)]).then(([_, json]) => {
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
